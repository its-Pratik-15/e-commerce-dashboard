import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';

const SalesByRegionChart = ({ orders = [] }) => {
    const chartOption = useMemo(() => {
        // Group sales by region
        const regionSales = {};
        orders.forEach(order => {
            const region = order.region || 'Unknown';
            regionSales[region] = (regionSales[region] || 0) + order.amount;
        });

        const labels = Object.keys(regionSales);
        const values = Object.values(regionSales);
        const data = labels.map((label, index) => ({
            value: values[index],
            name: label
        }));

        return {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    const value = new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                    }).format(params.value);
                    return `${params.name}<br/>Sales: <b>${value}</b> (${params.percent}%)`;
                }
            },
            legend: {
                bottom: '0%',
                left: 'center'
            },
            series: [
                {
                    name: 'Sales',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: 'bold',
                            formatter: function (params) {
                                const value = params.value >= 100000
                                    ? `₹${(params.value / 100000).toFixed(1)}L`
                                    : `₹${(params.value / 1000).toFixed(0)}k`;
                                return `${params.name}\n${value}`;
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
    }, [orders]);

    return (
        <ChartWrapper title="Sales by Region" description="Geographic sales distribution">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default SalesByRegionChart;
