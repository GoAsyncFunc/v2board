import type { ColumnProps } from 'antd/lib/table/interface';

// Preserve the original length access before type checking (null/undefined throw).
export type RouteMatch = string | string[] | { length: number | string };

export function formatRouteMatchCount(match: RouteMatch): string {
    if (match.length == 0) return '无规则时默认';
    const count =
        typeof match === 'string'
            ? match.split(',').filter((value) => !!value).length
            : match.length;
    return `匹配 ${count} 条规则`;
}
export function createReadonlyServerRouteColumns<RecordType extends object = object>(): Record<
    string,
    ColumnProps<RecordType>
> {
    return {
        id: { title: 'ID', dataIndex: 'id', key: 'id' },
        remarks: { title: '备注', dataIndex: 'remarks', key: 'remarks' },
        match: {
            title: '匹配数量',
            dataIndex: 'match',
            key: 'match',
            render: formatRouteMatchCount,
        },
    };
}
