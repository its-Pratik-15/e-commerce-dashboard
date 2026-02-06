import React from 'react';
import FilterBar from '../../filters/FilterBar';

const Overview = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Overview Dashboard</h1>
            <FilterBar />

            {/* KPI Cards will go here */}
        </div>
    );
};

export default Overview;
