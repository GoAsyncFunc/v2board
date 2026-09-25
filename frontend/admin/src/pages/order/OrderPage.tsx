import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import AssignOrderEditor from '../../components/order/AssignOrderEditor';
import LoadingContainer from '../../components/common/LoadingContainer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import type { AdminDispatch, AdminRootState } from '../../types/storeContracts';
import type { OrderState } from '../../types/order';
import OrderFilterDrawer from './components/OrderFilterDrawer';
import { OrderList } from './components/OrderList';

interface OrderPageProps {
    dispatch: AdminDispatch;
    order: OrderState;
}

export class OrderPage extends React.Component<OrderPageProps> {
    componentDidMount(): void {
        this.props.dispatch({ type: 'order/fetch' });
        this.props.dispatch({ type: 'plan/fetch' });
    }

    componentWillUnmount(): void {
        this.props.dispatch({ type: 'order/empty' });
        this.props.dispatch({ type: 'order/setState', payload: { filter: [] } });
    }

    render(): React.ReactNode {
        const { order } = this.props;
        return (
            <MainLayout {...this.props} title="订单管理">
                <div className="d-flex justify-content-between align-items-center" />
                <LoadingContainer loading={order.fetchLoading}>
                    <div className="block block-rounded">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <Button.Group>
                                    <OrderFilterDrawer
                                        value={order.filter}
                                        onOk={(nextFilter) =>
                                            this.props.dispatch({
                                                type: 'order/filter',
                                                filter: nextFilter,
                                            })
                                        }
                                    >
                                        <Button
                                            type={order.filter.length > 0 ? 'primary' : undefined}
                                        >
                                            <Icon type="filter" /> 过滤器
                                        </Button>
                                    </OrderFilterDrawer>
                                </Button.Group>
                                <AssignOrderEditor>
                                    <Button style={{ marginLeft: 10 }}>
                                        <Icon type="plus" /> 添加订单
                                    </Button>
                                </AssignOrderEditor>
                            </div>
                            <OrderList dispatch={this.props.dispatch} order={order} />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export { OrderList } from './components/OrderList';
export { OrderDetailModal, ConnectedOrderDetailModal } from './components/OrderDetailModal';

export default connect((state: AdminRootState) => ({ order: state.order }))(OrderPage);
