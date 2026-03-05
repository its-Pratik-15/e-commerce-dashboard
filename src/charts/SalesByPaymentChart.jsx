import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';

const SalesByPaymentChart = ({ orders = [] }) => {
    const chartOption = useMemo(() => {
        // Group sales by payment method
        const paymentSales = {};
        orders.forEach(order => {
            const method = order.paymentMethod || 'Unknown';
            paymentSales[method] = (paymentSales[method] || 0) + order.amount;
        });

        const labels = Object.keys(paymentSales);
        const values = Object.values(paymentSales);

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
                    const method = params[0].name;
                    const value = new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                    }).format(params[0].value);
                    return `${method}<br/>Sales: <b>${value}</b>`;
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
                axisLabel: { color: '#6b7280' }
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
                    name: 'Sales',
                    type: 'bar',
                    barWidth: '60%',
                    itemStyle: {
                        color: '#10b981',
                        borderRadius: [4, 4, 0, 0]
                    },
                    data: values
                }
            ]
        };
    }, [orders]);

    return (
        <ChartWrapper title="Sales by Payment Method" description="Sales distribution across payment types">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default SalesByPaymentChart;
