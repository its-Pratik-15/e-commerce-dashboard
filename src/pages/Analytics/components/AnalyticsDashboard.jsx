import { useMemo, useState } from 'react';
import { BarChart3, Download, RefreshCw } from 'lucide-react';
import customersData from '../../../data/customers.json';
import ordersData from '../../../data/orders.json';
import productsData from '../../../data/products.json';
import { enrichOrders } from '../services/joinService';
import { applyFilters, aggregateData, calculateSummaryStats } from '../services/aggregationService';
import FiltersPanel from './FiltersPanel';
import AnalyticsTable from './AnalyticsTable';

export default function AnalyticsDashboard() {
    const [config, setConfig] = useState({
        groupBy: 'category',
        aggregation: 'sum',
        filters: {
            region: 'All',
            status: 'All',
            category: 'All',
            customerType: 'All'
        }
    });

    // Enrich and process data with useMemo for performance
    const { analyticsData, summaryStats, enrichedData } = useMemo(() => {
        // Step 1: Enrich orders with customer and product data
        const enriched = enrichOrders(ordersData, customersData, productsData);

        // Step 2: Apply filters
        const filtered = applyFilters(enriched, config.filters);

        // Step 3: Calculate summary statistics
        const stats = calculateSummaryStats(filtered, 'amount');

        // Step 4: Aggregate data based on groupBy and aggregation type
        const aggregated = aggregateData(
            filtered,
            config.groupBy,
            config.aggregation,
            'amount'
        );

        return {
            analyticsData: aggregated,
            summaryStats: stats,
            enrichedData: filtered
        };
    }, [config]);

    const handleReset = () => {
        setConfig({
            groupBy: 'category',
            aggregation: 'sum',
            filters: {
                region: 'All',
                status: 'All',
                category: 'All',
                customerType: 'All'
            }
        });
    };

    const handleExport = () => {
        const csv = [
            ['Label', 'Count', 'Value'],
            ...analyticsData.map(row => [row.label, row.count, row.value])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${Date.now()}.csv`;
        a.click();
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                        <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Dynamic data aggregation and analysis
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Reset
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase">Total Records</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {summaryStats.count.toLocaleString()}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase">Total Value</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">
                        ₹{summaryStats.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase">Average</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        ₹{summaryStats.average.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase">Groups</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {analyticsData.length}
                    </p>
                </div>
            </div>

            {/* Filters Panel */}
            <FiltersPanel config={config} setConfig={setConfig} />

            {/* Analytics Table */}
            <AnalyticsTable data={analyticsData} aggregationType={config.aggregation} />
        </div>
    );
}
