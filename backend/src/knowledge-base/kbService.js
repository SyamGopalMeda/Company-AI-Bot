const fs = require('fs/promises');
const path = require('path');

const KNOWLEDGE_DIR = path.join(__dirname, '../../Knowledge Base');

async function ensureDir() {
    await fs.mkdir(KNOWLEDGE_DIR, { recursive: true });
}

async function wipeKnowledgeBase() {
    let companyDetails = null;
    try {
        const detailsRaw = await fs.readFile(path.join(KNOWLEDGE_DIR, 'companyDetails.json'), 'utf-8');
        companyDetails = JSON.parse(detailsRaw);
    } catch (e) { /* ignore */ }

    try {
        await fs.rm(KNOWLEDGE_DIR, { recursive: true, force: true });
    } catch (e) {
        // Ignore error if folder doesn't exist
    }
    await ensureDir();

    if (companyDetails) {
        await saveCompanyDetails(companyDetails.companyName, companyDetails.description);
    }
}

async function saveCompanyDetails(companyName, description) {
    await ensureDir();
    await fs.writeFile(
        path.join(KNOWLEDGE_DIR, 'companyDetails.json'),
        JSON.stringify({ companyName, description }, null, 2)
    );
}

async function saveScrapedContent(url, content) {
    await ensureDir();
    await fs.writeFile(
        path.join(KNOWLEDGE_DIR, 'websiteContent.md'),
        `--- Source: ${url} ---\n` + content
    );
}

async function getKnowledgeBaseContext() {
    const data = {
        companyName: "",
        description: "",
        websiteContent: ""
    };
    
    try {
        const detailsRaw = await fs.readFile(path.join(KNOWLEDGE_DIR, 'companyDetails.json'), 'utf-8');
        const details = JSON.parse(detailsRaw);
        data.companyName = details.companyName || "";
        data.description = details.description || "";
    } catch (e) { /* ignore */ }

    try {
        data.websiteContent = await fs.readFile(path.join(KNOWLEDGE_DIR, 'websiteContent.md'), 'utf-8');
    } catch (e) { /* ignore */ }

    return data;
}

module.exports = {
    wipeKnowledgeBase,
    saveCompanyDetails,
    saveScrapedContent,
    getKnowledgeBaseContext
};
