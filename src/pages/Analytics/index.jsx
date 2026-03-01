import React, { useState, Suspense } from 'react';
import FilterBar from '../../filters/FilterBar';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import AnalyticsNav from './components/AnalyticsNav';
import { ChartSkeleton } from '../../components/common/Skeletons';

const UserAnalytics = React.lazy(() => import('./components/UserAnalytics'));
const SalesAnalytics = React.lazy(() => import('./components/SalesAnalytics'));
const ProductAnalytics = React.lazy(() => import('./components/ProductAnalytics'));

const Analytics = () => {
    const [activeTab, setActiveTab] = useState('customers');
    const analyticsData = useAnalyticsData();

    const renderContent = () => {
        switch (activeTab) {
            case 'customers':
                return (
                    <Suspense fallback={<ChartSkeleton />}>
                        <UserAnalytics
                            customers={analyticsData.customers}
                            orders={analyticsData.orders}
                            allCustomers={analyticsData.allCustomers}
                        />
                    </Suspense>
                );
            case 'orders':
                return (
                    <Suspense fallback={<ChartSkeleton />}>
                        <SalesAnalytics
                            orders={analyticsData.orders}
                            customers={analyticsData.customers}
                        />
                    </Suspense>
                );
            case 'products':
                return (
                    <Suspense fallback={<ChartSkeleton />}>
                        <ProductAnalytics
                            products={analyticsData.products}
                            orders={analyticsData.orders}
                        />
                    </Suspense>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col overflow-hidden bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Comprehensive business metrics and insights</p>
                    </div>
                </div>

                {/* Navigation Tabs and Filters Row */}
                <div className="mt-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <AnalyticsNav activeTab={activeTab} onTabChange={setActiveTab} />
                    <div className="flex-shrink-0 pt-4">
                        <FilterBar />
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-[1600px] mx-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
