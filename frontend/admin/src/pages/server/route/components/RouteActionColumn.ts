import type { ColumnProps } from 'antd/lib/table/interface';
import type { PropertyLabelMap } from '../../../../types/propertyLookups';

// Display only: this column does not execute routing actions.
export type RouteActionText = PropertyLabelMap;

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
