import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';
import ServerEditorDrawer from './ServerEditorDrawer';
import VlessGeneralFields from './Vless/GeneralFields';
import VlessRelationshipFields from './Vless/RelationshipFields';
import { VlessChildSettingsPanel } from './Vless/ChildSettingsPanel';
import type {
    ChildDrawerState,
    ServerEditorProps,
    ServerRecord,
    ServerSaveState,
} from '../../../../types/serverContracts';
import type { AdminRootState } from '../../../../types/store';

interface VlessEditorProps extends ServerEditorProps {
    serverVless: ServerSaveState;
}
interface VlessEditorState {
    server: ServerRecord;
    visible: boolean;
    childDrawer: ChildDrawerState;
}

export class VlessEditor extends React.Component<VlessEditorProps, VlessEditorState> {
    constructor(props: VlessEditorProps) {
        super(props);
        this.state = {
            server: props.record ? { ...props.record } : { tls: 0, rate: 1, flow: null },
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
            const payload = { ...this.state.server };
            payload.network_settings = payload.network_settings
                ? typeof payload.network_settings === 'string'
                    ? JSON.parse(payload.network_settings)
                    : payload.network_settings
                : null;
            this.props.dispatch({
                type: 'serverVless/save',
                params: payload,
                callback: () => this.close(),
            });
        } catch (error) {
            notification.error({ message: '请求失败', description: '传输协议配置格式有误' });
        }
    }

    render(): React.ReactNode {
        const { server, visible, childDrawer } = this.state;
        const { servers } = this.props.serverManage;
        const { groups } = this.props.serverGroup;
        const { routes } = this.props.serverRoute;
        const saveLoading = this.props.serverVless.saveLoading;
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.open() })}
                <ServerEditorDrawer
                    id="server"
                    maskClosable
                    title={server.id ? '编辑节点' : '新建节点'}
                    width="80%"
                    visible={visible}
                    onClose={() => this.close()}
                >
                    <div>
                        <VlessGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onOpenSettings={(title, panel) => this.showChildDrawer(title, panel)}
                        />
                        <VlessRelationshipFields
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
                    <ServerEditorDrawer
                        closable={false}
                        id="server"
                        width="80%"
                        title={childDrawer.title}
                        visible={childDrawer.visible}
                        onClose={() => this.hideChildDrawer()}
                    >
                        <VlessChildSettingsPanel
                            server={server}
                            childDrawer={childDrawer}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onOpenSettings={(title, panel) => this.showChildDrawer(title, panel)}
                        />
                    </ServerEditorDrawer>
                </ServerEditorDrawer>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({
    serverVless: state.serverVless,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(VlessEditor);
