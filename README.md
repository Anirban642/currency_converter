# Currency Converter Documentation

## Project Overview

A modern, responsive currency converter application built with React and Vite. This application allows users to convert amounts between different currencies using real-time exchange rates with an intuitive and user-friendly interface.

## Features

- ✅ Real-time currency conversion
- ✅ Support for 10+ popular currencies
- ✅ Swap currencies functionality
- ✅ Quick conversion buttons
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ Error handling
- ✅ Loading states
- ✅ Input validation

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Exchange Rate API** - Real-time currency data

## Prerequisites

Before running this project, make sure you have:

- Node.js (version 16.0 or higher)
- npm or yarn package manager
- Modern web browser

## Installation & Setup

### 1. Create Vite React Project
```bash
npm create vite@latest currency-converter -- --template react
cd currency-converter
npm install
```

### 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Add Tailwind to CSS
Replace content in `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Install Lucide React Icons
```bash
npm install lucide-react
```

### 6. Replace App.jsx
Replace the content of `src/App.jsx` with the Currency Converter component code.

### 7. Start Development Server
```bash
npm run dev
```

## Project Structure

```
currency-converter/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── CurrencyConverter.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Component Architecture

### CurrencyConverter Component

**Location**: `src/App.jsx` (or `src/components/CurrencyConverter.jsx`)

#### State Variables
- `amount` - Input amount to convert
- `fromCurrency` - Source currency code
- `toCurrency` - Target currency code
- `exchangeRate` - Current exchange rate
- `convertedAmount` - Calculated result
- `loading` - Loading state for API calls
- `error` - Error message display

#### Key Functions

##### `fetchExchangeRate()`
Fetches real-time exchange rates from the API.
```javascript
const fetchExchangeRate = async () => {
  // API call to exchangerate-api.com
  // Updates exchangeRate state
}
```

##### `swapCurrencies()`
Swaps the from and to currencies.
```javascript
const swapCurrencies = () => {
  setFromCurrency(toCurrency);
  setToCurrency(fromCurrency);
}
```

##### `handleAmountChange()`
Validates and updates the amount input.
```javascript
const handleAmountChange = (e) => {
  // Only allows numbers and decimal points
  if (value === '' || /^\d*\.?\d*$/.test(value)) {
    setAmount(value);
  }
}
```

## API Integration

### Exchange Rate API
- **Provider**: exchangerate-api.com
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest/{currency}`
- **Method**: GET
- **Rate Limit**: 1500 requests/month (free tier)
- **Response Format**: JSON

### Example API Response
```json
{
  "base": "USD",
  "date": "2025-06-18",
  "rates": {
    "EUR": 0.85,
    "GBP": 0.73,
    "JPY": 110.12
  }
}
```

## Supported Currencies

| Code | Currency | Flag |
|------|----------|------|
| USD | US Dollar | 🇺🇸 |
| EUR | Euro | 🇪🇺 |
| GBP | British Pound | 🇬🇧 |
| JPY | Japanese Yen | 🇯🇵 |
| AUD | Australian Dollar | 🇦🇺 |
| CAD | Canadian Dollar | 🇨🇦 |
| CHF | Swiss Franc | 🇨🇭 |
| CNY | Chinese Yuan | 🇨🇳 |
| INR | Indian Rupee | 🇮🇳 |
| KRW | South Korean Won | 🇰🇷 |

## Styling Guide

### Color Palette
- **Primary**: Indigo (blue-indigo gradient)
- **Background**: Light blue gradient
- **Text**: Gray shades
- **Accent**: Blue for interactive elements

### Key Design Elements
- **Cards**: White background with shadow and rounded corners
- **Inputs**: Border focus states with indigo accent
- **Buttons**: Hover effects with color transitions
- **Loading**: Spinning animation
- **Typography**: Clean, modern font hierarchy

## Usage Instructions

### Basic Conversion
1. Enter the amount you want to convert
2. Select the source currency from the dropdown
3. Select the target currency from the dropdown
4. View the converted result instantly

### Advanced Features
- **Swap Currencies**: Click the swap button to reverse conversion
- **Quick Amounts**: Use preset buttons (1, 10, 100, 500, 1000, 5000)
- **Real-time Updates**: Rates update automatically when currencies change

## Error Handling

### Network Errors
- Displays user-friendly error messages
- Graceful fallback when API is unavailable
- Retry mechanism built-in

### Input Validation
- Only accepts numeric input
- Prevents invalid characters
- Handles empty inputs gracefully

### Loading States
- Spinner animation during API calls
- Disabled interactions while loading
- Visual feedback for user actions

## Performance Optimizations

- **useEffect Optimization**: Prevents unnecessary API calls
- **Debounced Input**: Efficient amount calculations
- **Conditional Rendering**: Optimized component updates
- **Lightweight Dependencies**: Minimal bundle size

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## Customization

### Adding New Currencies
Update the `currencies` array in the component:
```javascript
const currencies = [
  // Add new currency object
  { code: 'BTC', name: 'Bitcoin', flag: '₿' }
];
```

### Changing API Provider
Replace the API endpoint in `fetchExchangeRate()`:
```javascript
const response = await fetch(
  `https://your-api.com/rates/${fromCurrency}`
);
```

### Styling Modifications
- Update `tailwind.config.js` for theme changes
- Modify component classes for layout changes
- Add custom CSS in `index.css` for additional styles

## Troubleshooting

### Common Issues

**Issue**: Exchange rates not loading
**Solution**: Check internet connection and API status

**Issue**: Styling not applied
**Solution**: Ensure Tailwind CSS is properly configured

**Issue**: Build errors
**Solution**: Check all dependencies are installed

### Debug Mode
Enable console logging in development:
```javascript
console.log('Exchange Rate:', exchangeRate);
console.log('Converted Amount:', convertedAmount);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Check the troubleshooting section
- Review the error logs
- Verify API documentation
- Test in different browsers

## Future Enhancements

- [ ] Historical exchange rate charts
- [ ] Currency conversion calculator
- [ ] Offline mode support
- [ ] Multiple currency comparison
- [ ] Rate alerts and notifications
- [ ] Dark mode theme
- [ ] Currency trend indicators
- [ ] Export conversion history

---

**Version**: 1.0.0  
**Last Updated**: June 18, 2025  
**Author**: Your Name
