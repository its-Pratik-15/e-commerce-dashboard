import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartWrapper from './components/ChartWrapper';
import { groupDataByCategory } from '../utils/chartUtils';

const RegionCustomerChart = ({ customers = [] }) => {
    const chartOption = useMemo(() => {
        const { labels, values } = groupDataByCategory(customers, 'region', null);
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
                    name: 'Customers',
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
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
    }, [customers]);

    return (
        <ChartWrapper title="Customers by Region" description="Distribution by geographic region">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </ChartWrapper>
    );
};

export default RegionCustomerChart;
