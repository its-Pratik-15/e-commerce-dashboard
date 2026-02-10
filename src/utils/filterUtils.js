import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const filterData = (data, filters, dateRangeValue, dateField = 'orderDate') => {
    if (!data || !Array.isArray(data)) return [];

    return data.filter(item => {
        // Date Filtering
        if (dateRangeValue && item[dateField]) {
            const itemDate = dayjs(item[dateField]);
            if (!itemDate.isBetween(dateRangeValue.start, dateRangeValue.end, null, '[]')) {
                return false;
            }
            // console.log(itemDate, dateRangeValue.start, dateRangeValue.end);
        }

        // Category Filtering
        if (filters.category !== 'All' && item.category) {
            if (item.category !== filters.category) {
                return false;
            }
        }

        // Region Filtering
        if (filters.region !== 'All' && item.region) {
            if (item.region !== filters.region) {
                return false;
            }
        }

        // Status Filtering (for Orders)
        if (filters.status && filters.status !== 'All' && item.orderStatus) {
            if (item.orderStatus !== filters.status) {
                return false;
            }
        }

        // Customer Type Filtering (for Customers)
        if (filters.customerType && filters.customerType !== 'All' && item.customerType) {
            if (item.customerType !== filters.customerType) {
                return false;
            }
        }

        return true;
    });
};

export const filterOrders = (orders, filters, dateRangeValue) => {
    return filterData(orders, filters, dateRangeValue, 'orderDate');
};

export const filterCustomers = (customers, filters, dateRangeValue) => {
    // Customers might filter by signupDate?
    return filterData(customers, filters, dateRangeValue, 'signupDate');
};

export const filterProducts = (products, filters) => {
    // Products usually don't have date filtering in this context, just Category
    // But generic filterData handles date if dateField is present. Products dont have 'orderDate'.
    // If we pass null for dateRangeValue it skips date check?
    // filterData checks: if (dateRangeValue && item[dateField])
    // So if item doesn't have dateField, it skips.
    return filterData(products, filters, null, null); 
};
