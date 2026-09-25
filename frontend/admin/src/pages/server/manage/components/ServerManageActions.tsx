import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import { renderServerEditor } from '../editors/ServerEditorRegistry';
import type { ServerRecord } from '../../../../types/serverContracts';

export interface ServerManageActions {
    onCopy: (server: ServerRecord) => void;
    onDrop: (server: ServerRecord) => void;
}

export function createServerActionMenu(
    server: ServerRecord,
    actions: ServerManageActions,
): React.ReactElement {
    return (
        <Menu>
            <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                {renderServerEditor(
                    server,
                    <a>
                        <Icon type="edit" /> 编辑
                    </a>,
                )}
            </Menu.Item>
            <Menu.Item onClick={() => actions.onCopy(server)}>
                <Icon type="copy" /> 复制
            </Menu.Item>
            <Menu.Item style={{ color: '#ff4d4f' }} onClick={() => actions.onDrop(server)}>
                <Icon type="delete" /> 删除
            </Menu.Item>
        </Menu>
    );
}

export function ServerActionDropdown({
    server,
    actions,
    trigger,
}: {
    server: ServerRecord;
    actions: ServerManageActions;
    trigger?: React.ReactElement;
}): React.ReactElement {
    return (
        <Dropdown trigger={['click']} overlay={createServerActionMenu(server, actions)}>
            {trigger || (
                <a href="javascript:void(0);">
                    操作 <Icon type="caret-down" />
                </a>
            )}
        </Dropdown>
    );
}

export function createServerContextMenu(
    server: ServerRecord | null,
    actions: ServerManageActions,
): React.ReactElement {
    return (
        <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
            <li className="ant-dropdown-menu-item">
                {server &&
                    renderServerEditor(
                        server,
                        <a>
                            <Icon type="form" /> 编辑
                        </a>,
                        `context-${server.id}`,
                    )}
            </li>
            <li className="ant-dropdown-menu-item" onClick={() => server && actions.onCopy(server)}>
                <a>
                    <Icon type="copy" /> 复制
                </a>
            </li>
            <li className="ant-dropdown-menu-item" onClick={() => server && actions.onDrop(server)}>
                <a style={{ color: '#ff4d4f' }}>
                    <Icon type="delete" /> 删除
                </a>
            </li>
        </ul>
    );
}
