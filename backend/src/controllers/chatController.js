const aiService = require('../services/aiService');
const kbService = require('../knowledge-base/kbService');

async function handleChat(req, res) {
    try {
        const { message, history = [], companyId } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });
        if (!companyId) return res.status(400).json({ error: "companyId is required" });

        const reply = await aiService.generateChatResponse(message, history, companyId);
        res.json({ reply });
    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
}

async function getCompanyBranding(req, res) {
    try {
        const { companyId } = req.params;
        if (!companyId) return res.status(400).json({ error: "companyId is required" });
        const data = await kbService.getKnowledgeBaseContext(companyId);
        res.json({ companyName: data.companyName, description: data.description });
    } catch (error) {
        res.status(500).json({ error: "Failed to read branding" });
    }
}

module.exports = {
    handleChat,
    getCompanyBranding
};
