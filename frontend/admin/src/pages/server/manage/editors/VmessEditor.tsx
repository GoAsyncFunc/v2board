import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';
import ServerEditorDrawer from './ServerEditorDrawer';
import { DnsSettings } from './Vmess/DnsSettings';
import { RuleSettings } from './Vmess/RuleSettings';
import { TlsSettings } from './Vmess/TlsSettings';
import { VmessChildSettingsPanel } from './Vmess/ChildSettingsPanel';
import VmessGeneralFields from './Vmess/GeneralFields';
import VmessNetworkFields from './Vmess/NetworkFields';
import VmessRelationshipFields from './Vmess/RelationshipFields';
import type {
    ChildDrawerState,
    ServerEditorProps,
    ServerRecord,
    ServerSaveState,
} from '../../../../types/serverContracts';
import type { AdminRootState } from '../../../../types/storeContracts';

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
                <ServerEditorDrawer
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
                        <VmessNetworkFields
                            server={server}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onOpenSettings={(title, panel) => this.showChildDrawer(title, panel)}
                        />
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
                    <ServerEditorDrawer
                        closable={false}
                        id="server-child-settings"
                        width="80%"
                        title={childDrawer.title}
                        visible={childDrawer.visible}
                        onClose={() => this.hideChildDrawer()}
                    >
                        <VmessChildSettingsPanel
                            server={server}
                            childDrawer={childDrawer}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                    </ServerEditorDrawer>
                </ServerEditorDrawer>
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
