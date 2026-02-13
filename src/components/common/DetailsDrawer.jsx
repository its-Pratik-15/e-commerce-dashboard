import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const DetailsDrawer = ({ isOpen, onClose, title, children }) => {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
                {/* Background overlay */}
                <div
                    className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    {/* Drawer panel */}
                    <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            {/* Header */}
                            <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900" id="slide-over-title">
                                        {title}
                                    </h2>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <X className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative mt-6 flex-1 px-4 sm:px-6 pb-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsDrawer;
