import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, LogOut, ShoppingCart, Users, Package, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
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
            <div className={clsx("flex h-16 items-center border-b border-gray-200 px-4 transition-all", isCollapsed ? "justify-center" : "justify-between")}>
                {!isCollapsed ? (
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                                <Zap className="h-5 w-5 text-white" fill="white" />
                            </div>
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                E-Dash
                            </span>
                            <span className="text-[10px] text-gray-400 -mt-1">Analytics Pro</span>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                            <Zap className="h-5 w-5 text-white" fill="white" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hidden lg:block"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
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

                    <div className={clsx("mt-6 border-t border-gray-100 pt-4 flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
                        <div className="h-9 w-9 rounded-full bg-indigo-100 flex flex-shrink-0 items-center justify-center text-indigo-600 font-bold text-sm">
                            JS
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-medium text-gray-900 truncate">John Smith</span>
                                <span className="text-xs text-gray-500 truncate">admin@store.com</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
