import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';
import { groupDataByCategory } from '../utils/chartUtils';

const PaymentMethodChart = ({ orders = [] }) => {
    const chartOption = useMemo(() => {
        const { labels, values } = groupDataByCategory(orders, 'paymentMethod', null);
        const data = labels.map((label, index) => ({ value: values[index], name: label }));

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
                    name: 'Payment Methods',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }, [orders]);

    return (
        <ChartWrapper title="Payment Methods" description="Distribution of payment methods">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default PaymentMethodChart;
