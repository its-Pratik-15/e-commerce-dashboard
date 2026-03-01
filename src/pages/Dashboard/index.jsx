import React, { useMemo } from 'react';
import FilterBar from '../../filters/FilterBar';
import DashboardKPIs from './components/DashboardKPIs';
import RevenueTrendChart from '../../charts/RevenueTrendChart';
import CategorySalesChart from '../../charts/CategorySalesChart';
import RegionCustomerChart from '../../charts/RegionCustomerChart';
import PaymentMethodChart from '../../charts/PaymentMethodChart';
import OrderStatusChart from '../../charts/OrderStatusChart.jsx';
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
        <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and view your dashboard</p>
                </div>
            </div>
            <FilterBar />

            <DashboardKPIs
                orders={filteredOrders}
                previousOrders={previousFilteredOrders}
                comparisonLabel={comparisonLabel}
                loading={false}
            />

            <div className="w-full">
                <RevenueTrendChart orders={filteredOrders} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <CategorySalesChart orders={filteredOrders} />
                <RegionCustomerChart customers={customersData} />
                <PaymentMethodChart orders={filteredOrders} />
                <OrderStatusChart orders={filteredOrders} />
            </div>
        </div>
    );
};

export default Dashboard;
