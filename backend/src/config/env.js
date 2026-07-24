require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    GEMINI_API_KEYS: (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '').split(',').filter(Boolean).map(k => k.trim()),
    GROQ_API_KEY: process.env.GROQ_API_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'development'
};
