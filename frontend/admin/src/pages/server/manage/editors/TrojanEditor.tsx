import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import ServerEditorDrawer from './ServerEditorDrawer';
import { TrojanNetworkSettings } from './Trojan/NetworkSettings';
import { TrojanGeneralFields } from './Trojan/GeneralFields';
import { TrojanRelationshipFields } from './Trojan/RelationshipFields';
import type {
    ServerEditorProps,
    ServerRecord,
    ServerSaveState,
} from '../../../../types/serverContracts';
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
                <ServerEditorDrawer
                    id="server"
                    maskClosable
                    title={server.id ? '编辑节点' : '新建节点'}
                    width="80%"
                    visible={visible}
                    onClose={() => this.toggle()}
                >
                    <div>
                        <TrojanGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <TrojanRelationshipFields
                            server={server}
                            servers={servers}
                            routes={routes}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onOpenNetworkSettings={() =>
                                this.setState({ networkSettingsVisible: true })
                            }
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
                    </ServerEditorDrawer>
                </ServerEditorDrawer>
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
