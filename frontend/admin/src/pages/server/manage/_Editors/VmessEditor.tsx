import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import notification from 'antd/lib/notification';
import CompatibleDrawer from './CompatibleDrawer';
import Input from 'antd/lib/input';
import JsonEditor from '../../../../components/common/JsonEditor';
import { DnsSettings, RuleSettings, TlsSettings } from './Vmess/SettingsEditors';
import VmessGeneralFields from './Vmess/GeneralFields';
import VmessRelationshipFields from './Vmess/RelationshipFields';
import type {
    ChildDrawerState,
    ServerEditorProps,
    ServerRecord,
    ServerSaveState,
} from '../../../../types/server';
import type { AdminRootState } from '../../../../types/store';

const NETWORK_PRESETS: Record<string, string> = {
    tcp: JSON.stringify(
        {
            header: {
                type: 'http',
                request: { path: ['/'], headers: { Host: ['www.baidu.com', 'www.bing.com'] } },
                response: {},
            },
        },
        null,
        4,
    ),
    ws: JSON.stringify({ path: '/', headers: { Host: 'v2ray.com' } }, null, 4),
    grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
    kcp: JSON.stringify({ header: { type: 'none' }, seed: '' }, null, 4),
    httpupgrade: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
    xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
};

function prepareServer(record?: ServerRecord): ServerRecord {
    const server = record ? { ...record } : { tls: 0, rate: 1 };
    if (server.networkSettings && typeof server.networkSettings === 'object') {
        server.networkSettings = JSON.stringify(server.networkSettings, null, 2);
    }
    return server;
}

export { DnsSettings, RuleSettings, TlsSettings };

interface VmessEditorProps extends ServerEditorProps {
    serverVmess: ServerSaveState;
}
interface VmessEditorState {
    server: ServerRecord;
    visible: boolean;
    childDrawer: ChildDrawerState;
}

export class VmessEditor extends React.Component<VmessEditorProps, VmessEditorState> {
    constructor(props: VmessEditorProps) {
        super(props);
        this.state = {
            server: prepareServer(props.record),
            visible: false,
            childDrawer: { visible: false, title: '', type: undefined },
        };
    }

    toggle(): void {
        this.setState({ visible: !this.state.visible });
    }
    updateServer<Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]): void {
        this.setState({ server: { ...this.state.server, [field]: value } });
    }
    showChildDrawer(title: string, type: string): void {
        this.setState({ childDrawer: { visible: true, title, type } });
    }
    hideChildDrawer(): void {
        this.setState({ childDrawer: { ...this.state.childDrawer, visible: false } });
    }

    save(): void {
        try {
            const { server } = this.state;
            const params = {
                ...server,
                networkSettings: server.networkSettings
                    ? typeof server.networkSettings === 'string'
                        ? JSON.parse(server.networkSettings)
                        : server.networkSettings
                    : null,
                dnsSettings: server.dnsSettings?.servers?.length ? server.dnsSettings : null,
            };
            this.props.dispatch({
                type: 'serverVmess/save',
                params,
                callback: () => this.toggle(),
            });
        } catch (error) {
            notification.error({ message: '请求失败', description: '传输协议配置格式有误' });
        }
    }

    renderChildDrawer(): React.ReactNode {
        const { server, childDrawer } = this.state;
        if (childDrawer.type === 'networkSettings') {
            return (
                <div id="v2ray-protocol">
                    <div className="form-group">
                        <label>
                            协议详细配置{' '}
                            <a href="https://www.v2ray.com/chapter_02/05_transport.html">
                                <Icon type="link" />
                                参考
                            </a>
                        </label>
                        <JsonEditor
                            placeholder={NETWORK_PRESETS[server.network || ''] || ''}
                            mode="json"
                            theme="github"
                            fontSize={14}
                            showPrintMargin
                            showGutter
                            highlightActiveLine
                            value={
                                typeof server.networkSettings === 'string'
                                    ? server.networkSettings
                                    : server.networkSettings
                                      ? JSON.stringify(server.networkSettings, null, 2)
                                      : ''
                            }
                            onChange={(value) => this.updateServer('networkSettings', value)}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                    </div>
                </div>
            );
        }
        if (childDrawer.type === 'ruleSettings')
            return (
                <RuleSettings
                    settings={server.ruleSettings}
                    onChange={(settings) => this.updateServer('ruleSettings', settings)}
                />
            );
        if (childDrawer.type === 'tlsSettings')
            return (
                <TlsSettings
                    settings={server.tlsSettings}
                    onChange={(settings) => this.updateServer('tlsSettings', settings)}
                />
            );
        if (childDrawer.type === 'dnsSettings')
            return (
                <DnsSettings
                    settings={server.dnsSettings}
                    onChange={(settings) => this.updateServer('dnsSettings', settings)}
                />
            );
        return null;
    }

    render(): React.ReactNode {
        const { server, visible, childDrawer } = this.state;
        const { groups } = this.props.serverGroup;
        const { servers } = this.props.serverManage;
        const { routes } = this.props.serverRoute;
        const saveLoading = this.props.serverVmess.saveLoading;

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
                        <VmessGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onOpenSettings={(title, panel) => this.showChildDrawer(title, panel)}
                        />
                        <div className="form-group">
                            <label>
                                传输协议{' '}
                                <a
                                    href="javascript:void(0);"
                                    onClick={() =>
                                        this.showChildDrawer('编辑协议配置', 'networkSettings')
                                    }
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
                                <Select.Option value="kcp">mKCP</Select.Option>
                                <Select.Option value="httpupgrade">HTTPUpgrade</Select.Option>
                                <Select.Option value="xhttp">XHTTP</Select.Option>
                            </Select>
                        </div>
                        <VmessRelationshipFields
                            server={server}
                            servers={servers}
                            routes={routes}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
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
                        id="server-child-settings"
                        width="80%"
                        title={childDrawer.title}
                        visible={childDrawer.visible}
                        onClose={() => this.hideChildDrawer()}
                    >
                        {this.renderChildDrawer()}
                    </CompatibleDrawer>
                </CompatibleDrawer>
            </>
        );
    }
}

const ConnectedVmessEditor = connect((state: AdminRootState) => ({
    serverVmess: state.serverVmess,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(VmessEditor);

export default ConnectedVmessEditor;
