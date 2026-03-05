import React, { useMemo, Suspense } from 'react';
import { DollarSign, ShoppingCart, CreditCard } from 'lucide-react';
import { ChartSkeleton } from '../../../components/common/Skeletons';
import KPICard from '../../../components/common/KPICard';
import { formatCurrency } from '../../../utils/kpiUtils';

const CategorySalesChart = React.lazy(() => import('../../../charts/CategorySalesChart'));
const SalesByPaymentChart = React.lazy(() => import('../../../charts/SalesByPaymentChart'));
const SalesByRegionChart = React.lazy(() => import('../../../charts/SalesByRegionChart'));

const SalesAnalytics = ({ orders = [], customers = [] }) => {
    // Basic Metrics
    const totalSales = useMemo(() => orders.reduce((sum, order) => sum + order.amount, 0), [orders]);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    return (
        <div className="space-y-6">

            {/* KPI Cards for Sales */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <KPICard
                    title="Total Sales"
                    value={formatCurrency(totalSales)}
                    icon={DollarSign}
                />
                <KPICard
                    title="Total Orders"
                    value={totalOrders.toLocaleString()}
                    icon={ShoppingCart}
                />
                <KPICard
                    title="Avg. Order Value"
                    value={formatCurrency(avgOrderValue)}
                    icon={CreditCard}
                />
            </div>

            {/* Sales Chart */}
            <Suspense fallback={<ChartSkeleton />}>
                <CategorySalesChart orders={orders} />
            </Suspense>

            {/* Sales Analysis Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Suspense fallback={<ChartSkeleton />}>
                    <SalesByPaymentChart orders={orders} />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <SalesByRegionChart orders={orders} />
                </Suspense>
            </div>
        </div>
    );
};

export default SalesAnalytics;
