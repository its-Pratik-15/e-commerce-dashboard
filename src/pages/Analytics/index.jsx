import React, { useState, Suspense } from 'react';
import FilterBar from '../../filters/FilterBar';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import AnalyticsNav from './components/AnalyticsNav';
import { ChartSkeleton } from '../../components/common/Skeletons';

const UserAnalytics = React.lazy(() => import('./components/UserAnalytics'));
const SalesAnalytics = React.lazy(() => import('./components/SalesAnalytics'));
const ProductAnalytics = React.lazy(() => import('./components/ProductAnalytics'));
const AnalyticsDashboard = React.lazy(() => import('./components/AnalyticsDashboard'));

const Analytics = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
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
            case 'dashboard':
                return (
                    <Suspense fallback={<ChartSkeleton />}>
                        <AnalyticsDashboard />
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
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Comprehensive business insights and data analysis</p>
                </div>

                {/* Navigation Tabs */}
                <div className="mt-2">
                    <AnalyticsNav activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>

            {/* Filters Row - Only for Customer, Sales, Product Analysis */}
            {activeTab !== 'dashboard' && (
                <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
                    <FilterBar />
                </div>
            )}

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
