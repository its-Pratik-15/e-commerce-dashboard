import React from 'react';
import dayjs from 'dayjs';
import { User, MapPin, Crown, Calendar, Package } from 'lucide-react';

const CustomerDetails = ({ customer, orders = [] }) => {
    if (!customer) return null;

    const customerOrders = orders
        .filter(o => o.customerId === customer.customerId)
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-3xl mb-4">
                    {customer.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                <span className={`mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
                    ${customer.customerType === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        customer.customerType === 'Premium' ? 'bg-amber-100 text-amber-800' :
                            'bg-gray-100 text-gray-800'}`}>
                    {customer.customerType === 'VIP' && <Crown className="h-4 w-4 mr-1" />}
                    {customer.customerType}
                </span>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-900">{customer.region}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-900">Member since {dayjs(customer.signupDate).format('MMMM D, YYYY')}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-900 text-xs font-mono">{customer.customerId}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Orders</h3>
                    <div className="space-y-3">
                        {customerOrders.length > 0 ? (
                            customerOrders.map(order => (
                                <div key={order.orderId} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${order.orderStatus === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                                            }`}>
                                            <Package className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Order #{order.orderId.substring(0, 8)}</p>
                                            <p className="text-xs text-gray-500">{dayjs(order.orderDate).format('MMM D, YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">₹{order.amount.toLocaleString()}</p>
                                        <span className="text-xs text-gray-500 capitalize">{order.orderStatus}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic text-center py-4">No orders found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
