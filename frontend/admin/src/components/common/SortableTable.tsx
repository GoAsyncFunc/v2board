import React from 'react';
import Icon from 'antd/lib/icon';
import type { TableProps } from 'antd/lib/table/interface';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    type SortEnd,
} from 'react-sortable-hoc';

interface SortableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface SortableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key'?: React.Key;
}

const SortableBody = SortableContainer<SortableBodyProps>((props: SortableBodyProps) => (
    <tbody {...props} />
));
const SortableRow = SortableElement<SortableRowProps>((props: SortableRowProps) => (
    <tr {...props} />
));

interface TableDragHandleProps {
    title?: string;
}

export const TableDragHandle = SortableHandle<TableDragHandleProps>(
    ({ title }: TableDragHandleProps) => (
        <Icon type="menu" style={{ cursor: 'move' }} title={title} />
    ),
);

export interface SortableTableProps<RecordType> {
    children: React.ReactElement<TableProps<RecordType>>;
    records: readonly RecordType[];
    getRowKey: (record: RecordType) => string;
    onSortEnd: (fromIndex: number, toIndex: number) => void;
}

export function SortableTable<RecordType>({
    children,
    records,
    getRowKey,
    onSortEnd,
}: SortableTableProps<RecordType>): React.ReactElement {
    const handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        if (oldIndex !== newIndex) onSortEnd(oldIndex, newIndex);
    };
    const draggableBody = (bodyProps: SortableBodyProps) => (
        <SortableBody
            {...bodyProps}
            useDragHandle
            helperClass="sortable-table-row-dragging"
            onSortEnd={handleSortEnd}
        />
    );
    const draggableRow = (rowProps: SortableRowProps) => {
        const rowKey = rowProps['data-row-key'];
        const index = records.findIndex((record) => String(getRowKey(record)) === String(rowKey));
        return <SortableRow {...rowProps} index={Math.max(index, 0)} />;
    };
    const existingComponents = children.props.components || {};
    const existingBody = existingComponents.body || {};

    return React.cloneElement(children, {
        rowKey: children.props.rowKey || getRowKey,
        components: {
            ...existingComponents,
            body: {
                ...existingBody,
                wrapper: draggableBody,
                row: draggableRow,
            },
        },
    });
}

export default SortableTable;
