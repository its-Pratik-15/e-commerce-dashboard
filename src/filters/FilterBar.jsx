import React from 'react';
import { FilterX, Calendar, MapPin, Tag } from 'lucide-react';
import { useFilters } from '../context/FilterContext';
import { DATE_RANGE_OPTIONS, CATEGORIES, REGIONS } from '../constants';

const FilterSelect = ({ icon: Icon, value, onChange, options, label, placeholder = 'Select...', showDefaultOption = true }) => (
    <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Icon className="h-4 w-4" />
        </div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-8 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-gray-300 transition-colors cursor-pointer"
        >
            {showDefaultOption && (
                <option value="All">{label ? `All ${label}s` : placeholder}</option>
            )}
            {options.map((opt) => {
                const optValue = typeof opt === 'object' ? opt.value : opt;
                const optLabel = typeof opt === 'object' ? opt.label : opt;
                return (
                    <option key={optValue} value={optValue}>
                        {optLabel}
                    </option>
                );
            })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
        </div>
    </div>
);

const FilterBar = () => {
    const { filters, updateFilter, resetFilters } = useFilters();

    return (
        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                <div className="w-full sm:w-48">
                    <FilterSelect
                        icon={Calendar}
                        value={filters.dateRange}
                        onChange={(val) => updateFilter('dateRange', val)}
                        options={DATE_RANGE_OPTIONS}
                        showDefaultOption={false} // Date range options already include "All Time"
                    />
                </div>

                <div className="w-full sm:w-48">
                    <FilterSelect
                        icon={Tag}
                        value={filters.category}
                        onChange={(val) => updateFilter('category', val)}
                        options={CATEGORIES}
                        label="Category"
                        showDefaultOption={true}
                    />
                </div>

                <div className="w-full sm:w-48">
                    <FilterSelect
                        icon={MapPin}
                        value={filters.region}
                        onChange={(val) => updateFilter('region', val)}
                        options={REGIONS}
                        label="Region"
                        showDefaultOption={true}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                    <FilterX className="h-4 w-4" />
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
