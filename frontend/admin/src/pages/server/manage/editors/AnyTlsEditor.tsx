import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import ServerEditorDrawer from './ServerEditorDrawer';
import { AnyTlsPaddingScheme } from './AnyTls/PaddingScheme';
import { AnyTlsGeneralFields } from './AnyTls/GeneralFields';
import { AnyTlsRelationshipFields } from './AnyTls/RelationshipFields';
import type {
    ServerEditorProps,
    ServerRecord,
    ServerSaveState,
} from '../../../../types/serverContracts';
import type { AdminRootState } from '../../../../types/store';

interface AnyTlsEditorProps extends ServerEditorProps {
    serverAnyTLS: ServerSaveState;
}
interface AnyTlsEditorState {
    server: ServerRecord;
    visible: boolean;
    paddingEditorVisible: boolean;
}

export class AnyTlsEditor extends React.Component<AnyTlsEditorProps, AnyTlsEditorState> {
    constructor(props: AnyTlsEditorProps) {
        super(props);
        this.state = {
            server: props.record ? { ...props.record } : { insecure: 0, rate: 1 },
            visible: false,
            paddingEditorVisible: false,
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
            type: 'serverAnyTLS/save',
            params: { ...this.state.server },
            callback: () => this.toggle(),
        });
    }

    render(): React.ReactNode {
        const { server, visible, paddingEditorVisible } = this.state;
        const { groups } = this.props.serverGroup;
        const { servers } = this.props.serverManage;
        const { routes } = this.props.serverRoute;
        const saveLoading = this.props.serverAnyTLS.saveLoading;

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
                        <AnyTlsGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <div className="form-group">
                            <label>
                                <a
                                    href="javascript:void(0);"
                                    onClick={() => this.setState({ paddingEditorVisible: true })}
                                >
                                    编辑填充方案
                                </a>
                            </label>
                        </div>
                        <AnyTlsRelationshipFields
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
                        id="server"
                        width="80%"
                        title="编辑填充方案"
                        visible={paddingEditorVisible}
                        onClose={() => this.setState({ paddingEditorVisible: false })}
                    >
                        <AnyTlsPaddingScheme
                            value={server.padding_scheme}
                            onChange={(value) => this.updateServer('padding_scheme', value)}
                        />
                    </ServerEditorDrawer>
                </ServerEditorDrawer>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({
    serverAnyTLS: state.serverAnyTLS,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(AnyTlsEditor);
