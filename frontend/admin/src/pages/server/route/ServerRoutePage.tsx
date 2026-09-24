import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../../components/common/LoadingContainer';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { settings } from '../../../config/adminSettings';
import ServerRouteList from './components/ServerRouteList';
import ConnectedRouteEditor, {
    RouteEditor,
    type ServerRouteRecord,
} from './components/RouteEditor';
import type { AdminDispatch, AdminRootState } from '../../../types/store';

interface ServerRoutePageProps {
    dispatch: AdminDispatch;
    serverRoute: {
        routes: ServerRouteRecord[];
        saveLoading: boolean;
        fetchLoading: boolean;
    };
}

export class ServerRoutePage extends React.Component<ServerRoutePageProps> {
    componentDidMount(): void {
        this.props.dispatch({ type: 'serverRoute/fetch' });
    }

    drop(id: string | number | undefined): void {
        this.props.dispatch({ type: 'serverRoute/drop', id });
    }

    render(): React.ReactNode {
        const { routes, fetchLoading } = this.props.serverRoute;
        return (
            <MainLayout {...this.props} title="路由管理">
                <div className="d-flex justify-content-between align-items-center" />
                <LoadingContainer loading={fetchLoading}>
                    <div className="block block-rounded">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <ConnectedRouteEditor>
                                    <Button>
                                        <Icon type="plus" /> 添加路由
                                    </Button>
                                </ConnectedRouteEditor>
                            </div>
                            <ServerRouteList
                                routes={routes}
                                routeActionText={settings.routeActionText}
                                onDelete={(id) => this.drop(id)}
                                renderEditor={(record, key) => (
                                    <ConnectedRouteEditor route={record} key={key}>
                                        <a href="javascript:void(0);">编辑</a>
                                    </ConnectedRouteEditor>
                                )}
                            />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export { RouteEditor };
export type { ServerRouteRecord };

export default connect((state: AdminRootState) => ({ serverRoute: state.serverRoute }))(
    ServerRoutePage,
);
