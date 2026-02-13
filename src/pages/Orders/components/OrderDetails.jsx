import React from 'react';
import dayjs from 'dayjs';

const OrderDetails = ({ order }) => {
    if (!order) return null;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                    <p className="mt-1 text-sm font-mono text-gray-900">{order.orderId}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                    <p className="mt-1 text-sm text-gray-900">{dayjs(order.orderDate).format('MMM D, YYYY')}</p>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-1
                    ${order.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'}`}>
                    {order.orderStatus}
                </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-base font-medium text-gray-900 mb-3">Customer</h3>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                        {order.customerName?.charAt(0) || '?'}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{order.customerName || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{order.customerId}</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-base font-medium text-gray-900 mb-3">Order Items</h3>
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-900">{order.productName || 'Product'}</p>
                            <p className="text-xs text-gray-500">{order.category || 'Category'}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">₹{order.amount?.toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                    <p className="text-base font-medium text-gray-900">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">₹{order.amount?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
