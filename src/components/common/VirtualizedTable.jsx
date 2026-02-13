import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

const VirtualizedTable = ({
    columns,
    data,
    height = '600px',
    rowHeight = 48,
    onRowClick
}) => {
    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => rowHeight,
        overscan: 10,
    });

    return (
        <div
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col"
            style={{ height }}
        >
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 grid pr-4" style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') }}>
                {columns.map((column) => (
                    <div
                        key={column.key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-gray-700"
                        onClick={() => column.onSort && column.onSort(column.key)}
                    >
                        {column.header}
                        {column.sortable && (
                            <span className="ml-1">
                                {column.sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> :
                                    column.sortDirection === 'desc' ? <ChevronDown className="h-3 w-3" /> :
                                        <ChevronsUpDown className="h-3 w-3" />}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Scrollable Body */}
            <div
                ref={parentRef}
                style={{ overflowY: 'auto', contain: 'strict' }}
                className="w-full flex-1"
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const row = data[virtualRow.index];
                        return (
                            <div
                                key={virtualRow.key}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={`absolute top-0 left-0 w-full grid items-center border-b border-gray-100 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                                style={{
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                    gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ')
                                }}
                            >
                                {columns.map((column) => (
                                    <div key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate">
                                        {column.render ? column.render(row) : row[column.key]}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VirtualizedTable;
