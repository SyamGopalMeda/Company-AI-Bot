const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/company-data', adminController.getCompanyData);
router.post('/save-company-data', adminController.saveCompanyData);
router.post('/import-website', adminController.importWebsite);
router.get('/scraping-progress', adminController.scrapingProgress);

module.exports = router;
