import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import ServerEditorDrawer from './ServerEditorDrawer';
import { TuicGeneralFields } from './Tuic/GeneralFields';
import { TuicRelationshipFields } from './Tuic/RelationshipFields';
import { TuicTransportSettings } from './Tuic/TransportSettings';
import type { ServerEditorProps, ServerRecord, ServerSaveState } from '@/types/serverContracts';
import type { AdminRootState } from '@/types/storeContracts';

interface TuicEditorProps extends ServerEditorProps {
    serverTuic: ServerSaveState;
}
interface TuicEditorState {
    server: ServerRecord;
    visible: boolean;
}

export class TuicEditor extends React.Component<TuicEditorProps, TuicEditorState> {
    constructor(props: TuicEditorProps) {
        super(props);
        this.state = {
            server: props.record
                ? { ...props.record }
                : {
                      insecure: 0,
                      disable_sni: 0,
                      udp_relay_mode: 'native',
                      zero_rtt_handshake: 0,
                      congestion_control: 'cubic',
                      rate: 1,
                  },
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
            type: 'serverTuic/save',
            params: { ...this.state.server },
            callback: () => this.toggle(),
        });
    }

    render(): React.ReactNode {
        const { server, visible } = this.state;
        const { groups } = this.props.serverGroup;
        const { servers } = this.props.serverManage;
        const { routes } = this.props.serverRoute;
        const saveLoading = this.props.serverTuic.saveLoading;
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
                        <TuicGeneralFields
                            server={server}
                            groups={groups}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <TuicTransportSettings
                            server={server}
                            onChange={(field, value) => this.updateServer(field, value)}
                        />
                        <TuicRelationshipFields
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

export default connect((state: AdminRootState) => ({
    serverTuic: state.serverTuic,
    serverGroup: state.serverGroup,
    serverManage: state.serverManage,
    serverRoute: state.serverRoute,
}))(TuicEditor);
