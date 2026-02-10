import React, { createContext, useContext, useState, useMemo } from 'react';
import dayjs from 'dayjs';

const FilterContext = createContext();

export const DATE_RANGES = {
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_YEAR: 'this_year',
    ALL_TIME: 'all_time'
};

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        dateRange: DATE_RANGES.ALL_TIME,
        category: 'All',
        region: 'All',
        status: 'All',
        customerType: 'All',
        searchQuery: '' // Adding search query as well for global search if needed
    });

    // Helper to calculate start and end dates based on range
    const dateRangeValue = useMemo(() => {
        const now = dayjs();
        switch (filters.dateRange) {
            case DATE_RANGES.LAST_7_DAYS:
                return { start: now.subtract(7, 'day'), end: now };
            case DATE_RANGES.LAST_30_DAYS:
                return { start: now.subtract(30, 'day'), end: now };
            case DATE_RANGES.THIS_MONTH:
                return { start: now.startOf('month'), end: now.endOf('month') };
            case DATE_RANGES.LAST_MONTH:
                return { start: now.subtract(1, 'month').startOf('month'), end: now.subtract(1, 'month').endOf('month') };
            case DATE_RANGES.THIS_YEAR:
                return { start: now.startOf('year'), end: now.endOf('year') };
            case DATE_RANGES.ALL_TIME:
            default:
                return null; // No filtering
        }
    }, [filters.dateRange]);

    const previousDateRangeValue = useMemo(() => {
        const now = dayjs();
        switch (filters.dateRange) {
            case DATE_RANGES.LAST_7_DAYS:
                // Compare with the 7 days BEFORE the last 7 days (day -14 to day -7)
                return { start: now.subtract(14, 'day'), end: now.subtract(7, 'day') };
            case DATE_RANGES.LAST_30_DAYS:
                return { start: now.subtract(60, 'day'), end: now.subtract(30, 'day') };
            case DATE_RANGES.THIS_MONTH:
                // Previous month
                return { start: now.subtract(1, 'month').startOf('month'), end: now.subtract(1, 'month').endOf('month') };
            case DATE_RANGES.LAST_MONTH:
                // Month before last month
                return { start: now.subtract(2, 'month').startOf('month'), end: now.subtract(2, 'month').endOf('month') };
            case DATE_RANGES.THIS_YEAR:
                // Last year
                return { start: now.subtract(1, 'year').startOf('year'), end: now.subtract(1, 'year').endOf('year') };
            case DATE_RANGES.ALL_TIME:
            default:
                return null;
        }
    }, [filters.dateRange]);

    const comparisonLabel = useMemo(() => {
        switch (filters.dateRange) {
            case DATE_RANGES.LAST_7_DAYS:
                return "vs prev 7 days";
            case DATE_RANGES.LAST_30_DAYS:
                return "vs prev 30 days";
            case DATE_RANGES.THIS_MONTH:
                return "vs last month";
            case DATE_RANGES.LAST_MONTH:
                return "vs 2 months ago";
            case DATE_RANGES.THIS_YEAR:
                return "vs last year";
            case DATE_RANGES.ALL_TIME:
            default:
                return "vs previous period";
        }
    }, [filters.dateRange]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            dateRange: DATE_RANGES.ALL_TIME,
            category: 'All',
            region: 'All',
            status: 'All',
            customerType: 'All',
            searchQuery: ''
        });
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter, resetFilters, dateRangeValue, previousDateRangeValue, comparisonLabel }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};
