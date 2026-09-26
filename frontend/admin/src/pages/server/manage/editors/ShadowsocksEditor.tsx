import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import ServerEditorDrawer from './ServerEditorDrawer';
import { ShadowsocksSecuritySettings } from './Shadowsocks/SecuritySettings';
import { ShadowsocksGeneralFields } from './Shadowsocks/GeneralFields';
import { ShadowsocksRelationshipFields } from './Shadowsocks/RelationshipFields';
import type { ServerEditorProps, ServerRecord, ServerSaveState } from '@/types/serverContracts';
import type { AdminRootState } from '@/types/storeContracts';

interface ShadowsocksEditorProps extends ServerEditorProps {
    serverShadowsocks: ServerSaveState;
}
interface ShadowsocksEditorState {
    server: ServerRecord;
    visible: boolean;
}

export class ShadowsocksEditor extends React.Component<
    ShadowsocksEditorProps,
    ShadowsocksEditorState
> {
    constructor(props: ShadowsocksEditorProps) {
        super(props);
        this.state = {
            server: props.record || { cipher: 'chacha20-ietf-poly1305', rate: 1 },
            visible: false,
        };
    }

    toggle(): void {
        this.setState({ visible: !this.state.visible });
    }

    updateServer<Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]): void {
        this.setState({ server: { ...this.state.server, [field]: value } });
    }

    updateObfs(field: 'path' | 'host', value: string): void {
        this.setState({
            server: {
                ...this.state.server,
                obfs_settings: { ...(this.state.server.obfs_settings || {}), [field]: value },
            },
        });
    }

    save(): void {
        this.props.dispatch({
            type: 'serverShadowsocks/save',
            params: { ...this.state.server },
            callback: () => this.toggle(),
        });
    }

    render(): React.ReactNode {
        const { server, visible } = this.state;
        const { groups } = this.props.serverGroup;
        const { servers } = this.props.serverManage;
        const { routes } = this.props.serverRoute;
        const saveLoading = this.props.serverShadowsocks.saveLoading;

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
                        <ShadowsocksGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <ShadowsocksSecuritySettings
                            server={server}
                            onChange={(field, value) => this.updateServer(field, value)}
                            onObfsChange={(field, value) => this.updateObfs(field, value)}
                        />
                        <ShadowsocksRelationshipFields
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
                </ServerEditorDrawer>
            </>
        );
    }
}

const ConnectedShadowsocksEditor = connect((state: AdminRootState) => ({
    serverShadowsocks: state.serverShadowsocks,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(ShadowsocksEditor);

export default ConnectedShadowsocksEditor;
