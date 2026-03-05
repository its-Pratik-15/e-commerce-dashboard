import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';
import { groupDataByDate } from '../utils/chartUtils';
import dayjs from 'dayjs';

const RevenueTrendChart = ({ orders = [] }) => {
    const chartOption = useMemo(() => {
        // Group data by day
        const { labels, values } = groupDataByDate(orders, 'orderDate', 'amount', 'day');

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
                formatter: function (params) {
                    const date = dayjs(params[0].axisValue).format('YYYY-MM-DD');
                    const value = currencyFormatter(params[0].value);
                    return `${date}<br/>Revenue: <b>${value}</b>`;
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
                boundaryGap: false,
                data: labels.map(l => dayjs(l).format('MMM DD YYYY')),
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
                    name: 'Revenue',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(79, 70, 229, 0.2)' },
                                { offset: 1, color: 'rgba(79, 70, 229, 0)' }
                            ]
                        }
                    },
                    lineStyle: { width: 3, color: '#4f46e5' },
                    data: values
                }
            ]
        };
    }, [orders]);

    return (
        <ChartWrapper title="Revenue Trend" description="Daily revenue over the selected period">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default RevenueTrendChart;
