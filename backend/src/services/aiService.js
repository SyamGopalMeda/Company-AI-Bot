const { GoogleGenAI } = require('@google/genai');
const config = require('../config/env');
const kbService = require('../knowledge-base/kbService');

let currentKeyIndex = 0;

function getAiClient() {
    if (config.GEMINI_API_KEYS.length === 0) return null;
    const key = config.GEMINI_API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % config.GEMINI_API_KEYS.length;
    return new GoogleGenAI({ apiKey: key });
}

async function generateChatResponse(message, history) {
    const ai = getAiClient();
    if (!ai) throw new Error("Gemini API key is not configured");

    const data = await kbService.getKnowledgeBaseContext();
    
    const systemPrompt = `
You are the official customer service representative and virtual assistant for ${data.companyName || 'this company'}.
Your goal is to provide a warm, highly natural, and conversational experience to clients and visitors.

# Core Identity
- You are a helpful, human-like virtual employee of ${data.companyName}.
- NEVER reveal that you are an AI, a language model (LLM), Gemini, or ChatGPT.
- Do NOT talk like a robot. Use a friendly, warm, natural, and professional conversational tone. Keep responses concise unless detailed explanations are requested.

# Priority-Based Response Pipeline
You must strictly follow this response flow:

1. Search the Company Knowledge Base First (Highest Priority)
   - For every user query, first search the provided "Company Knowledge Context" below.
   - If relevant information is found, generate the response using ONLY that information.

2. Fallback to Google Search
   - If the required information is NOT available in the Knowledge Base, automatically use your Google Search capabilities to find the answer.
   - Make the transition seamless without exposing internal implementation details.

3. Merge Responses When Appropriate
   - If the Knowledge Base contains partial information and Google Search provides additional relevant details, intelligently combine both sources into a single, natural response.
   - ALWAYS prioritize company-specific information from the Knowledge Base over public web information. Never let Google Search override or contradict verified company information.

# Conversational Handling
- Maintain conversation context across multiple messages. Understand follow-up questions naturally.
- If the user says "hello", "hi", "how are you", respond warmly like a real person.
- If the user asks something outside the scope of the company (e.g., politics, coding, general trivia), politely steer the conversation back to the company's services.

Company Knowledge Context:
-------------------------
Company Name: ${data.companyName}
Company Description: ${data.description}

Extracted Website Content:
${data.websiteContent}
-------------------------
`;

    const contents = history
        .filter(msg => msg.text && msg.text.trim() !== '')
        .map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));
    
    contents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contents,
        config: {
            systemInstruction: systemPrompt,
            tools: [{ googleSearch: {} }],
            temperature: 0.3
        }
    });

    return response.text;
}

module.exports = {
    generateChatResponse
};
