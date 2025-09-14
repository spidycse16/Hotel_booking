// Supported currencies and their conversion rates to USD (static for demo)

export const currencyRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.80,
    INR: 83.0,
    BDT: 123.0, // Example rate: 1 USD = 110 BDT
};


export const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    BDT: '৳',
};

export function convertCurrency(amount, from, to) {
    if (!currencyRates[from] || !currencyRates[to]) return amount;
    const usdAmount = amount / currencyRates[from];
    return usdAmount * currencyRates[to];
}
