import React, { useMemo, useState, Suspense, lazy } from 'react';
import FilterBar from '../../filters/FilterBar';
import { TableSkeleton } from '../../components/common/Skeletons';
import { useFilters } from '../../context/FilterContext';
import { filterProducts } from '../../utils/filterUtils';
import productsData from '../../data/products.json';
import { Tag, Package, Banknote } from 'lucide-react';

// Lazy load components
const VirtualizedTable = lazy(() => import('../../components/common/VirtualizedTable'));
const DetailsDrawer = lazy(() => import('../../components/common/DetailsDrawer'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));

const ProductsPage = () => {
    const { filters } = useFilters();
    const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'desc' });
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filter and Sort Data
    const processedProducts = useMemo(() => {
        let filtered = filterProducts(productsData, filters);

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
    }, [filters, sortConfig]);

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
            header: 'Product Name',
            width: '2fr',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <Package className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{row.productId.substring(0, 8)}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'category',
            header: 'Category',
            width: '1fr',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-1.5 text-gray-600">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{row.category}</span>
                </div>
            )
        },
        {
            key: 'price',
            header: 'Price',
            width: '1fr',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-1.5 text-gray-900 font-medium font-mono">
                    <Banknote className="h-3.5 w-3.5 text-gray-400" />
                    <span>₹{row.price.toLocaleString('en-IN')}</span>
                </div>
            )
        },
    ], []);

    return (
        <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-sm text-gray-500 mt-1">Catalog management</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-500">Total Products: </span>
                    <span className="font-bold text-gray-900">{processedProducts.length}</span>
                </div>
            </div>

            <FilterBar showRegion={false} showDate={false} showSearch={true} />

            <Suspense fallback={<TableSkeleton />}>
                <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-[600px] w-full">
                        <VirtualizedTable
                            data={processedProducts}
                            columns={columns.map(col => ({
                                ...col,
                                sortDirection: sortConfig.key === col.key ? sortConfig.direction : null,
                                onSort: handleSort
                            }))}
                            height="100%"
                            rowHeight={64}
                            onRowClick={(row) => setSelectedProduct(row)}
                        />
                    </div>
                </div>
            </Suspense>

            <Suspense fallback={null}>
                <DetailsDrawer
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    title="Product Details"
                >
                    {selectedProduct && <ProductDetails product={selectedProduct} />}
                </DetailsDrawer>
            </Suspense>
        </div>
    );
};

export default ProductsPage;
