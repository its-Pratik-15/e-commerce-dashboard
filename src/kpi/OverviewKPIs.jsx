import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const KPICard = ({ title, value, change, changeType, loading, label }) => {
    const isPositive = changeType === 'positive';
    const isNegative = changeType === 'negative';

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="mt-2 flex items-end justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                    {loading ? (
                        <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
                    ) : (
                        value
                    )}
                </h3>
                {!loading && Math.abs(change) > 0 && (
                    <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-500' :
                            isNegative ? 'text-red-500' :
                                'text-gray-500'
                        }`}>
                        {isPositive && <ArrowUpRight className="mr-1 h-5 w-5" />}
                        {isNegative && <ArrowDownRight className="mr-1 h-5 w-5" />}
                        {!isPositive && !isNegative && <Minus className="mr-1 h-5 w-5" />}
                        {Math.abs(change)}%
                    </div>
                )}
            </div>
            {!loading && Math.abs(change) > 0 && <p className="mt-1 text-xs text-gray-400">{label}</p>}
        </div>
    );
};

const OverviewKPIs = ({ orders = [], previousOrders = [], comparisonLabel = 'vs previous period', loading = false }) => {
    // Helper to calculate metrics
    const calculateMetrics = (data) => {
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

    // Memoize the data calculation
    const kpiData = useMemo(() => {
        const currentCheck = calculateMetrics(orders);
        const previousCheck = calculateMetrics(previousOrders);

        const getChange = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return ((current - previous) / previous) * 100;
        };

        return {
            current: currentCheck,
            changes: {
                revenue: getChange(currentCheck.revenue, previousCheck.revenue).toFixed(1),
                orders: getChange(currentCheck.orders, previousCheck.orders).toFixed(1),
                aov: getChange(currentCheck.aov, previousCheck.aov).toFixed(1),
                activeCustomers: getChange(currentCheck.activeCustomers, previousCheck.activeCustomers).toFixed(1)
            }
        };
    }, [orders, previousOrders]);

    const formatCurrency = (amount) => {
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

    const getChangeType = (change) => {
        const val = parseFloat(change);
        if (val > 0) return 'positive';
        if (val < 0) return 'negative';
        return 'neutral';
    };

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

export default OverviewKPIs;
