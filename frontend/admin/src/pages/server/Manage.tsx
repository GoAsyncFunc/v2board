import React from 'react';
import { connect } from 'react-redux';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import List from 'antd/lib/list';
import Menu from 'antd/lib/menu';
import Switch from 'antd/lib/switch';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import message from 'antd/lib/message';
import type { ColumnProps } from 'antd/lib/table/interface';
import { Prompt } from 'react-router-dom';
import Sortable from '../../components/common/Sortable';
import LoadingContainer from '../../components/common/LoadingContainer';
import { getPreference, isMobile, setPreference } from '../../utils/siteHelpers';
import { copyText } from '../../utils/clipboard';
import MainLayout from '../../layouts/MainLayout';
import ContextMenuTable from '../../components/common/ContextMenuTable';
import ShadowsocksEditor from '../../components/server/ShadowsocksEditor';
import VmessEditor from '../../components/server/VmessEditor';
import TrojanEditor from '../../components/server/TrojanEditor';
import HysteriaEditor from '../../components/server/HysteriaEditor';
import TuicEditor from '../../components/server/TuicEditor';
import VlessEditor from '../../components/server/VlessEditor';
import AnyTlsEditor from '../../components/server/AnyTlsEditor';
import V2NodeEditor from '../../components/server/V2NodeEditor';
import { renderServerTypeTag } from '../../components/server/ServerTypeTag';
import { createServerNameColumn } from '../../components/server/ServerNameColumn';
import { createServerRateColumn } from '../../components/server/ServerRateColumn';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type {
    ManagedServerRecord,
    ServerGroupOption,
    ServerGroupState,
    ServerManageState,
    ServerRecord,
} from '../../types/server';

const STATUS_BADGE = { 0: 'error', 1: 'warning', 2: 'processing' } as const;
const SERVER_TYPES = [
    'V2node',
    'Shadowsocks',
    'Vmess',
    'Trojan',
    'Hysteria',
    'Tuic',
    'Vless',
    'AnyTLS',
];
const MODEL_BY_TYPE = {
    shadowsocks: 'serverShadowsocks',
    vmess: 'serverVmess',
    trojan: 'serverTrojan',
    hysteria: 'serverHysteria',
    tuic: 'serverTuic',
    vless: 'serverVless',
    anytls: 'serverAnyTLS',
    v2node: 'serverV2node',
};
type ServerProtocolAction = 'copy' | 'drop' | 'update';
interface ServerUpdatePayload<Key extends keyof ServerRecord = keyof ServerRecord> {
    key: Key;
    value: ServerRecord[Key];
}

interface ServerManagePageProps {
    dispatch: AdminDispatch;
    serverManage: ServerManageState;
    serverGroup: ServerGroupState;
}
interface ServerManagePageState {
    searchKey?: string;
    pageSize: number;
}
type EditorComponent = React.ComponentType<{ children: React.ReactElement; record?: ServerRecord }>;

function editorFor(
    server: ServerRecord | undefined,
    trigger: React.ReactElement,
    key: React.Key = server?.id || 'new',
): React.ReactElement | null {
    const props = server ? { record: server } : {};
    switch (server?.type) {
        case 'shadowsocks':
            return (
                <ShadowsocksEditor key={key} {...props}>
                    {trigger}
                </ShadowsocksEditor>
            );
        case 'vmess':
            return (
                <VmessEditor key={key} {...props}>
                    {trigger}
                </VmessEditor>
            );
        case 'trojan':
            return (
                <TrojanEditor key={key} {...props}>
                    {trigger}
                </TrojanEditor>
            );
        case 'hysteria':
            return (
                <HysteriaEditor key={key} {...props}>
                    {trigger}
                </HysteriaEditor>
            );
        case 'tuic':
            return (
                <TuicEditor key={key} {...props}>
                    {trigger}
                </TuicEditor>
            );
        case 'vless':
            return (
                <VlessEditor key={key} {...props}>
                    {trigger}
                </VlessEditor>
            );
        case 'anytls':
            return (
                <AnyTlsEditor key={key} {...props}>
                    {trigger}
                </AnyTlsEditor>
            );
        case 'v2node':
            return (
                <V2NodeEditor key={key} {...props}>
                    {trigger}
                </V2NodeEditor>
            );
        default:
            return null;
    }
}

function newServerMenu(renderTypeTag: typeof renderServerTypeTag): React.ReactElement {
    const entries: Array<[string, string, EditorComponent]> = [
        ['v2node', 'V2node', V2NodeEditor],
        ['shadowsocks', 'Shadowsocks', ShadowsocksEditor],
        ['vmess', 'VMess', VmessEditor],
        ['trojan', 'Trojan', TrojanEditor],
        ['hysteria', 'Hysteria', HysteriaEditor],
        ['tuic', 'Tuic', TuicEditor],
        ['vless', 'VLess', VlessEditor],
        ['anytls', 'AnyTLS', AnyTlsEditor],
    ];
    return (
        <Menu>
            {entries.map(([type, label, Editor]) => (
                <Menu.Item key={type}>
                    <Editor>
                        <a>{renderTypeTag(type, label)}</a>
                    </Editor>
                </Menu.Item>
            ))}
        </Menu>
    );
}

export class ServerManagePage extends React.Component<
    ServerManagePageProps,
    ServerManagePageState
> {
    contextServer: ServerRecord | null;

    constructor(props: ServerManagePageProps) {
        super(props);
        this.state = {
            searchKey: undefined,
            pageSize: Number(getPreference('server_manage_page_size')) || 10,
        };
        this.contextServer = null;
    }

    componentDidMount(): void {
        this.props.dispatch({ type: 'serverManage/getNodes' });
        this.props.dispatch({ type: 'serverGroup/fetch' });
        this.props.dispatch({ type: 'serverRoute/fetch' });
    }

    dispatchServerAction(
        server: ServerRecord,
        action: Exclude<ServerProtocolAction, 'update'>,
    ): void;
    dispatchServerAction<Key extends keyof ServerRecord>(
        server: ServerRecord,
        action: 'update',
        payload: ServerUpdatePayload<Key>,
    ): void;
    dispatchServerAction(
        server: ServerRecord,
        action: ServerProtocolAction,
        payload?: ServerUpdatePayload,
    ): void {
        if (!server.type) return;
        const model = MODEL_BY_TYPE[server.type as keyof typeof MODEL_BY_TYPE];
        if (model)
            this.props.dispatch({ type: `${model}/${action}`, id: server.id, ...(payload || {}) });
    }

    copy(server: ServerRecord): void {
        this.dispatchServerAction(server, 'copy');
    }
    drop(server: ServerRecord): void {
        this.dispatchServerAction(server, 'drop');
    }
    update<Key extends keyof ServerRecord>(
        server: ServerRecord,
        key: Key,
        value: ServerRecord[Key],
    ): void {
        this.dispatchServerAction(server, 'update', { key, value });
    }

    actionMenu(server: ServerRecord): React.ReactElement {
        return (
            <Menu>
                <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                    {editorFor(
                        server,
                        <a>
                            <Icon type="edit" /> 编辑
                        </a>,
                    )}
                </Menu.Item>
                <Menu.Item onClick={() => this.copy(server)}>
                    <Icon type="copy" /> 复制
                </Menu.Item>
                <Menu.Item style={{ color: '#ff4d4f' }} onClick={() => this.drop(server)}>
                    <Icon type="delete" /> 删除
                </Menu.Item>
            </Menu>
        );
    }

    actionDropdown(server: ServerRecord, trigger?: React.ReactElement): React.ReactElement {
        return (
            <Dropdown trigger={['click']} overlay={this.actionMenu(server)}>
                {trigger || (
                    <a href="javascript:void(0);">
                        操作 <Icon type="caret-down" />
                    </a>
                )}
            </Dropdown>
        );
    }

    filteredServers(): ManagedServerRecord[] {
        const { servers } = this.props.serverManage;
        const { searchKey } = this.state;
        return searchKey
            ? servers.filter((server) => JSON.stringify(server).includes(searchKey))
            : servers;
    }

    columns(groups: ServerGroupOption[]): ColumnProps<ManagedServerRecord>[] {
        return [
            {
                title: '节点ID',
                dataIndex: 'id',
                key: 'id',
                width: 150,
                filters: SERVER_TYPES.map((type) => ({ text: type, value: type })),
                onFilter: (type, server) => server.type === String(type).toLowerCase(),
                render: (id, server) => (
                    <span>
                        {renderServerTypeTag(
                            server.type,
                            server.parent_id ? `${id} => ${server.parent_id}` : id,
                        )}
                    </span>
                ),
            },
            {
                title: '显隐',
                dataIndex: 'show',
                key: 'show',
                render: (shown: ServerRecord['show'], server) => (
                    <Switch
                        size="small"
                        checked={Boolean(parseInt(String(shown), 10))}
                        onClick={() =>
                            this.update(server, 'show', parseInt(String(shown), 10) ? 0 : 1)
                        }
                    />
                ),
            },
            createServerNameColumn<ManagedServerRecord>(STATUS_BADGE),
            {
                title: '地址',
                dataIndex: 'host',
                key: 'host',
                render: (host, server) => (
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            copyText(server.host);
                            message.success('复制成功');
                        }}
                    >
                        {server.host}:{server.port}
                    </span>
                ),
            },
            {
                title: (
                    <span>
                        <Tooltip placement="top" title="根据服务端上报频率而定">
                            人数 <Icon type="question-circle" />
                        </Tooltip>
                    </span>
                ),
                dataIndex: 'online',
                key: 'online',
                align: 'left',
                width: 130,
                sorter: (left, right) => left.online - right.online,
                render: (online: ServerRecord['online']) => (
                    <>
                        <Icon type="user" /> {online || 0}
                    </>
                ),
            },
            createServerRateColumn(),
            {
                title: '权限组',
                dataIndex: 'group_id',
                key: 'group_id',
                filters: groups.map((group) => ({ text: group.name, value: String(group.id) })),
                onFilter: (groupId, server) =>
                    (server.group_id || []).map(String).includes(String(groupId)),
                render: (groupIds: ServerRecord['group_id'] = []) => (
                    <>
                        {groupIds.map((groupId) => {
                            const group = groups.find(
                                (item) => item.id === parseInt(String(groupId), 10),
                            );
                            return group ? <Tag key={groupId}>{group.name}</Tag> : null;
                        })}
                    </>
                ),
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                fixed: 'right',
                width: 100,
                render: (value, server) => <div>{this.actionDropdown(server)}</div>,
            },
        ];
    }

    sortColumns(): ColumnProps<ManagedServerRecord>[] {
        return [
            {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                align: 'left',
                width: 100,
                render: () => <Icon type="menu" style={{ cursor: 'move' }} title="拖动排序" />,
            },
            {
                title: '节点ID',
                dataIndex: 'id',
                key: 'id',
                width: 150,
                render: (id, server) => (
                    <span>
                        {renderServerTypeTag(
                            server.type,
                            server.parent_id ? `${id} => ${server.parent_id}` : id,
                        )}
                    </span>
                ),
            },
            { title: '节点', dataIndex: 'name', key: 'name' },
        ];
    }

    renderMobileList(servers: ManagedServerRecord[]): React.ReactElement {
        return (
            <List
                className="v2board-table"
                itemLayout="vertical"
                dataSource={servers}
                renderItem={(server) => (
                    <List.Item
                        className={`v2board_node_mobile ${server.parent_id ? 'child_node' : ''}`}
                        actions={[
                            <React.Fragment key="summary">
                                {renderServerTypeTag(
                                    server.type,
                                    server.parent_id
                                        ? `${server.id} => ${server.parent_id}`
                                        : server.id,
                                )}{' '}
                                <Tag>
                                    <Icon type="user" /> {server.online || 0}
                                </Tag>{' '}
                                <Tag>{server.rate} x</Tag>
                            </React.Fragment>,
                        ]}
                        extra={
                            <>
                                <Switch
                                    size="small"
                                    checked={Boolean(parseInt(String(server.show), 10))}
                                    onClick={() =>
                                        this.update(
                                            server,
                                            'show',
                                            parseInt(String(server.show), 10) ? 0 : 1,
                                        )
                                    }
                                />
                                <Divider type="vertical" />
                                <span>{this.actionDropdown(server)}</span>
                            </>
                        }
                    >
                        <List.Item.Meta
                            title={
                                <>
                                    <Badge
                                        status={
                                            STATUS_BADGE[
                                                server.available_status as keyof typeof STATUS_BADGE
                                            ]
                                        }
                                    />
                                    {server.name}
                                </>
                            }
                            description={`${server.host}:${server.port}`}
                        />
                    </List.Item>
                )}
            />
        );
    }

    renderContextMenu(): React.ReactElement {
        const server = this.contextServer;
        return (
            <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
                <li className="ant-dropdown-menu-item">
                    {server &&
                        editorFor(
                            server,
                            <a>
                                <Icon type="form" /> 编辑
                            </a>,
                            `context-${server.id}`,
                        )}
                </li>
                <li className="ant-dropdown-menu-item" onClick={() => server && this.copy(server)}>
                    <a>
                        <Icon type="copy" /> 复制
                    </a>
                </li>
                <li className="ant-dropdown-menu-item" onClick={() => server && this.drop(server)}>
                    <a style={{ color: '#ff4d4f' }}>
                        <Icon type="delete" /> 删除
                    </a>
                </li>
            </ul>
        );
    }

    renderDesktopTable(
        servers: ManagedServerRecord[],
        groups: ServerGroupOption[],
        sortMode: boolean,
    ): React.ReactElement {
        return (
            <Sortable
                onDragEnd={(fromIndex, toIndex) =>
                    this.props.dispatch({ type: 'serverManage/sort', fromIndex, toIndex })
                }
                nodeSelector="tr"
                handleSelector="i"
            >
                <ContextMenuTable
                    onContextMenu={(server) => {
                        this.contextServer = server || null;
                        this.forceUpdate();
                    }}
                    disableRightClick={sortMode}
                    tableLayout="auto"
                    dataSource={servers}
                    columns={sortMode ? this.sortColumns() : this.columns(groups)}
                    pagination={
                        !sortMode && {
                            pageSize: this.state.pageSize,
                            pageSizeOptions: ['10', '50', '100', '500'],
                            showSizeChanger: true,
                            onShowSizeChange: (_current: number, pageSize: number) =>
                                this.setState({ pageSize }, () =>
                                    setPreference('server_manage_page_size', pageSize),
                                ),
                        }
                    }
                    scroll={{ x: 1300 }}
                    rowClassName={(server) => (server.parent_id ? 'child_node' : '')}
                >
                    {this.renderContextMenu()}
                </ContextMenuTable>
            </Sortable>
        );
    }

    render(): React.ReactNode {
        const { servers, fetchLoading, sortMode } = this.props.serverManage;
        const groups = this.props.serverGroup.groups;
        const filteredServers = this.filteredServers();
        return (
            <MainLayout {...this.props} title="节点管理">
                <Prompt
                    when={sortMode}
                    message={() => window.confirm('节点排序还没有保存，是否离开')}
                />
                <LoadingContainer loading={fetchLoading}>
                    <div className="block block-bottom">
                        <div className="bg-white">
                            <div className="v2board-table-action" style={{ padding: 15 }}>
                                <Dropdown overlay={newServerMenu(renderServerTypeTag)}>
                                    <Button>
                                        <Icon type="plus" />
                                    </Button>
                                </Dropdown>
                                <Input
                                    placeholder="输入任意关键字搜索"
                                    style={{ width: 200 }}
                                    className="ml-2"
                                    onChange={(event) =>
                                        this.setState({ searchKey: event.target.value })
                                    }
                                />
                                {!isMobile() && (
                                    <Button
                                        style={{ float: 'right' }}
                                        type="primary"
                                        onClick={() =>
                                            sortMode
                                                ? this.props.dispatch({
                                                      type: 'serverManage/saveSort',
                                                  })
                                                : this.props.dispatch({
                                                      type: 'serverManage/setState',
                                                      payload: { sortMode: true },
                                                  })
                                        }
                                    >
                                        {sortMode ? '保存排序' : '编辑排序'}
                                    </Button>
                                )}
                            </div>
                            {isMobile()
                                ? this.renderMobileList(filteredServers)
                                : this.renderDesktopTable(filteredServers, groups, sortMode)}
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({
    serverManage: state.serverManage,
    serverGroup: state.serverGroup,
}))(ServerManagePage);
