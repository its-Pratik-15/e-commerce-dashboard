import React, { useMemo } from 'react';
import FilterBar from '../../filters/FilterBar';
import OverviewKPIs from '../../kpi/OverviewKPIs';
import RevenueTrendChart from '../../charts/RevenueTrendChart';
import CategorySalesChart from '../../charts/CategorySalesChart';
import { useFilters } from '../../context/FilterContext';
import { filterOrders } from '../../utils/filterUtils';
import ordersData from '../../data/orders.json';

const Overview = () => {
    const { filters, dateRangeValue, previousDateRangeValue, comparisonLabel } = useFilters();

    // Calculate filtered orders once for all components
    const filteredOrders = useMemo(() => {
        return filterOrders(ordersData, filters, dateRangeValue);
    }, [filters, dateRangeValue]);

    const previousFilteredOrders = useMemo(() => {
        return filterOrders(ordersData, filters, previousDateRangeValue);
    }, [filters, previousDateRangeValue]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Overview Dashboard</h1>

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

export default Overview;
