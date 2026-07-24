const fs = require('fs/promises');
const path = require('path');

const KNOWLEDGE_BASE_ROOT = path.join(__dirname, '../../Knowledge Base');

async function getCompanyDir(companyId) {
    if (!companyId) throw new Error("companyId is required");
    const dir = path.join(KNOWLEDGE_BASE_ROOT, companyId);
    await fs.mkdir(dir, { recursive: true });
    return dir;
}

async function wipeKnowledgeBase(companyId) {
    const dir = await getCompanyDir(companyId);
    let companyDetails = null;
    try {
        const detailsRaw = await fs.readFile(path.join(dir, 'companyDetails.json'), 'utf-8');
        companyDetails = JSON.parse(detailsRaw);
    } catch (e) { /* ignore */ }

    try {
        await fs.rm(dir, { recursive: true, force: true });
    } catch (e) {
        // Ignore error if folder doesn't exist
    }
    
    if (companyDetails) {
        await saveCompanyDetails(companyId, companyDetails.companyName, companyDetails.description);
    }
}

async function saveCompanyDetails(companyId, companyName, description) {
    const dir = await getCompanyDir(companyId);
    await fs.writeFile(
        path.join(dir, 'companyDetails.json'),
        JSON.stringify({ companyName, description }, null, 2)
    );
}

async function saveScrapedContent(companyId, url, content) {
    const dir = await getCompanyDir(companyId);
    await fs.writeFile(
        path.join(dir, 'websiteContent.md'),
        `--- Source: ${url} ---\n` + content
    );
}

async function getKnowledgeBaseContext(companyId) {
    const data = {
        companyName: "",
        description: "",
        websiteContent: ""
    };
    
    if (!companyId) return data;
    
    try {
        const dir = await getCompanyDir(companyId);
        const detailsRaw = await fs.readFile(path.join(dir, 'companyDetails.json'), 'utf-8');
        const details = JSON.parse(detailsRaw);
        data.companyName = details.companyName || "";
        data.description = details.description || "";
    } catch (e) { /* ignore */ }

    try {
        const dir = await getCompanyDir(companyId);
        data.websiteContent = await fs.readFile(path.join(dir, 'websiteContent.md'), 'utf-8');
    } catch (e) { /* ignore */ }

    return data;
}

module.exports = {
    wipeKnowledgeBase,
    saveCompanyDetails,
    saveScrapedContent,
    getKnowledgeBaseContext
};
