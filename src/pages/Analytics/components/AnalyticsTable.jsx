import React from 'react';
import { Hash } from 'lucide-react';

export default function AnalyticsTable({ data, aggregationType }) {
    const formatValue = (value) => {
        if (aggregationType === 'count') {
            return value.toLocaleString();
        }
        return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    };

    // Calculate totals once
    const total = data.reduce((sum, row) => sum + row.value, 0);
    const totalCount = data.reduce((sum, row) => sum + row.count, 0);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Aggregated Results</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {data.length} groups • {totalCount.toLocaleString()} total records
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Total Value</p>
                        <p className="text-xl font-bold text-indigo-600">{formatValue(total)}</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Label
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Count
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                % of Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                    No data available with current filters
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => {
                                const percentage = total > 0 ? (row.value / total) * 100 : 0;
                                const isTop3 = index < 3;

                                return (
                                    <tr
                                        key={row.label}
                                        className={`hover:bg-gray-50 transition-colors ${isTop3 ? 'bg-indigo-50/30' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span
                                                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${index === 0
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : index === 1
                                                            ? 'bg-gray-100 text-gray-700'
                                                            : index === 2
                                                                ? 'bg-orange-100 text-orange-700'
                                                                : 'bg-gray-50 text-gray-600'
                                                        }`}
                                                >
                                                    {index + 1}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {row.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-sm text-gray-600">
                                                {row.count.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Hash className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {formatValue(row.value)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-indigo-600 h-2 rounded-full transition-all"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 w-12">
                                                    {percentage.toFixed(1)}%
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Summary */}
            {data.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                            Showing {data.length} {data.length === 1 ? 'group' : 'groups'}
                        </span>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Total Records:</span>
                                <span className="font-semibold text-gray-900">
                                    {totalCount.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Total Value:</span>
                                <span className="font-semibold text-indigo-600">
                                    {formatValue(total)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
