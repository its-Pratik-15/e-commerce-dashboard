import React, { useMemo, useState, Suspense, lazy } from 'react';
import FilterBar from '../../filters/FilterBar';
import { TableSkeleton } from '../../components/common/Skeletons';
import { useFilters } from '../../context/FilterContext';
import { filterOrders } from '../../utils/filterUtils';
import ordersData from '../../data/orders.json';
import customersData from '../../data/customers.json';
import productsData from '../../data/products.json';
import dayjs from 'dayjs';

// Lazy load components
const VirtualizedTable = lazy(() => import('../../components/common/VirtualizedTable'));
const DetailsDrawer = lazy(() => import('../../components/common/DetailsDrawer'));
const OrderDetails = lazy(() => import('./components/OrderDetails'));

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

            <Suspense fallback={<TableSkeleton />}>
                <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-[600px] w-full">
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
            </Suspense>

            <Suspense fallback={null}>
                <DetailsDrawer
                    isOpen={!!selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    title="Order Details"
                >
                    {selectedOrder && (
                        <OrderDetails order={selectedOrder} />
                    )}
                </DetailsDrawer>
            </Suspense>
        </div>
    );
};

export default OrdersPage;
