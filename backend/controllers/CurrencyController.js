const CurrencyService = require('../services/CurrencyService');

exports.convert = async (req, res) => {
    const { amount, fromCurrency, toCurrency } = req.body;

    try {
        const convertedAmount = await CurrencyService.convert(amount, fromCurrency, toCurrency);
        res.status(200).json({ convertedAmount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}