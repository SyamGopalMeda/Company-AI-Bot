const { GoogleGenAI } = require('@google/genai');
const Groq = require('groq-sdk');
const crypto = require('crypto');
const config = require('../config/env');

class AiProviderManager {
    static instance = null;

    constructor() {
        if (AiProviderManager.instance) {
            return AiProviderManager.instance;
        }

        this.MAX_RETRIES = 3;
        this.COOLDOWN_MS = 60 * 1000; // 60 seconds
        this.CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

        this.geminiKeys = config.GEMINI_API_KEYS || [];
        this.groqKeys = config.GROQ_API_KEYS || [];

        this.geminiModel = config.GEMINI_MODEL || 'gemini-1.5-flash';
        this.groqModel = config.GROQ_MODEL || 'llama-3.1-8b-instant';

        this.providers = this.geminiKeys.map((key, index) => ({
            id: `gemini-${index + 1}`,
            type: 'gemini',
            key: key,
            client: new GoogleGenAI({ apiKey: key }),
            status: 'Healthy', // 'Healthy', 'Rate Limited', 'Invalid', 'Cooldown'
            requests: 0,
            failures: 0,
            consecutiveFailures: 0,
            latencySum: 0,
            cooldownUntil: null
        }));

        this.groqKeys.forEach((key, index) => {
            this.providers.push({
                id: `groq-${index + 1}`,
                type: 'groq',
                key: key,
                client: new Groq({ apiKey: key }),
                status: 'Healthy',
                requests: 0,
                failures: 0,
                consecutiveFailures: 0,
                latencySum: 0,
                cooldownUntil: null
            });
        });

        this.pendingRequests = new Map();
        this.responseCache = new Map();

        // Background task to recover cooldown providers
        setInterval(() => this._recoverProviders(), 10000);

        AiProviderManager.instance = this;
    }

    static getInstance() {
        if (!AiProviderManager.instance) {
            AiProviderManager.instance = new AiProviderManager();
        }
        return AiProviderManager.instance;
    }

    _recoverProviders() {
        const now = Date.now();
        for (const p of this.providers) {
            if (p.status === 'Cooldown' && p.cooldownUntil && now > p.cooldownUntil) {
                console.log(`[AI Provider] ${p.id} recovered from cooldown.`);
                p.status = 'Healthy';
                p.cooldownUntil = null;
                p.consecutiveFailures = 0;
            }
        }
    }

    _getBestProvider() {
        // Find all healthy gemini providers
        const healthyGemini = this.providers.filter(p => p.type === 'gemini' && p.status === 'Healthy');

        if (healthyGemini.length > 0) {
            // Sort by active load (approximated by recent latency and requests)
            healthyGemini.sort((a, b) => {
                const aAvg = a.requests > 0 ? a.latencySum / a.requests : 0;
                const bAvg = b.requests > 0 ? b.latencySum / b.requests : 0;
                if (aAvg === bAvg) return Math.random() - 0.5; // Randomize equally loaded providers
                return aAvg - bAvg;
            });
            return healthyGemini[0]; // Return the one with the lowest average latency
        }

        // Fallback to Groq if healthy
        const healthyGroq = this.providers.filter(p => p.type === 'groq' && p.status === 'Healthy');
        if (healthyGroq.length > 0) {
            healthyGroq.sort((a, b) => {
                const aAvg = a.requests > 0 ? a.latencySum / a.requests : 0;
                const bAvg = b.requests > 0 ? b.latencySum / b.requests : 0;
                if (aAvg === bAvg) return Math.random() - 0.5;
                return aAvg - bAvg;
            });
            return healthyGroq[0];
        }

        // If everything is down/cooldown, throw an error
        throw new Error("All AI providers are currently unavailable or rate limited.");
    }

    _handleFailure(provider, error) {
        provider.failures++;
        provider.consecutiveFailures++;

        const isRateLimit = error?.status === 429 || error?.message?.toLowerCase().includes('quota') || error?.message?.toLowerCase().includes('rate limit');
        
        if (isRateLimit || provider.consecutiveFailures >= 3) {
            console.warn(`[AI Provider] ${provider.id} is placed on cooldown.`);
            provider.status = 'Cooldown';
            provider.cooldownUntil = Date.now() + this.COOLDOWN_MS;
        }
    }

    _hashRequest(message, history, systemPrompt) {
        const hash = crypto.createHash('sha256');
        hash.update(message);
        hash.update(JSON.stringify(history));
        hash.update(systemPrompt);
        return hash.digest('hex');
    }

    async generateResponse(message, history, systemPrompt) {
        const requestHash = this._hashRequest(message, history, systemPrompt);

        // 1. Check Cache
        const cached = this.responseCache.get(requestHash);
        if (cached && Date.now() - cached.timestamp < this.CACHE_TTL_MS) {
            console.log(`[AI Provider] Cache hit for request.`);
            return cached.response;
        }

        // 2. Request Deduplication (Wait if already pending)
        if (this.pendingRequests.has(requestHash)) {
            console.log(`[AI Provider] Deduplicating identical concurrent request.`);
            return this.pendingRequests.get(requestHash);
        }

        // 3. Create the execution promise
        const requestPromise = this._executeWithRetries(message, history, systemPrompt)
            .then(response => {
                // Save to cache
                this.responseCache.set(requestHash, { response, timestamp: Date.now() });
                // Cleanup old cache entries randomly or keep simple for now
                if (this.responseCache.size > 1000) {
                    const firstKey = this.responseCache.keys().next().value;
                    this.responseCache.delete(firstKey);
                }
                return response;
            })
            .finally(() => {
                // Remove from pending
                this.pendingRequests.delete(requestHash);
            });

        this.pendingRequests.set(requestHash, requestPromise);
        return requestPromise;
    }

    async _executeWithRetries(message, history, systemPrompt) {
        const TIMEOUT_MS = 6000; // 6 second strict timeout per provider attempt
        const withTimeout = (promise, ms) => {
            return Promise.race([
                promise,
                new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms))
            ]);
        };

        let retries = 0;
        let lastError = null;

        while (retries < this.MAX_RETRIES) {
            let provider;
            try {
                provider = this._getBestProvider();
            } catch (err) {
                // If we can't get a provider, wait briefly and try again if retries left
                lastError = err;
                retries++;
                if (retries < this.MAX_RETRIES) {
                    await new Promise(r => setTimeout(r, 1000));
                    continue;
                }
                break;
            }

            const startTime = Date.now();
            try {
                console.log(`[AI Provider] Attempt ${retries + 1}/${this.MAX_RETRIES} via ${provider.id} (${provider.type})`);
                
                let responseText = "";

                if (provider.type === 'gemini') {
                    // Gemini format
                    const contents = [];
                    
                    history.filter(msg => msg.text && msg.text.trim() !== '').forEach(msg => {
                        contents.push({
                            role: msg.role === 'bot' ? 'model' : 'user',
                            parts: [{ text: msg.text }]
                        });
                    });
                    
                    contents.push({
                        role: 'user',
                        parts: [{ text: message }]
                    });

                    const response = await withTimeout(provider.client.models.generateContent({
                        model: this.geminiModel,
                        contents: contents,
                        config: {
                            systemInstruction: systemPrompt,
                            temperature: 0.3
                        }
                    }), TIMEOUT_MS);
                    
                    responseText = response.text;
                } else {
                    // Groq format
                    const messages = [{ role: 'system', content: systemPrompt }];
                    history.filter(msg => msg.text && msg.text.trim() !== '').forEach(msg => {
                        messages.push({
                            role: msg.role === 'bot' ? 'assistant' : 'user',
                            content: msg.text
                        });
                    });
                    messages.push({ role: 'user', content: message });

                    const response = await withTimeout(provider.client.chat.completions.create({
                        model: this.groqModel,
                        messages: messages,
                        temperature: 0.3
                    }), TIMEOUT_MS);

                    responseText = response.choices[0].message.content;
                }

                // Success
                const latency = Date.now() - startTime;
                provider.requests++;
                provider.latencySum += latency;
                provider.consecutiveFailures = 0;
                
                return responseText;

            } catch (error) {
                console.error(`[AI Provider] Error from ${provider.id}:`, error.message);
                lastError = error;
                this._handleFailure(provider, error);

                // Check if it's an invalid key (don't retry with this key, but try another)
                if (error?.status === 401 || error?.status === 403) {
                    provider.status = 'Invalid';
                }

                retries++;
            }
        }

        throw new Error(`All providers failed after ${this.MAX_RETRIES} attempts. Last error: ${lastError?.message}`);
    }

    getStats() {
        return {
            providers: this.providers.map(p => ({
                id: p.id,
                type: p.type,
                status: p.status,
                requests: p.requests,
                failures: p.failures,
                avgLatency: p.requests > 0 ? Math.round(p.latencySum / p.requests) : 0,
                cooldownRemaining: p.cooldownUntil ? Math.max(0, Math.round((p.cooldownUntil - Date.now()) / 1000)) : 0
            })),
            activeRequests: this.pendingRequests.size,
            cacheSize: this.responseCache.size,
            geminiModel: this.geminiModel,
            groqModel: this.groqModel
        };
    }
}

module.exports = AiProviderManager;
