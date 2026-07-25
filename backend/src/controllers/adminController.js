const kbService = require('../knowledge-base/kbService');
const scraperService = require('../scraper/scraperService');
const { EventEmitter } = require('events');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const scraperEmitter = new EventEmitter();
const companyProgress = new Map();

async function login(req, res) {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token });
    }
    return res.status(401).json({ error: "Invalid password" });
}

scraperEmitter.on('progress', (companyId, data) => {
    companyProgress.set(companyId, data);
});

async function getCompanyData(req, res) {
    try {
        const { companyId } = req.params;
        if (!companyId) return res.status(400).json({ error: "companyId is required" });
        const data = await kbService.getKnowledgeBaseContext(companyId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to read data" });
    }
}

async function saveCompanyData(req, res) {
    try {
        const { companyId } = req.params;
        if (!companyId) return res.status(400).json({ error: "companyId is required" });
        await kbService.saveCompanyDetails(companyId, req.body.companyName || '', req.body.description || '');
        res.json({ message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save data" });
    }
}

async function importWebsite(req, res) {
    try {
        const { companyId } = req.params;
        const { url } = req.body;
        if (!companyId) return res.status(400).json({ error: "companyId is required" });
        if (!url) return res.status(400).json({ error: "URL is required" });
        
        // Asynchronously wipe, crawl, and save so we can return success immediately and track via SSE
        res.json({ message: "Website scraping started" });

        await kbService.wipeKnowledgeBase(companyId);
        
        let finalStats = { pagesCrawled: 0, maxPages: 15 };
        const content = await scraperService.crawlWebsite(url, 15, (progress) => {
            if (progress.status === 'completed') {
                finalStats = progress;
            }
            scraperEmitter.emit('progress', companyId, progress);
        });
        
        await kbService.saveScrapedContent(companyId, url, content);
        
        scraperEmitter.emit('progress', companyId, { ...finalStats, status: 'saved' });

    } catch (error) {
        const { companyId } = req.params;
        scraperEmitter.emit('progress', companyId, { status: 'error', error: error.message });
        console.error("Scraping error:", error);
    }
}

// SSE Endpoint for tracking scraping progress
function scrapingProgress(req, res) {
    const { companyId } = req.params;
    if (!companyId) return res.status(400).end();

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Immediately send the last known state if scraping is ongoing/finished
    const latestProgress = companyProgress.get(companyId);
    if (latestProgress) {
        res.write(`data: ${JSON.stringify(latestProgress)}\n\n`);
    } else {
        res.write(`data: ${JSON.stringify({ status: 'idle', pagesCrawled: 0, maxPages: 15, queueLength: 0 })}\n\n`);
    };

    const listener = (eventCompanyId, progress) => {
        if (eventCompanyId === companyId) {
            res.write(`data: ${JSON.stringify(progress)}\n\n`);
        }
    };

    scraperEmitter.on('progress', listener);

    req.on('close', () => {
        scraperEmitter.off('progress', listener);
    });
}

function getProviderStatus(req, res) {
    const AiProviderManager = require('../services/AiProviderManager');
    try {
        const stats = AiProviderManager.getInstance().getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "Failed to get provider status" });
    }
}

module.exports = {
    login,
    getCompanyData,
    saveCompanyData,
    importWebsite,
    scrapingProgress,
    getProviderStatus
};
