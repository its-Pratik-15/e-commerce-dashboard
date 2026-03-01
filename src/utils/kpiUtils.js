// Format currency amount to Indian Rupee format with abbreviations
export const formatCurrency = (amount) => {
    if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};


// Calculate percentage change between two values

export const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
};


// Get change type based on percentage value
export const getChangeType = (change) => {
    const val = parseFloat(change);
    if (val > 0) return 'positive';
    if (val < 0) return 'negative';
    return 'neutral';
};

//  Calculate metrics from orders data

export const calculateMetrics = (data) => {
    if (!data || data.length === 0) {
        return {
            revenue: 0,
            orders: 0,
            aov: 0,
            activeCustomers: 0
        };
    }
    const totalRevenue = data.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = data.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const uniqueCustomers = new Set(data.map(o => o.customerId));
    const activeCustomers = uniqueCustomers.size;

    return {
        revenue: totalRevenue,
        orders: totalOrders,
        aov: averageOrderValue,
        activeCustomers: activeCustomers
    };
};
