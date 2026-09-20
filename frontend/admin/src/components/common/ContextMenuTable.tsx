import React from 'react';
import Table from 'antd/lib/table';
import type { TableEventListeners, TableProps } from 'antd/lib/table/interface';

export interface ContextMenuTableProps<RecordType> extends TableProps<RecordType> {
    children?: React.ReactNode;
    disableRightClick?: boolean;
    onContextMenu?: (record: RecordType | undefined) => void;
}

export class ContextMenuTable<RecordType extends object = object> extends React.Component<
    ContextMenuTableProps<RecordType>
> {
    getMenuElement() {
        return document.getElementById('v2board-table-dropdown');
    }

    hideMenu() {
        const menu = this.getMenuElement();
        if (menu) menu.style.display = 'none';
    }

    showMenu(event: React.MouseEvent<Element>, record: RecordType): void {
        if (!this.props.onContextMenu) return;
        event.preventDefault();
        this.props.onContextMenu(record);
        const menu = this.getMenuElement();
        if (!menu) return;
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        menu.style.display = 'unset';
    }

    rowEvents(record: RecordType): TableEventListeners | undefined {
        if (this.props.disableRightClick) return undefined;
        return {
            onClick: () => {
                if (this.props.onContextMenu) this.props.onContextMenu(undefined);
                this.hideMenu();
            },
            onContextMenu: (event: React.MouseEvent<Element>) => this.showMenu(event, record),
        };
    }

    render() {
        const { children, disableRightClick, onContextMenu, ...tableProps } = this.props;
        return (
            <>
                <Table<RecordType>
                    {...tableProps}
                    onRow={(record) => this.rowEvents(record) as TableEventListeners}
                />
                <div
                    id="v2board-table-dropdown"
                    className="ant-dropdown ant-dropdown-placement-bottomLeft"
                    style={{ display: 'none', position: 'fixed', top: 0, left: 0 }}
                    onClick={() => this.hideMenu()}
                >
                    {children}
                </div>
            </>
        );
    }
}

export default ContextMenuTable;
