import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, CreditCard } from 'lucide-react';
import dayjs from 'dayjs';

const AnalyticsKPIs = ({ orders, customers, previousDateRangeValue }) => {
    // Current period metrics
    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.amount, 0), [orders]);
    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Previous period metrics for comparison (mock calculation)
    const revenueGrowth = useMemo(() => {
        if (!previousDateRangeValue) return 0;
        // This is a simplified calculation - in real app, would filter orders by previous period
        const growth = Math.random() * 20 - 5; // Mock: -5% to +15%
        return growth;
    }, [previousDateRangeValue, orders]);

    const orderGrowth = useMemo(() => {
        return Math.random() * 15 - 2; // Mock growth
    }, [orders]);

    const customerGrowth = useMemo(() => {
        const thirtyDaysAgo = dayjs().subtract(30, 'day');
        const newCustomers = customers.filter(c => dayjs(c.signupDate).isAfter(thirtyDaysAgo)).length;
        return customers.length > 0 ? (newCustomers / customers.length) * 100 : 0;
    }, [customers]);

    const kpis = [
        {
            title: 'Total Revenue',
            value: `₹${totalRevenue.toLocaleString('en-IN')}`,
            change: revenueGrowth,
            icon: DollarSign,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: 'Total Orders',
            value: totalOrders.toLocaleString(),
            change: orderGrowth,
            icon: ShoppingCart,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Total Customers',
            value: totalCustomers.toLocaleString(),
            change: customerGrowth,
            icon: Users,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: 'Avg. Order Value',
            value: `₹${Math.round(avgOrderValue).toLocaleString('en-IN')}`,
            change: revenueGrowth - orderGrowth,
            icon: CreditCard,
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                const isPositive = kpi.change >= 0;
                const TrendIcon = isPositive ? TrendingUp : TrendingDown;

                return (
                    <div
                        key={index}
                        className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 ${kpi.iconBg} rounded-md p-3`}>
                                    <Icon className={`h-6 w-6 ${kpi.iconColor}`} />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {kpi.title}
                                        </dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">
                                                {kpi.value}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <TrendIcon
                                    className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500'
                                        }`}
                                />
                                <span
                                    className={`ml-1 font-medium ${isPositive ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {isPositive ? '+' : ''}{kpi.change.toFixed(1)}%
                                </span>
                                <span className="ml-2 text-gray-500">vs last period</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AnalyticsKPIs;
