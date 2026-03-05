import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';

const TopProductsChart = ({ orders = [], products = [] }) => {
    const chartOption = useMemo(() => {
        // Create product map
        const productMap = {};
        products.forEach(product => {
            productMap[product.productId] = product.name;
        });

        // Calculate sales per product
        const productSales = {};
        orders.forEach(order => {
            const productId = order.productId;
            const productName = productMap[productId] || 'Unknown Product';
            if (!productSales[productId]) {
                productSales[productId] = {
                    name: productName,
                    revenue: 0,
                    quantity: 0
                };
            }
            productSales[productId].revenue += order.amount;
            productSales[productId].quantity += 1;
        });

        // Get top 10 products by revenue
        const topProducts = Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        const labels = topProducts.map(p => p.name);
        const values = topProducts.map(p => p.revenue);

        const currencyFormatter = (value) => {
            if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
            if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
            if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
            return `₹${value}`;
        };

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: function (params) {
                    const name = params[0].name;
                    const value = new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                    }).format(params[0].value);
                    return `${name}<br/>Revenue: <b>${value}</b>`;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: labels,
                axisTick: { alignWithLabel: true },
                axisLine: { lineStyle: { color: '#e5e7eb' } },
                axisLabel: {
                    color: '#6b7280',
                    rotate: 45,
                    fontSize: 10
                }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { lineStyle: { color: '#f3f4f6' } },
                axisLabel: {
                    color: '#6b7280',
                    formatter: currencyFormatter
                }
            },
            series: [
                {
                    name: 'Revenue',
                    type: 'bar',
                    barWidth: '60%',
                    itemStyle: {
                        color: '#f59e0b',
                        borderRadius: [4, 4, 0, 0]
                    },
                    data: values
                }
            ]
        };
    }, [orders, products]);

    return (
        <ChartWrapper title="Top 10 Products" description="Best selling products by revenue">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default TopProductsChart;
