import React from 'react';

const ChartSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

const KPISkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5 animate-pulse">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-gray-200 rounded-md p-3 h-12 w-12"></div>
                            <div className="ml-5 w-0 flex-1">
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { ChartSkeleton, KPISkeleton };
