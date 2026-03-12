import React from 'react';
import { Users, ShoppingCart, Package, BarChart3 } from 'lucide-react';

const AnalyticsNav = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'dashboard', label: 'Analytics Dashboard', icon: BarChart3 },
        { id: 'customers', label: 'Customer Analysis', icon: Users },
        { id: 'orders', label: 'Sales Analysis', icon: ShoppingCart },
        { id: 'products', label: 'Product Analysis', icon: Package },
    ];

    return (
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-1">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all
                            ${isActive
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }
                        `}
                    >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

export default AnalyticsNav;
