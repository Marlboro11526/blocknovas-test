const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/CurrencyController');

/**
 * Currency Routes
 */
router.post('/convert', CurrencyController.convert);

module.exports = router; 