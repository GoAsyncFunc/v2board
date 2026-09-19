import React from 'react';
import { Table } from '../vendor/ui.js';

import '../vendor/componentStyles.js';
export class ContextMenuTable extends React.Component {
  getMenuElement() {
    return document.getElementById('v2board-table-dropdown');
  }

  hideMenu() {
    const menu = this.getMenuElement();
    if (menu) menu.style.display = 'none';
  }

  showMenu(event, record) {
    if (!this.props.onContextMenu) return;
    event.preventDefault();
    this.props.onContextMenu(record);
    const menu = this.getMenuElement();
    if (!menu) return;
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.style.display = 'unset';
  }

  rowEvents(record) {
    if (this.props.disableRightClick) return undefined;
    return {
      onClick: () => {
        if (this.props.onContextMenu) this.props.onContextMenu(undefined);
        this.hideMenu();
      },
      onContextMenu: event => this.showMenu(event, record),
    };
  }

  render() {
    const { children, disableRightClick, onContextMenu, ...tableProps } = this.props;
    return <>
      <Table {...tableProps} onRow={record => this.rowEvents(record)} />
      <div
        id="v2board-table-dropdown"
        className="ant-dropdown ant-dropdown-placement-bottomLeft"
        style={{ display: 'none', position: 'fixed', top: 0, left: 0 }}
        onClick={() => this.hideMenu()}
      >
        {children}
      </div>
    </>;
  }
}

export default ContextMenuTable;
