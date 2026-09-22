import type { ColumnProps } from 'antd/lib/table/interface';

// Display only: this column does not execute routing actions.
export type RouteActionText = Readonly<Record<PropertyKey, string>>;

export interface RouteActionRecord {
    action?: PropertyKey;
}

export function createRouteActionColumn<RecordType extends RouteActionRecord = RouteActionRecord>(
    actionText: RouteActionText | null,
): ColumnProps<RecordType> {
    return {
        title: '动作',
        dataIndex: 'action',
        key: 'action',
        render: (value: PropertyKey) => (actionText as RouteActionText)[value],
    };
}
