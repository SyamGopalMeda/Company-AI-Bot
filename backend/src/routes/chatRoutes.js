const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/chat', chatController.handleChat);
router.get('/branding/:companyId', chatController.getCompanyBranding);

module.exports = router;
