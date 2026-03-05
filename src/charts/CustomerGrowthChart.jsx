import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';
import dayjs from 'dayjs';

const CustomerGrowthChart = ({ customers }) => {
    const chartData = useMemo(() => {
        if (!customers || customers.length === 0) {
            return { dates: [], counts: [] };
        }

        // Group customers by month
        const monthlyData = {};
        customers.forEach(customer => {
            const month = dayjs(customer.signupDate).format('YYYY-MM');
            monthlyData[month] = (monthlyData[month] || 0) + 1;
        });

        // Sort by date and calculate cumulative
        const sortedMonths = Object.keys(monthlyData).sort();
        let cumulative = 0;
        const dates = [];
        const counts = [];

        sortedMonths.forEach(month => {
            cumulative += monthlyData[month];
            dates.push(dayjs(month).format('MMM YYYY'));
            counts.push(cumulative);
        });

        return { dates, counts };
    }, [customers]);

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return `${params[0].name}<br/>Total Customers: ${params[0].value}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: chartData.dates,
            axisLabel: {
                rotate: 45,
                fontSize: 11
            }
        },
        yAxis: {
            type: 'value',
            name: 'Customers'
        },
        series: [
            {
                name: 'Customer Growth',
                type: 'line',
                data: chartData.counts,
                smooth: true,
                itemStyle: {
                    color: '#8b5cf6'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(139, 92, 246, 0.4)' },
                            { offset: 1, color: 'rgba(139, 92, 246, 0.05)' }
                        ]
                    }
                }
            }
        ]
    };
    return (
        <ChartWrapper title="Customer Growth Trend" description="Cumulative customer acquisition over time">
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default CustomerGrowthChart;
