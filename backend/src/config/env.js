require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    GEMINI_API_KEYS: (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '').split(',').filter(Boolean).map(k => k.trim()),
    GROQ_API_KEYS: (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || '').split(',').filter(Boolean).map(k => k.trim()),
    GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-flash-lite-latest',
    GROQ_MODEL: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
    NODE_ENV: process.env.NODE_ENV || 'development'
};
