import React from 'react';
import { Menu, X, Bell, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Header = ({ sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed }) => {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/50 px-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 lg:hidden"
                >
                    {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden rounded-lg p-2 text-gray-400 hover:bg-gray-100 lg:block"
                >
                    {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
                </button>

                <h1 className="hidden text-lg font-semibold text-gray-900 sm:block">
                    Dashboard
                </h1>
            </div>

            <div className='flex items-center gap-x-4 lg:hidden'>
                <span className="text-xl font-bold text-indigo-500">DashBoard</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="h-9 w-64 rounded-md border border-gray-200 bg-gray-100 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-500 transition-all focus:w-80 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                <button className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                <div className="relative group">
                    <button className="flex items-center gap-2 rounded-full p-1 pr-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-indigo-500 font-bold text-white">
                            JS
                        </div>
                        <span className="hidden sm:inline-block">John Smith</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
