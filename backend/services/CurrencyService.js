/**
 * Currency Service Module
 * 
 * This module provides services for fetching exchange rates and converting currency amounts
 * between different currencies. It interacts with an external API to retrieve the latest 
 * exchange rates based on a specified base currency.
 * 
 * Functions:
 * 
 * 1. fetchExchangeRates(baseCurrency)
 *    - Fetches the latest exchange rates for the specified base currency.
 *    - Returns an object containing conversion rates for various currencies.
 *    - Throws an error if the API request fails.
 * 
 * 2. convert(amount, fromCurrency, toCurrency)
 *    - Converts a specified amount from one currency to another using the latest exchange rates.
 *    - Takes the amount to convert, the currency to convert from, and the currency to convert to.
 *    - Returns the converted amount.
 *    - Throws an error if the target currency is not found in the fetched rates.
 * 
 * Example Usage:
 * 
 * const CurrencyService = require('./CurrencyService');
 * 
 * // Fetch exchange rates
 * fetchExchangeRates('USD')
 *   .then(rates => console.log(rates))
 *   .catch(err => console.error(err));
 * 
 * // Convert currency
 * CurrencyService.convert(100, 'USD', 'EUR')
 *   .then(convertedAmount => console.log(convertedAmount))
 *   .catch(err => console.error(err));
 */

const axios = require('axios');

const fetchExchangeRates = async (baseCurrency) => {
    const apiKey = '531a47fb3d8822c7cc91037f'; 
    const apiUrl = 'https://v6.exchangerate-api.com/v6';

    try {
        const response = await axios.get(`${apiUrl}/${apiKey}/latest/${baseCurrency}`);
        const rates = response.data.conversion_rates;
        return rates;
    } catch (error) {
        throw new Error(`Error fetching exchange rates: ${error.message}`);
    }
}

exports.convert = async (amount, baseCurrency, targetCurrency) => {
    const rates = await fetchExchangeRates(baseCurrency);

    if (!rates[targetCurrency]) {
        throw new Error(`Currency ${targetCurrency} not found`);
    }

    const convertedAmount = amount * rates[targetCurrency];
    return convertedAmount;
}
