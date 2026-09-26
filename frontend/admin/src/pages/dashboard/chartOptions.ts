import type { EChartsCoreOption } from 'echarts/core';
import type { OrderChartRecord } from '@/types/monitoringContracts';

export interface OrderChartSeries {
    name: string;
    type: string;
    smooth: boolean;
    data: number[];
}

export interface OrderChartOption extends EChartsCoreOption {
    tooltip: { trigger: string };
    legend: { data: string[]; left: string; z: number };
    grid: { left: string; right: string; bottom: string; containLabel: boolean };
    xAxis: { type: string; boundaryGap: boolean; data: string[] };
    yAxis: { type: string };
    series: OrderChartSeries[];
}

export function createOrderChartOption(data: OrderChartRecord[]): OrderChartOption {
    const option: OrderChartOption = {
        tooltip: { trigger: 'axis' },
        legend: { data: [], left: '0', z: 4 },
        grid: { left: '1%', right: '1%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', boundaryGap: false, data: [] },
        yAxis: { type: 'value' },
        series: [],
    };
    data.forEach((item) => {
        if (!option.legend.data.includes(item.type)) option.legend.data.push(item.type);
        if (!option.xAxis.data.includes(item.date)) option.xAxis.data.push(item.date);
        const series = option.series.find((candidate) => candidate.name === item.type);
        if (series) series.data.push(item.value);
        else {
            option.series.push({
                name: item.type,
                type: 'line',
                smooth: true,
                data: [item.value],
            });
        }
    });
    return option;
}
