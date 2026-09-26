import React from 'react';
import type { EChartsCoreOption } from 'echarts/core';
import type { RankChartRecord } from '@/types/monitoringContracts';

interface RankChartOption extends EChartsCoreOption {
    tooltip: { trigger: string; formatter: (values: Array<{ value: string | number }>) => string };
    grid: { top: string; left: string; right: string; bottom: string; containLabel: boolean };
    xAxis: { type: string };
    yAxis: { type: string; data: string[] };
    series: Array<{ data: number[]; type: string }>;
}

export function createRankChartOption(
    data: RankChartRecord[],
    getLabel: (item: RankChartRecord) => string | undefined,
) {
    const option: RankChartOption = {
        tooltip: { trigger: 'axis', formatter: (values) => `${values[0].value} GB` },
        grid: { top: '1%', left: '1%', right: '1%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: [] },
        series: [{ data: [], type: 'bar' }],
    };
    [...data].reverse().forEach((item) => {
        option.yAxis.data.push(getLabel(item) || '');
        option.series[0].data.push(item.total);
    });
    return option;
}

export function RankChart({
    title,
    chartRef,
    extraClass = '',
}: {
    title: string;
    chartRef: React.RefObject<HTMLDivElement>;
    extraClass?: string;
}) {
    return (
        <div className={`col-lg-6 js-appear-enabled animated ${extraClass}`} data-toggle="appear">
            <div className="block border-bottom">
                <div className="block-header block-header-default">
                    <h3 className="block-title">{title}</h3>
                </div>
                <div className="block-content">
                    <div
                        className="px-sm-3 pt-sm-3 py-3 clearfix"
                        style={{ height: 400 }}
                        ref={chartRef}
                    />
                </div>
            </div>
        </div>
    );
}
