import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';

const CustomerTypeDistributionChart = ({ customers = [] }) => {
    const chartOption = useMemo(() => {
        // Count customers by type
        const typeCount = {};
        customers.forEach(customer => {
            const type = customer.customerType || 'Unknown';
            typeCount[type] = (typeCount[type] || 0) + 1;
        });

        const labels = Object.keys(typeCount);
        const values = Object.values(typeCount);
        const data = labels.map((label, index) => ({
            value: values[index],
            name: label
        }));

        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            legend: {
                bottom: '0%',
                left: 'center'
            },
            series: [
                {
                    name: 'Customer Type',
                    type: 'pie',
                    radius: '60%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        formatter: '{b}\n{d}%'
                    }
                }
            ]
        };
    }, [customers]);

    return (
        <ChartWrapper title="Customer Type Distribution" description="Breakdown of customers by loyalty tier">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default CustomerTypeDistributionChart;
