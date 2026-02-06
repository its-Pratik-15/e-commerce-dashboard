import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';
import { groupDataByCategory } from '../utils/chartUtils';

const CategorySalesChart = ({ orders = [] }) => {
    const chartOption = useMemo(() => {
        const { labels, values } = groupDataByCategory(orders, 'category', 'amount');

        // Formatter for tooltips and axis
        const currencyFormatter = (value) => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(value);
        };

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: function (params) {
                    const category = params[0].name;
                    const value = currencyFormatter(params[0].value);
                    return `${category}<br/>Sales: <b>${value}</b>`;
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
                    formatter: (value) => {
                        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                        if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
                        return value;
                    }
                }
            },
            series: [
                {
                    name: 'Sales',
                    type: 'bar',
                    barWidth: '60%',
                    itemStyle: { color: '#6366f1', borderRadius: [4, 4, 0, 0] },
                    data: values
                }
            ]
        };
    }, [orders]);

    return (
        <ChartWrapper title="Sales by Category" description="Total sales across product categories">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default CategorySalesChart;
