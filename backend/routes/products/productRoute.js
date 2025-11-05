const express = require('express');
const router = express.Router();
const productController = require('../../controllers/recommendation.controller');

// GET /api/products?defect=some_defect
router.get('/recommendations/:defect', productController.getProductsByDefect);

module.exports = router;
