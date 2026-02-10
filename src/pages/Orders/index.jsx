import React, { useMemo, useState } from 'react';
import FilterBar from '../../filters/FilterBar';
import VirtualizedTable from '../../components/common/VirtualizedTable';
import { useFilters } from '../../context/FilterContext';
import { filterOrders } from '../../utils/filterUtils';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';
import dayjs from 'dayjs';

const OrdersPage = () => {
    const { filters, dateRangeValue } = useFilters();
    const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });

    // Create a customer lookup map for performance
    const customerLookup = useMemo(() => {
        const lookup = {};
        customersData.forEach(c => {
            lookup[c.customerId] = c.name;
        });
        return lookup;
    }, []);

    // Filter and Sort Data
    const processedOrders = useMemo(() => {
        let filtered = filterOrders(ordersData, filters, dateRangeValue);

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return filtered;
    }, [filters, dateRangeValue, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const columns = useMemo(() => [
        {
            key: 'orderId',
            header: 'Order ID',
            width: '1fr',
            sortable: true,
            render: (row) => <span className="font-mono text-xs text-gray-500">{row.orderId.substring(0, 8)}...</span>
        },
        {
            key: 'orderDate',
            header: 'Date',
            width: '1fr',
            sortable: true,
            render: (row) => dayjs(row.orderDate).format('MMM D, YYYY')
        },
        {
            key: 'name',
            header: 'Customer',
            width: '2fr',
            sortable: true,
            render: (row) => <span className="text-gray-900 font-medium">{customerLookup[row.customerId] || 'Unknown Customer'}</span>
        },
        {
            key: 'amount',
            header: 'Amount',
            width: '1fr',
            sortable: true,
            render: (row) => `₹${row.amount.toLocaleString('en-IN')}`
        },
        {
            key: 'orderStatus',
            header: 'Status',
            width: '1fr',
            sortable: true,
            render: (row) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${row.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                        row.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            row.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'}`}>
                    {row.orderStatus}
                </span>
            )
        },
    ], []);

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            </div>

            <FilterBar showCategory={false} showStatus={true} />

            <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Custom wrapper for VirtualizedTable to fit remaining height */}
                <div className="h-[600px] w-full">
                    {/* The VirtualizedTable component needs further refinement for dynamic height/width 
                        but let's start with fixed height for simplicity or pass style */}
                    <VirtualizedTable
                        data={processedOrders}
                        columns={columns.map(col => ({
                            ...col,
                            sortDirection: sortConfig.key === col.key ? sortConfig.direction : null,
                            onSort: handleSort
                        }))}
                        height="100%"
                        rowHeight={50}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
