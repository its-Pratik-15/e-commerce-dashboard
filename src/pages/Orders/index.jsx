import React, { useMemo, useState } from 'react';
import FilterBar from '../../filters/FilterBar';
import VirtualizedTable from '../../components/common/VirtualizedTable';
import { useFilters } from '../../context/FilterContext';
import { filterOrders } from '../../utils/filterUtils';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';

import productsData from '../../data/products.json';
import DetailsDrawer from '../../components/common/DetailsDrawer';
import OrderDetails from './components/OrderDetails';
import dayjs from 'dayjs';

const OrdersPage = () => {
    const { filters, dateRangeValue } = useFilters();
    const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });

    // Create customer and product lookups
    const { customerLookup, productLookup } = useMemo(() => {
        const cLookup = {};
        customersData.forEach(c => cLookup[c.customerId] = c);

        const pLookup = {};
        productsData.forEach(p => pLookup[p.productId] = p);

        return { customerLookup: cLookup, productLookup: pLookup };
    }, []);

    // Filter and Sort Data
    const processedOrders = useMemo(() => {
        // First enrich orders with customer and product details
        const enrichedOrders = ordersData.map(order => ({
            ...order,
            customerName: customerLookup[order.customerId]?.name || 'Unknown',
            customerEmail: customerLookup[order.customerId]?.email || '', // Assuming email exists in mock? Or just pass customer object
            productName: productLookup[order.productId]?.name || 'Unknown Product',
            productPrice: productLookup[order.productId]?.price || 0
        }));

        let filtered = filterOrders(enrichedOrders, filters, dateRangeValue);

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
    }, [filters, dateRangeValue, sortConfig, customerLookup]);

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
            render: (row) => <span className="text-gray-900 font-medium">{row.customerName}</span>
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

    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Order management</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-500">Total Orders: </span>
                    <span className="font-bold text-gray-900">{processedOrders.length}</span>
                </div>
            </div>

            <FilterBar showCategory={false} showStatus={true} showSearch={true} />

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
                        onRowClick={(row) => setSelectedOrder(row)}
                    />
                </div>
            </div>

            <DetailsDrawer
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                title="Order Details"
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                                <p className="mt-1 text-sm font-mono text-gray-900">{selectedOrder.orderId}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                                <p className="mt-1 text-sm text-gray-900">{dayjs(selectedOrder.orderDate).format('MMM D, YYYY')}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Status</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-1
                                ${selectedOrder.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                                    selectedOrder.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                        selectedOrder.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'}`}>
                                {selectedOrder.orderStatus}
                            </span>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-base font-medium text-gray-900 mb-3">Customer</h3>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                                    {selectedOrder.customerName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{selectedOrder.customerName}</p>
                                    <p className="text-xs text-gray-500">{selectedOrder.customerId}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-base font-medium text-gray-900 mb-3">Order Items</h3>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{selectedOrder.productName}</p>
                                        <p className="text-xs text-gray-500">{selectedOrder.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">₹{selectedOrder.amount.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                                <p className="text-base font-medium text-gray-900">Total Amount</p>
                                <p className="text-xl font-bold text-gray-900">₹{selectedOrder.amount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </DetailsDrawer>
        </div>
    );
};

export default OrdersPage;
