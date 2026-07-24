const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', adminController.login);

// Protected routes
// Note: authMiddleware temporarily disabled per user request
router.get('/:companyId/company-data', adminController.getCompanyData);
router.post('/:companyId/save-company-data', adminController.saveCompanyData);
router.post('/:companyId/import-website', adminController.importWebsite);
router.get('/:companyId/scraping-progress', adminController.scrapingProgress);

module.exports = router;
