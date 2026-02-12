import React, { useMemo } from 'react';
import FilterBar from '../../filters/FilterBar';
import OverviewKPIs from '../../kpi/OverviewKPIs';
import RevenueTrendChart from '../../charts/RevenueTrendChart';
import CategorySalesChart from '../../charts/CategorySalesChart';
import { useFilters } from '../../context/FilterContext';
import { filterOrders } from '../../utils/filterUtils';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';

const Dashboard = () => {
    const { filters, dateRangeValue, previousDateRangeValue, comparisonLabel } = useFilters();

    // Calculate filtered orders once for all components
    const filteredOrders = useMemo(() => {
        return filterOrders(ordersData, filters, dateRangeValue);
    }, [filters, dateRangeValue, ordersData]);

    const previousFilteredOrders = useMemo(() => {
        return filterOrders(ordersData, filters, previousDateRangeValue);
    }, [filters, previousDateRangeValue, ordersData]);

    return (
        <div className="space-y-4">
            <h1 className="hidden text-lg font-semibold text-gray-900 sm:block">
                    Dashboard
                </h1>
            <FilterBar />

            <OverviewKPIs
                orders={filteredOrders}
                previousOrders={previousFilteredOrders}
                comparisonLabel={comparisonLabel}
                loading={false}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RevenueTrendChart orders={filteredOrders} />
                <CategorySalesChart orders={filteredOrders} />
            </div>
        </div>
    );
};

export default Dashboard;
