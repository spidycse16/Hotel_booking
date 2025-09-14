import { useState } from 'react';
import { currencyRates, currencySymbols, convertCurrency } from '../utils/currency';

export default function CurrencyConverter({ baseAmount, baseCurrency = 'USD', onCurrencyChange, style }) {
    const [currency, setCurrency] = useState(baseCurrency);

    const handleChange = (e) => {
        setCurrency(e.target.value);
        if (onCurrencyChange) onCurrencyChange(e.target.value);
    };

    const converted = convertCurrency(baseAmount, baseCurrency, currency);
    const symbol = currencySymbols[currency] || '';

    return (
        <div style={style}>
            <select value={currency} onChange={handleChange} className="border rounded px-2 py-1 mr-2">
                {Object.keys(currencyRates).map((cur) => (
                    <option key={cur} value={cur}>{cur}</option>
                ))}
            </select>
            <span className="font-bold text-lg">{symbol}{converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
    );
}
