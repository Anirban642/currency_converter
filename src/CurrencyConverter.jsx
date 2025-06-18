import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, TrendingUp, DollarSign } from 'lucide-react';

const CurrencyConverter = () => {
  // State variables to manage the component data
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Popular currencies list
  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' }
  ];

  // Function to fetch exchange rates from API
  const fetchExchangeRate = async () => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Using exchangerate-api.com (free tier)
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();
      const rate = data.rates[toCurrency];
      
      if (rate) {
        setExchangeRate(rate);
      } else {
        throw new Error('Currency not found');
      }
    } catch (err) {
      setError('Unable to fetch exchange rates. Please try again.');
      console.error('Exchange rate fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate converted amount whenever amount or exchange rate changes
  useEffect(() => {
    if (exchangeRate && amount) {
      const result = (parseFloat(amount) * exchangeRate).toFixed(2);
      setConvertedAmount(result);
    }
  }, [amount, exchangeRate]);

  // Fetch exchange rate when currencies change
  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Function to swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <DollarSign className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Currency Converter</h1>
          </div>
          <p className="text-gray-600">Convert currencies with real-time rates</p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-4 py-3 text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Enter amount"
            />
          </div>

          {/* From Currency */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors appearance-none bg-white"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors duration-200"
              disabled={loading}
            >
              <ArrowLeftRight className="w-5 h-5 text-indigo-600" />
            </button>
          </div>

          {/* To Currency */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors appearance-none bg-white"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Converted Amount</p>
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">{error}</p>
              ) : (
                <p className="text-3xl font-bold text-indigo-700">
                  {convertedAmount} {toCurrency}
                </p>
              )}
            </div>
          </div>

          {/* Exchange Rate Info */}
          {!loading && !error && exchangeRate && (
            <div className="text-center text-sm text-gray-500">
              <div className="flex justify-center items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Convert Buttons */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Convert</h3>
          <div className="grid grid-cols-3 gap-3">
            {['1', '10', '100', '500', '1000', '5000'].map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className="py-2 px-4 bg-gray-100 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Exchange rates are updated in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;