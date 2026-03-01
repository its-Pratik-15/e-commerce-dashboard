import { useMemo } from 'react';
import { useFilters } from '../../../context/FilterContext';
import { filterOrders, filterCustomers } from '../../../utils/filterUtils';
import ordersData from '../../../data/orders.json';
import customersData from '../../../data/customers.json';
import productsData from '../../../data/products.json';

export const useAnalyticsData = () => {
    const { filters, dateRangeValue, previousDateRangeValue } = useFilters();

    const filteredOrders = useMemo(
        () => filterOrders(ordersData, filters, dateRangeValue),
        [filters, dateRangeValue]
    );

    const filteredCustomers = useMemo(
        () => filterCustomers(customersData, filters, dateRangeValue),
        [filters, dateRangeValue]
    );

    return {
        orders: filteredOrders,
        customers: filteredCustomers,
        products: productsData,
        allOrders: ordersData,
        allCustomers: customersData,
        previousDateRangeValue,
    };
};
