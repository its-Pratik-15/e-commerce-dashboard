import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';
import { groupDataByCategory } from '../utils/chartUtils';

const OrderStatusChart = ({ orders = [] }) => {
    const chartOption = useMemo(() => {
        const { labels, values } = groupDataByCategory(orders, 'orderStatus', null); // Use 'orderStatus', NOT 'status'.
        let data = labels.map((label, index) => ({ value: values[index], name: label }));

        // Add Total Orders stage
        data.push({ value: orders.length, name: 'Total Orders' });

        // Sort data for Funnel (Highest first usually, or specific order)
        data.sort((a, b) => b.value - a.value);

        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            legend: {
                data: labels,
                bottom: '0%',
                left: 'center'
            },
            series: [
                {
                    name: 'Order Status',
                    type: 'funnel',
                    left: '10%',
                    top: 60,
                    bottom: 60,
                    width: '80%',
                    min: 0,
                    max: data[0].value,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'left'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: data
                }
            ]
        };
    }, [orders]);

    return (
        <ChartWrapper title="Order Status" description="Order progression">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default OrderStatusChart;
