import React, { useMemo, Suspense } from 'react';
import { Users, UserPlus, Activity } from 'lucide-react';
import { ChartSkeleton } from '../../../components/common/Skeletons';
import KPICard from '../../../components/common/KPICard';
import dayjs from 'dayjs';

const RegionCustomerChart = React.lazy(() => import('../../../charts/RegionCustomerChart'));
const CustomerGrowthChart = React.lazy(() => import('../../../charts/CustomerGrowthChart'));

const UserAnalytics = ({ customers = [], orders = [], allCustomers = [] }) => {
    // Metrics
    const totalCustomers = customers.length;
    const newCustomers = useMemo(() => {
        const thirtyDaysAgo = dayjs().subtract(30, 'day');
        return customers.filter(c => dayjs(c.signupDate).isAfter(thirtyDaysAgo)).length;
    }, [customers]);

    // Active Users (simplified definition: ordered in last 30 days)
    const activeUsers = useMemo(() => {
        const thirtyDaysAgo = dayjs().subtract(30, 'day');
        const recentOrderUserIds = new Set(
            orders
                .filter(o => dayjs(o.orderDate).isAfter(thirtyDaysAgo))
                .map(o => o.customerId)
        );
        return recentOrderUserIds.size;
    }, [orders]);


    return (
        <div className="space-y-6">
            {/* KPI Cards for Users */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <KPICard
                    title="Total Customers"
                    value={totalCustomers.toLocaleString()}
                    icon={Users}
                />
                <KPICard
                    title="New Users"
                    value={`+${newCustomers.toLocaleString()}`}
                    icon={UserPlus}
                />
                <KPICard
                    title="Active Users"
                    value={activeUsers.toLocaleString()}
                    icon={Activity}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Suspense fallback={<ChartSkeleton />}>
                    <RegionCustomerChart customers={customers} />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <CustomerGrowthChart customers={allCustomers} />
                </Suspense>
            </div>
        </div>
    );
};

export default UserAnalytics;
