import React, { useMemo, Suspense } from 'react';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { ChartSkeleton } from '../../../components/common/Skeletons';
import KPICard from '../../../components/common/KPICard';

const CategorySalesChart = React.lazy(() => import('../../../charts/CategorySalesChart'));

const ProductAnalytics = ({ products = [], orders = [] }) => {
    // Metrics
    const totalProducts = products.length;
    // Mock stock if missing
    const productsWithStock = useMemo(() => products.map(p => ({ ...p, stock: p.stock || Math.floor(Math.random() * 50) })), [products]);
    const lowStockCount = productsWithStock.filter(p => p.stock < 10).length;

    // Top Selling Products based on Orders
    const topProducts = useMemo(() => {
        const productSales = {};
        orders.forEach(order => {
            if (productSales[order.productId]) {
                productSales[order.productId].count += 1;
                productSales[order.productId].revenue += order.amount;
            } else {
                productSales[order.productId] = {
                    count: 1,
                    revenue: order.amount,
                    name: order.productName || 'Unknown Product',
                };
            }
        });

        return Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);
    }, [orders]);

    return (
        <div className="space-y-6">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <KPICard
                    title="Total Products"
                    value={totalProducts.toLocaleString()}
                    icon={Package}
                />
                <KPICard
                    title="Low Stock Items"
                    value={lowStockCount.toLocaleString()}
                    icon={AlertTriangle}
                />
                <KPICard
                    title="Top Performer"
                    value={topProducts[0]?.name || 'N/A'}
                    icon={TrendingUp}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Category Chart */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Sales by Product Category</h3>
                    </div>
                    <div className="p-6">
                        <div className="h-[280px] w-full">
                            <Suspense fallback={<ChartSkeleton />}>
                                <CategorySalesChart orders={orders} />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* Top Products Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Top Selling Products</h3>
                    </div>
                    <div className="overflow-y-auto max-h-[350px]">
                        <ul className="divide-y divide-gray-200">
                            {topProducts.map((product, idx) => (
                                <li key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 font-mono mr-4 w-6">{idx + 1}</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                            <p className="text-xs text-gray-500">{product.count} orders</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAnalytics;
