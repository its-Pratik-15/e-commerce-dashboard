const ChartSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-3">
                <div className="h-64 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

const KPISkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

const TableSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <div className="h-12 bg-gray-200 rounded w-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PageSkeleton = () => {
    return (
        <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            </div>
            <KPISkeleton />
            <ChartSkeleton />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>
        </div>
    );
};

export { ChartSkeleton, KPISkeleton, TableSkeleton, PageSkeleton };
