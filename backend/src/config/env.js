require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    GEMINI_API_KEYS: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.split(',').map(k => k.trim()) : [],
    NODE_ENV: process.env.NODE_ENV || 'development'
};
