export const formatCurrency = (amount: number): string => {
    // Round to nearest integer for clean display of INR
    return `₹${Math.round(amount)}`;
};
