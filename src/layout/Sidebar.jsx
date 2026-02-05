import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, LogOut, ShoppingCart, Users, Package } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isCollapsed }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/overview' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: ShoppingCart, label: 'Orders', path: '/orders' },
        { icon: Users, label: 'Customers', path: '/customers' },
        { icon: Package, label: 'Products', path: '/products' },
    ];

    const generalItems = [
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: LogOut, label: 'Logout', path: '/logout', className: 'text-red-600 hover:bg-red-50 hover:text-red-700' },
    ];

    return (
        <aside
            className={clsx(
                "fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div className={clsx("flex h-16 items-center border-b border-gray-200 px-6", isCollapsed ? "justify-center" : "")}>
                <span className={clsx("text-xl font-bold text-indigo-600", isCollapsed && "hidden")}>DashBoard</span>
                {isCollapsed && <span className="text-xl font-bold text-indigo-600">DB</span>}
            </div>

            <div className="flex flex-col h-[calc(100vh-4rem)] justify-between px-3 py-4">
                {/* Menu Section */}
                <div>
                    {!isCollapsed && (
                        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Menu
                        </h3>
                    )}
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        clsx(
                                            'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                                            isCollapsed && 'justify-center'
                                        )
                                    }
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <item.icon className={clsx("h-5 w-5", !isCollapsed && "mr-3")} />
                                    {!isCollapsed && item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* General Section */}
                <div>
                    {!isCollapsed && (
                        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            General
                        </h3>
                    )}
                    <ul className="space-y-1">
                        {generalItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        clsx(
                                            'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                            item.className || (isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'),
                                            isCollapsed && 'justify-center'
                                        )
                                    }
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <item.icon className={clsx("h-5 w-5", !isCollapsed && "mr-3")} />
                                    {!isCollapsed && item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
