import React from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import LoadingContainer from '@/components/common/LoadingContainer';
import { getPreference, isMobile, setPreference } from '@/utils/siteHelpers';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { serverModelNamespace } from './editors/ServerEditorRegistry';
import ServerManageWorkspace from './components/ServerManageWorkspace';
import type { AdminDispatch, AdminRootState } from '@/types/storeContracts';
import type {
    ManagedServerRecord,
    ServerGroupState,
    ServerManageState,
    ServerRecord,
} from '@/types/serverContracts';

type ServerProtocolAction = 'copy' | 'drop' | 'update';
interface ServerUpdatePayload<Key extends keyof ServerRecord = keyof ServerRecord> {
    key: Key;
    value: ServerRecord[Key];
}

interface ServerManagePageProps {
    dispatch: AdminDispatch;
    serverManage: ServerManageState;
    serverGroup: ServerGroupState;
}
interface ServerManagePageState {
    searchKey?: string;
    pageSize: number;
}
export class ServerManagePage extends React.Component<
    ServerManagePageProps,
    ServerManagePageState
> {
    constructor(props: ServerManagePageProps) {
        super(props);
        this.state = {
            searchKey: undefined,
            pageSize: Number(getPreference('server_manage_page_size')) || 10,
        };
    }

    componentDidMount(): void {
        this.props.dispatch({ type: 'serverManage/getNodes' });
        this.props.dispatch({ type: 'serverGroup/fetch' });
        this.props.dispatch({ type: 'serverRoute/fetch' });
    }

    dispatchServerAction(
        server: ServerRecord,
        action: Exclude<ServerProtocolAction, 'update'>,
    ): void;
    dispatchServerAction<Key extends keyof ServerRecord>(
        server: ServerRecord,
        action: 'update',
        payload: ServerUpdatePayload<Key>,
    ): void;
    dispatchServerAction(
        server: ServerRecord,
        action: ServerProtocolAction,
        payload?: ServerUpdatePayload,
    ): void {
        if (!server.type) return;
        const model = serverModelNamespace(server.type);
        if (model)
            this.props.dispatch({ type: `${model}/${action}`, id: server.id, ...(payload || {}) });
    }

    copy(server: ServerRecord): void {
        this.dispatchServerAction(server, 'copy');
    }
    drop(server: ServerRecord): void {
        this.dispatchServerAction(server, 'drop');
    }
    update<Key extends keyof ServerRecord>(
        server: ServerRecord,
        key: Key,
        value: ServerRecord[Key],
    ): void {
        this.dispatchServerAction(server, 'update', { key, value });
    }

    filteredServers(): ManagedServerRecord[] {
        const { servers } = this.props.serverManage;
        const { searchKey } = this.state;
        return searchKey
            ? servers.filter((server) => JSON.stringify(server).includes(searchKey))
            : servers;
    }

    render(): React.ReactNode {
        const { servers, fetchLoading, sortMode } = this.props.serverManage;
        const groups = this.props.serverGroup.groups;
        const filteredServers = this.filteredServers();
        const mobile = isMobile();
        return (
            <MainLayout {...this.props} title="节点管理">
                <Prompt
                    when={sortMode}
                    message={() => window.confirm('节点排序还没有保存，是否离开')}
                />
                <LoadingContainer loading={fetchLoading}>
                    <div className="block block-bottom">
                        <ServerManageWorkspace
                            groups={groups}
                            servers={filteredServers}
                            sortMode={sortMode}
                            pageSize={this.state.pageSize}
                            mobile={mobile}
                            showSortControls={!mobile}
                            onSearch={(searchKey) => this.setState({ searchKey })}
                            onToggleSort={() =>
                                sortMode
                                    ? this.props.dispatch({ type: 'serverManage/saveSort' })
                                    : this.props.dispatch({
                                          type: 'serverManage/setState',
                                          payload: { sortMode: true },
                                      })
                            }
                            onSort={(fromIndex, toIndex) =>
                                this.props.dispatch({
                                    type: 'serverManage/sort',
                                    fromIndex,
                                    toIndex,
                                })
                            }
                            onPageSizeChange={(pageSize) =>
                                this.setState({ pageSize }, () =>
                                    setPreference('server_manage_page_size', pageSize),
                                )
                            }
                            onCopy={(server) => this.copy(server)}
                            onDrop={(server) => this.drop(server)}
                            onUpdate={(server, key, value) => this.update(server, key, value)}
                        />
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({
    serverManage: state.serverManage,
    serverGroup: state.serverGroup,
}))(ServerManagePage);
