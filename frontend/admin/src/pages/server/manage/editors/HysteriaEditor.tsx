import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import ServerEditorDrawer from './ServerEditorDrawer';
import { HysteriaObfuscationSettings } from './Hysteria/ObfuscationSettings';
import { HysteriaGeneralFields } from './Hysteria/GeneralFields';
import { HysteriaRelationshipFields } from './Hysteria/RelationshipFields';
import type { ServerEditorProps, ServerRecord, ServerSaveState } from '@/types/serverContracts';
import type { AdminRootState } from '@/types/storeContracts';

interface HysteriaEditorProps extends ServerEditorProps {
    serverHysteria: ServerSaveState;
}
interface HysteriaEditorState {
    server: ServerRecord;
    visible: boolean;
}

export class HysteriaEditor extends React.Component<HysteriaEditorProps, HysteriaEditorState> {
    constructor(props: HysteriaEditorProps) {
        super(props);
        this.state = {
            server: props.record ? { ...props.record } : { insecure: 0, version: 1, rate: 1 },
            visible: false,
        };
    }

    toggle(): void {
        this.setState({ visible: !this.state.visible });
    }
    updateServer<Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]): void {
        this.setState({ server: { ...this.state.server, [field]: value } });
    }

    save(): void {
        this.props.dispatch({
            type: 'serverHysteria/save',
            params: { ...this.state.server },
            callback: () => this.toggle(),
        });
    }

    render(): React.ReactNode {
        const { server, visible } = this.state;
        const saveLoading = this.props.serverHysteria.saveLoading;
        const { servers } = this.props.serverManage;
        const { groups } = this.props.serverGroup;
        const { routes } = this.props.serverRoute;

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
                        <HysteriaGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <HysteriaObfuscationSettings
                            server={server}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <HysteriaRelationshipFields
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

const ConnectedHysteriaEditor = connect((state: AdminRootState) => ({
    serverHysteria: state.serverHysteria,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(HysteriaEditor);

export default ConnectedHysteriaEditor;
