import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';

const TopCustomersChart = ({ orders = [], customers = [] }) => {
    const chartOption = useMemo(() => {
        // Create customer map
        const customerMap = {};
        customers.forEach(customer => {
            customerMap[customer.customerId] = customer.name;
        });

        // Calculate revenue per customer
        const customerRevenue = {};
        orders.forEach(order => {
            const customerId = order.customerId;
            const customerName = customerMap[customerId] || 'Unknown';
            customerRevenue[customerId] = {
                name: customerName,
                revenue: (customerRevenue[customerId]?.revenue || 0) + order.amount
            };
        });

        // Get top 10 customers
        const topCustomers = Object.values(customerRevenue)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        const labels = topCustomers.map(c => c.name);
        const values = topCustomers.map(c => c.revenue);

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
                    return `${name}<br/>Total Spent: <b>${value}</b>`;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { lineStyle: { color: '#f3f4f6' } },
                axisLabel: {
                    color: '#6b7280',
                    formatter: currencyFormatter
                }
            },
            yAxis: {
                type: 'category',
                data: labels,
                axisTick: { show: false },
                axisLine: { lineStyle: { color: '#e5e7eb' } },
                axisLabel: {
                    color: '#6b7280',
                    fontSize: 11
                }
            },
            series: [
                {
                    name: 'Revenue',
                    type: 'bar',
                    barWidth: '60%',
                    itemStyle: {
                        color: '#3b82f6',
                        borderRadius: [0, 4, 4, 0]
                    },
                    data: values
                }
            ]
        };
    }, [orders, customers]);

    return (
        <ChartWrapper title="Top 10 Customers" description="Highest spending customers by total revenue">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default TopCustomersChart;
