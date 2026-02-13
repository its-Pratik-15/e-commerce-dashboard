import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex bg-gray-50 text-gray-900 h-screen overflow-hidden">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 transform border-r border-gray-200 bg-white transition-all duration-300 ease-in-out lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isCollapsed ? 'w-20 lg:translate-x-0' : 'w-64 lg:translate-x-0'}`}>
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Header (replaces Header component for mobile view) */}
                <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-md text-gray-600 hover:bg-gray-100">
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900">Dashboard</span>
                    <div className="w-8" />
                </div>

                <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
