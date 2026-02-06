import React from 'react';

const ChartWrapper = ({ title, description, children, className = '' }) => {
    return (
        <div className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {description && <p className="text-sm text-gray-400">{description}</p>}
            </div>
            <div className="h-64 w-full">
                {children}
            </div>
        </div>
    );
};

export default ChartWrapper;
