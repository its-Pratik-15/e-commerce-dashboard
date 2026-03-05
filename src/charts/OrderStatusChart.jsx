import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';

const OrderStatusChart = ({ orders = [] }) => {
    const chartOption = useMemo(() => {
        // Count orders by status (only Completed, Refunded, Cancelled)
        const statusCounts = {
            'Completed': 0,
            'Refunded': 0,
            'Cancelled': 0
        };

        orders.forEach(order => {
            const status = order.orderStatus;
            if (statusCounts.hasOwnProperty(status)) {
                statusCounts[status]++;
            }
        });

        const data = Object.entries(statusCounts).map(([name, value]) => ({
            name,
            value
        }));

        const colors = {
            'Completed': '#10b981',
            'Refunded': '#f59e0b',
            'Cancelled': '#ef4444'
        };

        return {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    const total = data.reduce((sum, item) => sum + item.value, 0);
                    const percentage = ((params.value / total) * 100).toFixed(1);
                    return `${params.name}<br/>Orders: <b>${params.value.toLocaleString()}</b> (${percentage}%)`;
                }
            },
            legend: {
                orient: 'vertical',
                right: '10%',
                top: 'center',
                textStyle: {
                    color: '#6b7280',
                    fontSize: 12
                }
            },
            series: [
                {
                    name: 'Order Status',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 8,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data.map(item => ({
                        ...item,
                        itemStyle: {
                            color: colors[item.name]
                        }
                    }))
                }
            ]
        };
    }, [orders]);

    return (
        <ChartWrapper title="Order Status Distribution" description="Breakdown of completed, refunded, and cancelled orders">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default OrderStatusChart;
