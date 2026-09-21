import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import CompatibleDrawer from './CompatibleDrawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Tooltip from 'antd/lib/tooltip';
import PermissionGroupEditor from '../../../../components/common/PermissionGroupEditor';
import { TrojanNetworkSettings } from './Trojan/NetworkSettings';
import type { ServerEditorProps, ServerRecord, ServerSaveState } from '../../../../types/server';
import type { AdminRootState } from '../../../../types/store';

function prepareServer(record?: ServerRecord): ServerRecord {
    const server = record ? { ...record } : { tls: 0, rate: 1 };
    if (server.network_settings && typeof server.network_settings === 'object') {
        server.network_settings = JSON.stringify(server.network_settings, null, 2);
    }
    return server;
}

interface TrojanEditorProps extends ServerEditorProps {
    serverTrojan: ServerSaveState;
}
interface TrojanEditorState {
    server: ServerRecord;
    visible: boolean;
    networkSettingsVisible: boolean;
}

export class TrojanEditor extends React.Component<TrojanEditorProps, TrojanEditorState> {
    constructor(props: TrojanEditorProps) {
        super(props);
        this.state = {
            server: prepareServer(props.record),
            visible: false,
            networkSettingsVisible: false,
        };
    }

    toggle(): void {
        this.setState({ visible: !this.state.visible });
    }

    updateServer<Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]): void {
        this.setState({ server: { ...this.state.server, [field]: value } });
    }

    save(): void {
        const { server } = this.state;
        const params = {
            ...server,
            network_settings: server.network_settings
                ? typeof server.network_settings === 'string'
                    ? JSON.parse(server.network_settings)
                    : server.network_settings
                : null,
        };
        this.props.dispatch({ type: 'serverTrojan/save', params, callback: () => this.toggle() });
    }

    render(): React.ReactNode {
        const { server, visible, networkSettingsVisible } = this.state;
        const { groups } = this.props.serverGroup;
        const { servers } = this.props.serverManage;
        const { routes } = this.props.serverRoute;
        const saveLoading = this.props.serverTrojan.saveLoading;

        return (
            <>
                {React.cloneElement(this.props.children, {
                    onClick: () => this.setState({ visible: true }),
                })}
                <CompatibleDrawer
                    id="server"
                    maskClosable
                    title={server.id ? '编辑节点' : '新建节点'}
                    width="80%"
                    visible={visible}
                    onClose={() => this.toggle()}
                >
                    <div>
                        <div className="row">
                            <div className="form-group col-8">
                                <label>节点名称</label>
                                <Input
                                    placeholder="请输入节点名称"
                                    value={server.name}
                                    onChange={(event) =>
                                        this.updateServer('name', event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group col-4">
                                <label>倍率</label>
                                <Input
                                    addonAfter="x"
                                    placeholder="请输入节点倍率"
                                    value={server.rate ?? undefined}
                                    onChange={(event) =>
                                        this.updateServer('rate', event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>节点标签</label>
                            <Select
                                mode="tags"
                                value={server.tags || []}
                                style={{ width: '100%' }}
                                placeholder="输入后回车添加标签"
                                onChange={(tags) =>
                                    this.updateServer('tags', tags.length ? tags : null)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                权限组{' '}
                                <PermissionGroupEditor>
                                    <a href="javascript:void(0);">添加权限组</a>
                                </PermissionGroupEditor>
                            </label>
                            <Select
                                mode="multiple"
                                value={server.group_id}
                                placeholder="请选择权限组"
                                style={{ width: '100%' }}
                                onChange={(groupIds) => this.updateServer('group_id', groupIds)}
                            >
                                {groups.map((group) => (
                                    <Select.Option key={group.id} value={group.id}>
                                        {group.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>节点地址</label>
                            <Input
                                placeholder="地址或IP"
                                value={server.host}
                                onChange={(event) => this.updateServer('host', event.target.value)}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4 col-xs-12">
                                <label>连接端口</label>
                                <Input
                                    placeholder="用户连接端口"
                                    value={server.port ?? undefined}
                                    onChange={(event) =>
                                        this.updateServer('port', event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group col-md-4 col-xs-12">
                                <label>服务端口</label>
                                <Input
                                    placeholder="服务端开放端口"
                                    value={server.server_port ?? undefined}
                                    onChange={(event) =>
                                        this.updateServer('server_port', event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group col-md-4 col-xs-12">
                                <label>
                                    <Tooltip
                                        placement="top"
                                        title="使用自签名证书需要允许不安全，用户才可以连接"
                                    >
                                        允许不安全 <Icon type="question-circle" />
                                    </Tooltip>
                                </label>
                                <Select
                                    value={parseInt(String(server.allow_insecure), 10) ? 1 : 0}
                                    placeholder="允许不安全"
                                    style={{ width: '100%' }}
                                    onChange={(allow) => this.updateServer('allow_insecure', allow)}
                                >
                                    <Select.Option value={0}>否</Select.Option>
                                    <Select.Option value={1}>是</Select.Option>
                                </Select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>服务器名称指示(sni)</label>
                            <Input
                                placeholder="当节点地址与证书不一致时用于证书验证"
                                value={server.server_name}
                                onChange={(event) =>
                                    this.updateServer('server_name', event.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                传输协议{' '}
                                <a
                                    href="javascript:void(0);"
                                    onClick={() => this.setState({ networkSettingsVisible: true })}
                                >
                                    编辑配置
                                </a>
                            </label>
                            <Select
                                value={server.network}
                                placeholder="选择传输协议"
                                style={{ width: '100%' }}
                                onChange={(network) => this.updateServer('network', network)}
                            >
                                <Select.Option value="tcp">TCP</Select.Option>
                                <Select.Option value="ws">WebSocket</Select.Option>
                                <Select.Option value="grpc">gRPC</Select.Option>
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>
                                <Tooltip placement="top" title="父节点说明">
                                    父节点{' '}
                                    <a
                                        target="_blank"
                                        href="https://docs.v2board.com/use/node.html#父节点与子节点关系"
                                        rel="noreferrer"
                                    >
                                        更多解答
                                    </a>
                                </Tooltip>
                            </label>
                            <Select
                                value={server.parent_id || ''}
                                onChange={(parentId) => this.updateServer('parent_id', parentId)}
                                style={{ width: '100%' }}
                            >
                                <Select.Option value="">无</Select.Option>
                                {servers
                                    .filter(
                                        (option) =>
                                            option.type === 'trojan' && option.id !== server.id,
                                    )
                                    .map((option) => (
                                        <Select.Option key={option.id} value={option.id}>
                                            {option.name}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>路由组</label>
                            <Select
                                mode="multiple"
                                value={server.route_id || []}
                                placeholder="请选择路由组"
                                style={{ width: '100%' }}
                                onChange={(routeIds) =>
                                    this.updateServer('route_id', routeIds.length ? routeIds : null)
                                }
                            >
                                {routes.map((route) => (
                                    <Select.Option key={route.id} value={route.id}>
                                        {route.remarks}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="v2board-drawer-action">
                        <Button style={{ marginRight: 8 }} onClick={() => this.toggle()}>
                            取消
                        </Button>
                        <Button loading={saveLoading} onClick={() => this.save()} type="primary">
                            提交
                        </Button>
                    </div>
                    <CompatibleDrawer
                        closable={false}
                        id="server-network-settings"
                        width="80%"
                        title="编辑协议配置"
                        visible={networkSettingsVisible}
                        onClose={() => this.setState({ networkSettingsVisible: false })}
                    >
                        <TrojanNetworkSettings
                            network={server.network}
                            value={server.network_settings}
                            onChange={(value) => this.updateServer('network_settings', value)}
                        />
                    </CompatibleDrawer>
                </CompatibleDrawer>
            </>
        );
    }
}

const ConnectedTrojanEditor = connect((state: AdminRootState) => ({
    serverTrojan: state.serverTrojan,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(TrojanEditor);

export default ConnectedTrojanEditor;
