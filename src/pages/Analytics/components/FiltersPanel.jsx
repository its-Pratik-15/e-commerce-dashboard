import React from 'react';
import { Filter, Calendar, MapPin, Tag, Activity, Users } from 'lucide-react';

const FilterSelect = ({ icon: Icon, label, value, onChange, options }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
            <Icon className="h-3 w-3" />
            {label}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
            <option value="All">All {label}s</option>
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

export default function FiltersPanel({ config, setConfig }) {
    const updateFilter = (key, value) => {
        setConfig({
            ...config,
            filters: {
                ...config.filters,
                [key]: value
            }
        });
    };

    const updateConfig = (key, value) => {
        setConfig({
            ...config,
            [key]: value
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-semibold text-gray-900">Analytics Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Group By */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        Group By
                    </label>
                    <select
                        value={config.groupBy}
                        onChange={(e) => updateConfig('groupBy', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                    >
                        <option value="category">Category</option>
                        <option value="region">Region</option>
                        <option value="paymentMethod">Payment Method</option>
                        <option value="orderStatus">Order Status</option>
                        <option value="customerType">Customer Type</option>
                    </select>
                </div>

                {/* Aggregation Type */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        Aggregation
                    </label>
                    <select
                        value={config.aggregation}
                        onChange={(e) => updateConfig('aggregation', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                    >
                        <option value="sum">Total (Sum)</option>
                        <option value="count">Count</option>
                        <option value="avg">Average</option>
                        <option value="min">Minimum</option>
                        <option value="max">Maximum</option>
                    </select>
                </div>

                {/* Region Filter */}
                <FilterSelect
                    icon={MapPin}
                    label="Region"
                    value={config.filters.region || 'All'}
                    onChange={(val) => updateFilter('region', val)}
                    options={['North India', 'South India', 'East India', 'West India', 'Central India']}
                />

                {/* Status Filter */}
                <FilterSelect
                    icon={Activity}
                    label="Status"
                    value={config.filters.status || 'All'}
                    onChange={(val) => updateFilter('status', val)}
                    options={['Completed', 'Processing', 'Shipped', 'Cancelled', 'Refunded']}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <FilterSelect
                    icon={Tag}
                    label="Category"
                    value={config.filters.category || 'All'}
                    onChange={(val) => updateFilter('category', val)}
                    options={['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Beauty']}
                />

                {/* Customer Type Filter */}
                <FilterSelect
                    icon={Users}
                    label="Customer Type"
                    value={config.filters.customerType || 'All'}
                    onChange={(val) => updateFilter('customerType', val)}
                    options={['Regular', 'Premium', 'VIP']}
                />
            </div>
        </div>
    );
}
