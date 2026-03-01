import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const KPICard = ({ title, value, change, changeType, loading, label, icon: Icon }) => {
    const isPositive = changeType === 'positive';
    const isNegative = changeType === 'negative';

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                {Icon && <Icon className="h-5 w-5 text-gray-400" />}
            </div>
            <div className="mt-2 flex items-end justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                    {loading ? (
                        <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
                    ) : (
                        value
                    )}
                </h3>
                {!loading && change !== undefined && Math.abs(change) > 0 && (
                    <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-500' :
                            isNegative ? 'text-red-500' :
                                'text-gray-500'
                        }`}>
                        {isPositive && <ArrowUpRight className="mr-1 h-5 w-5" />}
                        {isNegative && <ArrowDownRight className="mr-1 h-5 w-5" />}
                        {!isPositive && !isNegative && <Minus className="mr-1 h-5 w-5" />}
                        {Math.abs(change)}%
                    </div>
                )}
            </div>
            {!loading && label && change !== undefined && Math.abs(change) > 0 && (
                <p className="mt-1 text-xs text-gray-400">{label}</p>
            )}
        </div>
    );
};

export default KPICard;
