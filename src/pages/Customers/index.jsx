import React, { useMemo, useState } from 'react';
import FilterBar from '../../filters/FilterBar';
import VirtualizedTable from '../../components/common/VirtualizedTable';
import { useFilters } from '../../context/FilterContext';
import { filterCustomers } from '../../utils/filterUtils';
import customersData from '../../data/customers.json';
import dayjs from 'dayjs';
import { User, MapPin, Crown, Calendar } from 'lucide-react';

const CustomersPage = () => {
    const { filters, dateRangeValue } = useFilters();
    const [sortConfig, setSortConfig] = useState({ key: 'signupDate', direction: 'desc' });

    // Filter and Sort Data
    const processedCustomers = useMemo(() => {
        let filtered = filterCustomers(customersData, filters, dateRangeValue);

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return filtered;
    }, [filters, dateRangeValue, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const columns = useMemo(() => [
        {
            key: 'name',
            header: 'Customer Name',
            width: '2fr',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {row.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{row.name}</span>
                </div>
            )
        },
        {
            key: 'region',
            header: 'Region',
            width: '1fr',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{row.region}</span>
                </div>
            )
        },
        {
            key: 'customerType',
            header: 'Type',
            width: '1fr',
            sortable: true,
            render: (row) => (
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${row.customerType === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        row.customerType === 'Premium' ? 'bg-amber-100 text-amber-800' :
                            'bg-gray-100 text-gray-800'}`}>
                    {row.customerType === 'VIP' && <Crown className="h-3 w-3" />}
                    {row.customerType}
                </span>
            )
        },
        {
            key: 'signupDate',
            header: 'Joined',
            width: '1fr',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-1.5 text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{dayjs(row.signupDate).format('MMM D, YYYY')}</span>
                </div>
            )
        },
    ], []);

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and view your customer base</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-500">Total Customers: </span>
                    <span className="font-bold text-gray-900">{processedCustomers.length}</span>
                </div>
            </div>

            <FilterBar showCategory={false} showCustomerType={true} showSearch={true}/>

            <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-[600px] w-full">
                    <VirtualizedTable
                        data={processedCustomers}
                        columns={columns.map(col => ({
                            ...col,
                            sortDirection: sortConfig.key === col.key ? sortConfig.direction : null,
                            onSort: handleSort
                        }))}
                        height="100%"
                        rowHeight={60}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;
