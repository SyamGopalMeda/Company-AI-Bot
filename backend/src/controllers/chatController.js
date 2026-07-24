const aiService = require('../services/aiService');

async function handleChat(req, res) {
    try {
        const { message, history = [] } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const reply = await aiService.generateChatResponse(message, history);
        res.json({ reply });
    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
}

module.exports = {
    handleChat
};
