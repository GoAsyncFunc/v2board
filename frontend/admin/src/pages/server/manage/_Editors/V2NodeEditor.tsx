import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import CompatibleDrawer from './CompatibleDrawer';
import JsonEditor from '../../../../components/common/JsonEditor';
import { TlsSettings, EncryptionSettings } from './ServerSecuritySettings';
import V2NodeGeneralFields from './V2Node/GeneralFields';
import V2NodeProtocolFields from './V2Node/ProtocolFields';
import V2NodeProtocolSpecificFields from './V2Node/ProtocolSpecificFields';
import V2NodeRelationshipFields from './V2Node/RelationshipFields';
import type { V2NodeSettingsPanel } from './V2Node/types';
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
            acceptProxyProtocol: false,
            header: {
                type: 'http',
                request: { path: ['/'], headers: { Host: ['www.baidu.com', 'www.bing.com'] } },
                response: {},
            },
        },
        null,
        4,
    ),
    http: JSON.stringify(
        { acceptProxyProtocol: false, path: '/', Host: 'xtls.github.io' },
        null,
        4,
    ),
    ws: JSON.stringify(
        { acceptProxyProtocol: false, path: '/', headers: { Host: 'xtls.github.io' } },
        null,
        4,
    ),
    grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
    httpupgrade: JSON.stringify(
        { acceptProxyProtocol: false, path: '/', host: 'xtls.github.io' },
        null,
        4,
    ),
    xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io', mode: 'auto', extra: {} }, null, 4),
};

const DEFAULT_PADDING_SCHEME = JSON.stringify(
    [
        'stop=8',
        '0=30-30',
        '1=100-400',
        '2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000',
        '3=9-9,500-1000',
        '4=500-1000',
        '5=500-1000',
        '6=500-1000',
        '7=500-1000',
    ],
    null,
    4,
);
const TLS_PROTOCOLS = ['anytls', 'hysteria2', 'trojan', 'tuic'];

interface V2NodeEditorProps extends ServerEditorProps {
    serverV2node: ServerSaveState;
}
interface V2NodeEditorState {
    server: ServerRecord;
    visible: boolean;
    childDrawer: ChildDrawerState;
}

export class V2NodeEditor extends React.Component<V2NodeEditorProps, V2NodeEditorState> {
    constructor(props: V2NodeEditorProps) {
        super(props);
        this.state = {
            server: props.record
                ? { ...props.record }
                : {
                      tls: 0,
                      rate: 1,
                      network: 'tcp',
                      disable_sni: 0,
                      zero_rtt_handshake: 0,
                      flow: null,
                  },
            visible: false,
            childDrawer: { visible: false, title: '', type: undefined },
        };
    }

    open(): void {
        const server = { ...this.state.server };
        if (server.network_settings && typeof server.network_settings === 'object')
            server.network_settings = JSON.stringify(server.network_settings, null, 2);
        this.setState({ visible: true, server });
    }

    close(): void {
        this.setState({ visible: false });
    }

    updateServer<Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]): void {
        if (field === 'protocol' && typeof value === 'string' && TLS_PROTOCOLS.includes(value))
            this.setState({ server: { ...this.state.server, protocol: value, tls: 1 } });
        else this.setState({ server: { ...this.state.server, [field]: value } });
    }

    showChildDrawer(title: string, type: V2NodeSettingsPanel): void {
        this.setState({ childDrawer: { visible: true, title, type } });
    }
    hideChildDrawer(): void {
        this.setState({ childDrawer: { ...this.state.childDrawer, visible: false } });
    }

    save(): void {
        const payload = JSON.parse(JSON.stringify(this.state.server));
        payload.network_settings = payload.network_settings
            ? typeof payload.network_settings === 'string'
                ? JSON.parse(payload.network_settings)
                : payload.network_settings
            : null;
        delete payload.install_command;
        this.props.dispatch({
            type: 'serverV2node/save',
            params: payload,
            callback: () => this.close(),
        });
    }

    renderJsonEditor(
        value: ServerRecord['network_settings'] | ServerRecord['padding_scheme'],
        placeholder: string,
        field: 'network_settings' | 'padding_scheme',
        id: string,
    ): React.ReactElement {
        const editorValue =
            typeof value === 'string' ? value : value == null ? '' : JSON.stringify(value, null, 2);
        return (
            <div id={id}>
                <div className="form-group">
                    <JsonEditor
                        placeholder={placeholder}
                        mode="json"
                        theme="github"
                        fontSize={14}
                        showPrintMargin
                        showGutter
                        highlightActiveLine
                        value={editorValue}
                        onChange={(nextValue) => this.updateServer(field, nextValue)}
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

    renderChildDrawer(): React.ReactNode {
        const { server, childDrawer } = this.state;
        if (childDrawer.type === 'network_settings')
            return this.renderJsonEditor(
                typeof server.network_settings === 'object'
                    ? JSON.stringify(server.network_settings, null, 2)
                    : server.network_settings,
                NETWORK_PRESETS[server.network || ''] || '',
                'network_settings',
                'v2ray-protocol',
            );
        if (childDrawer.type === 'tls_settings')
            return (
                <TlsSettings
                    settings={server.tls_settings}
                    tls={server.tls ?? 0}
                    certApply
                    onChange={(settings) => this.updateServer('tls_settings', settings)}
                />
            );
        if (childDrawer.type === 'encryption_settings')
            return (
                <EncryptionSettings
                    settings={server.encryption_settings}
                    onChange={(settings) => this.updateServer('encryption_settings', settings)}
                />
            );
        if (childDrawer.type === 'padding_scheme')
            return this.renderJsonEditor(
                server.padding_scheme,
                DEFAULT_PADDING_SCHEME,
                'padding_scheme',
                'anytls-padding-scheme',
            );
        return null;
    }

    render(): React.ReactNode {
        const { server, visible, childDrawer } = this.state;
        const { groups } = this.props.serverGroup;
        const { servers } = this.props.serverManage;
        const { routes } = this.props.serverRoute;
        const saveLoading = this.props.serverV2node.saveLoading;

        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.open() })}
                <CompatibleDrawer
                    id="server"
                    maskClosable
                    title={server.id ? '编辑节点' : '新建节点'}
                    width="80%"
                    visible={visible}
                    onClose={() => this.close()}
                >
                    <div>
                        <V2NodeGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <V2NodeProtocolFields
                            server={server}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onOpenSettings={(title, panel) => this.showChildDrawer(title, panel)}
                        />
                        <V2NodeProtocolSpecificFields
                            server={server}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onOpenSettings={(title, panel) => this.showChildDrawer(title, panel)}
                        />
                        <V2NodeRelationshipFields
                            server={server}
                            servers={servers}
                            routes={routes}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                    </div>
                    <div className="v2board-drawer-action">
                        <Button style={{ marginRight: 8 }} onClick={() => this.close()}>
                            取消
                        </Button>
                        <Button loading={saveLoading} onClick={() => this.save()} type="primary">
                            提交
                        </Button>
                    </div>
                    <CompatibleDrawer
                        closable={false}
                        id="server"
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

export default connect((state: AdminRootState) => ({
    serverV2node: state.serverV2node,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(V2NodeEditor);
