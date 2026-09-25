import React from 'react';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import type { AdminDispatch, AdminRootState } from '../../../../types/storeContracts';
import { RouteActionField } from './RouteActionField';
import { RouteBasicFields } from './RouteBasicFields';
import { RouteMatchField, getRouteMatchPlaceholder } from './RouteMatchField';

export type RouteAction =
    'block' | 'block_ip' | 'block_port' | 'protocol' | 'dns' | 'route' | 'route_ip' | 'default_out';

export interface ServerRouteRecord {
    id?: string | number;
    remarks?: string;
    match?: string | string[];
    action?: RouteAction;
    action_value?: string;
}

interface ServerRouteState {
    routes: ServerRouteRecord[];
    saveLoading: boolean;
    fetchLoading: boolean;
}
interface RouteEditorProps {
    children: React.ReactElement;
    dispatch: AdminDispatch;
    serverRoute: ServerRouteState;
    route?: ServerRouteRecord;
}
interface RouteEditorState {
    route: ServerRouteRecord;
    visible: boolean;
}
export class RouteEditor extends React.Component<RouteEditorProps, RouteEditorState> {
    constructor(props: RouteEditorProps) {
        super(props);
        this.state = { route: props.route ? { ...props.route } : {}, visible: false };
    }

    updateRoute(patch: Partial<ServerRouteRecord>): void {
        this.setState({ route: { ...this.state.route, ...patch } });
    }

    save(): void {
        const route = { ...this.state.route };
        if (Array.isArray(route.match)) route.match = route.match.filter(Boolean);
        else if (route.match && typeof route.match === 'string')
            route.match = route.match.split(',').filter(Boolean);
        else route.match = [];
        this.props.dispatch({
            type: 'serverRoute/save',
            params: route,
            callback: () => this.setState({ visible: false }),
        });
    }

    matchPlaceholder(): string {
        return getRouteMatchPlaceholder(this.state.route.action);
    }

    render(): React.ReactNode {
        const { route, visible } = this.state;
        const routeLoading = this.props.serverRoute.fetchLoading;
        return (
            <>
                {React.cloneElement(this.props.children, {
                    onClick: () => this.setState({ visible: true }),
                })}
                <Modal
                    title={route.id ? '编辑路由' : '创建路由'}
                    visible={visible}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={() => routeLoading || this.save()}
                    okText={routeLoading ? <Icon type="loading" /> : '提交'}
                    cancelText="取消"
                >
                    <div>
                        <RouteBasicFields
                            route={route}
                            onChange={(patch) => this.updateRoute(patch)}
                        />
                        {route.action !== 'default_out' && (
                            <RouteMatchField
                                route={route}
                                onChange={(patch) => this.updateRoute(patch)}
                            />
                        )}
                        <RouteActionField
                            route={route}
                            onChange={(patch) => this.updateRoute(patch)}
                        />
                    </div>
                </Modal>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({ serverRoute: state.serverRoute }))(
    RouteEditor,
);
