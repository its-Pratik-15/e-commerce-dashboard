import React, { useMemo, Suspense, lazy } from 'react';
import FilterBar from '../../filters/FilterBar';
import { ChartSkeleton, KPISkeleton } from '../../components/common/Skeletons';
import { useFilters } from '../../context/FilterContext';
import { filterOrders } from '../../utils/filterUtils';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';

// Lazy load components
const DashboardKPIs = lazy(() => import('./components/DashboardKPIs'));
const RevenueTrendChart = lazy(() => import('../../charts/RevenueTrendChart'));
const CategorySalesChart = lazy(() => import('../../charts/CategorySalesChart'));
const RegionCustomerChart = lazy(() => import('../../charts/RegionCustomerChart'));
const PaymentMethodChart = lazy(() => import('../../charts/PaymentMethodChart'));
const OrderStatusChart = lazy(() => import('../../charts/OrderStatusChart'));

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

            <Suspense fallback={<KPISkeleton />}>
                <DashboardKPIs
                    orders={filteredOrders}
                    previousOrders={previousFilteredOrders}
                    comparisonLabel={comparisonLabel}
                    loading={false}
                />
            </Suspense>

            <Suspense fallback={<ChartSkeleton />}>
                <div className="w-full">
                    <RevenueTrendChart orders={filteredOrders} />
                </div>
            </Suspense>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Suspense fallback={<ChartSkeleton />}>
                    <CategorySalesChart orders={filteredOrders} />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <RegionCustomerChart customers={customersData} />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <PaymentMethodChart orders={filteredOrders} />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <OrderStatusChart orders={filteredOrders} />
                </Suspense>
            </div>
        </div>
    );
};

export default Dashboard;
