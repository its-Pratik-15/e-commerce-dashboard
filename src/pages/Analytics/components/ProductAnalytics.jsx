import React, { useMemo, Suspense } from 'react';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { ChartSkeleton } from '../../../components/common/Skeletons';
import KPICard from '../../../components/common/KPICard';

const CategorySalesChart = React.lazy(() => import('../../../charts/CategorySalesChart'));
const OrderStatusChart = React.lazy(() => import('../../../charts/OrderStatusChart'));
const TopProductsChart = React.lazy(() => import('../../../charts/TopProductsChart'));

const ProductAnalytics = ({ products = [], orders = [] }) => {
    // Metrics
    const totalProducts = products.length;
    // Mock stock if missing
    const productsWithStock = useMemo(() => products.map(p => ({ ...p, stock: p.stock || Math.floor(Math.random() * 50) })), [products]);
    const lowStockCount = productsWithStock.filter(p => p.stock < 10).length;

    // Top Selling Products based on Orders with product details
    const topProducts = useMemo(() => {
        const productMap = {};
        products.forEach(product => {
            productMap[product.productId] = product;
        });

        const productSales = {};
        orders.forEach(order => {
            const productId = order.productId;
            const product = productMap[productId];

            if (!productSales[productId]) {
                productSales[productId] = {
                    productId,
                    name: product?.name || 'Unknown Product',
                    category: product?.category || 'Unknown',
                    price: product?.price || 0,
                    count: 0,
                    revenue: 0,
                };
            }
            productSales[productId].count += 1;
            productSales[productId].revenue += order.amount;
        });

        return Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue);
    }, [orders, products]);

    const topPerformer = topProducts[0]?.name || 'N/A';

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
                    value={topPerformer}
                    icon={TrendingUp}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Order Status Chart */}
                <Suspense fallback={<ChartSkeleton />}>
                    <OrderStatusChart orders={orders} />
                </Suspense>

                {/* Top Products Chart */}
                <Suspense fallback={<ChartSkeleton />}>
                    <TopProductsChart orders={orders} products={products} />
                </Suspense>
            </div>

            {/* Category Sales Chart */}
            <Suspense fallback={<ChartSkeleton />}>
                <CategorySalesChart orders={orders} />
            </Suspense>
        </div>
    );
};

export default ProductAnalytics;
