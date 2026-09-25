import React from 'react';
import Modal from 'antd/lib/modal';
import { connect } from 'react-redux';
import history from '../../../app/navigation';
import { get, post } from '../../../services/request';
import { isSuccessfulResponse } from '../../../types/apiContracts';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import OrderDetailBody from './OrderDetailBody';
import type {
    OrderDetailPlan,
    OrderDetailRecord,
    OrderDetailUser,
} from '../../../types/orderContracts';

interface OrderDetailModalProps {
    children: React.ReactNode;
    dispatch: AdminDispatch;
    orderId: number | string;
    plan: { plans: OrderDetailPlan[] };
}

interface OrderDetailModalState {
    order: OrderDetailRecord;
    user: OrderDetailUser;
    inviteUser: OrderDetailUser;
    visible: boolean;
}

function emptyOrderDetail(): OrderDetailRecord {
    return {
        trade_no: '',
        period: '',
        status: 0,
        plan_id: '',
        total_amount: 0,
        balance_amount: 0,
        discount_amount: 0,
        refund_amount: 0,
        surplus_amount: 0,
        created_at: 0,
        updated_at: 0,
        commission_balance: 0,
        commission_status: 0,
    };
}

export class OrderDetailModal extends React.Component<
    OrderDetailModalProps,
    OrderDetailModalState
> {
    state: OrderDetailModalState = {
        order: emptyOrderDetail(),
        user: { email: '' },
        inviteUser: { email: '' },
        visible: false,
    };

    async getOrderInfo(): Promise<void> {
        this.setState({ visible: true });
        const orderResponse = await post<OrderDetailRecord>(
            `/${window.settings.secure_path}/order/detail`,
            { id: this.props.orderId },
        );
        if (!isSuccessfulResponse(orderResponse)) return;
        const userResponse = await get<OrderDetailUser>(
            `/${window.settings.secure_path}/user/getUserInfoById`,
            { id: orderResponse.data.user_id },
        );
        if (!isSuccessfulResponse(userResponse)) return;
        let inviteUser = { email: '' };
        if (orderResponse.data.invite_user_id) {
            const inviteResponse = await get<OrderDetailUser>(
                `/${window.settings.secure_path}/user/getUserInfoById`,
                { id: orderResponse.data.invite_user_id },
            );
            if (!isSuccessfulResponse(inviteResponse)) return;
            inviteUser = inviteResponse.data;
        }
        this.setState({ order: orderResponse.data, user: userResponse.data, inviteUser });
    }

    jumpUserFilter(key: string, condition: string, value: string): void {
        this.props.dispatch({ type: 'user/addFilter', key, condition, value });
        history.push('/user');
    }

    render(): React.ReactNode {
        return (
            <div>
                <div onClick={() => this.getOrderInfo()}>{this.props.children}</div>
                <Modal
                    visible={this.state.visible}
                    title="订单信息"
                    onCancel={() => this.setState({ visible: false })}
                    footer={false}
                >
                    <OrderDetailBody
                        order={this.state.order}
                        user={this.state.user}
                        inviteUser={this.state.inviteUser}
                        plans={this.props.plan.plans}
                        onUserFilter={(...args) => this.jumpUserFilter(...args)}
                    />
                </Modal>
            </div>
        );
    }
}

export const ConnectedOrderDetailModal = connect((state: AdminRootState) => ({
    plan: state.plan,
}))(OrderDetailModal);
