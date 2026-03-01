import React, { useMemo } from 'react';
import KPICard from '../../../components/common/KPICard';
import { formatCurrency, calculateMetrics, calculatePercentageChange, getChangeType } from '../../../utils/kpiUtils';

const DashboardKPIs = ({ orders = [], previousOrders = [], comparisonLabel = 'vs previous period', loading = false }) => {
    // Memoize the data calculation
    const kpiData = useMemo(() => {
        const currentCheck = calculateMetrics(orders);
        const previousCheck = calculateMetrics(previousOrders);

        return {
            current: currentCheck,
            changes: {
                revenue: calculatePercentageChange(currentCheck.revenue, previousCheck.revenue).toFixed(1),
                orders: calculatePercentageChange(currentCheck.orders, previousCheck.orders).toFixed(1),
                aov: calculatePercentageChange(currentCheck.aov, previousCheck.aov).toFixed(1),
                activeCustomers: calculatePercentageChange(currentCheck.activeCustomers, previousCheck.activeCustomers).toFixed(1)
            }
        };
    }, [orders, previousOrders]);

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <KPICard
                title="Total Revenue"
                value={formatCurrency(kpiData.current.revenue)}
                change={kpiData.changes.revenue}
                changeType={getChangeType(kpiData.changes.revenue)}
                loading={loading}
                label={comparisonLabel}
            />
            <KPICard
                title="Total Orders"
                value={kpiData.current.orders.toLocaleString()}
                change={kpiData.changes.orders}
                changeType={getChangeType(kpiData.changes.orders)}
                loading={loading}
                label={comparisonLabel}
            />
            <KPICard
                title="Avg. Order Value"
                value={formatCurrency(kpiData.current.aov)}
                change={kpiData.changes.aov}
                changeType={getChangeType(kpiData.changes.aov)}
                loading={loading}
                label={comparisonLabel}
            />
            <KPICard
                title="Active Customers"
                value={kpiData.current.activeCustomers.toLocaleString()}
                change={kpiData.changes.activeCustomers}
                changeType={getChangeType(kpiData.changes.activeCustomers)}
                loading={loading}
                label={comparisonLabel}
            />
        </div>
    );
};

export default DashboardKPIs;
