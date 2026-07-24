const kbService = require('../knowledge-base/kbService');
const scraperService = require('../scraper/scraperService');
const { EventEmitter } = require('events');

const scraperEmitter = new EventEmitter();

let latestProgress = null;
scraperEmitter.on('progress', (data) => {
    latestProgress = data;
});

async function getCompanyData(req, res) {
    try {
        const data = await kbService.getKnowledgeBaseContext();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to read data" });
    }
}

async function saveCompanyData(req, res) {
    try {
        await kbService.saveCompanyDetails(req.body.companyName || '', req.body.description || '');
        res.json({ message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save data" });
    }
}

async function importWebsite(req, res) {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL is required" });
        
        // Asynchronously wipe, crawl, and save so we can return success immediately and track via SSE
        res.json({ message: "Website scraping started" });

        await kbService.wipeKnowledgeBase();
        
        let finalStats = { pagesCrawled: 0, maxPages: 15 };
        const content = await scraperService.crawlWebsite(url, 15, (progress) => {
            if (progress.status === 'completed') {
                finalStats = progress;
            }
            scraperEmitter.emit('progress', progress);
        });
        
        await kbService.saveScrapedContent(url, content);
        
        scraperEmitter.emit('progress', { ...finalStats, status: 'saved' });

    } catch (error) {
        scraperEmitter.emit('progress', { status: 'error', error: error.message });
        console.error("Scraping error:", error);
    }
}

// SSE Endpoint for tracking scraping progress
function scrapingProgress(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Immediately send the last known state if scraping is ongoing/finished
    if (latestProgress) {
        res.write(`data: ${JSON.stringify(latestProgress)}\n\n`);
    } else {
        res.write(`data: ${JSON.stringify({ status: 'idle', pagesCrawled: 0, maxPages: 15, queueLength: 0 })}\n\n`);
    };

    const listener = (progress) => {
        res.write(`data: ${JSON.stringify(progress)}\n\n`);
    };

    scraperEmitter.on('progress', listener);

    req.on('close', () => {
        scraperEmitter.off('progress', listener);
    });
}

module.exports = {
    getCompanyData,
    saveCompanyData,
    importWebsite,
    scrapingProgress
};
