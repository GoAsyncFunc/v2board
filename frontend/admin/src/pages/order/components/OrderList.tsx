import React from 'react';
import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type { OrderRecord, OrderState } from '../../../types/orderContracts';
import {
    createOrderListColumns,
    renderCommissionStatus,
    renderOrderStatus,
} from './OrderListColumns';

interface OrderListProps {
    dispatch: AdminDispatch;
    order: OrderState;
}

export class OrderList extends React.Component<OrderListProps> {
    update(tradeNo: React.ReactNode, key: string, value: string | number): void {
        this.props.dispatch({ type: 'order/update', tradeNo, key, value });
    }

    renderOrderStatus(status: number, order: OrderRecord): React.ReactElement {
        return renderOrderStatus(this.props.dispatch, status, order);
    }

    renderCommissionStatus(status: number, order: OrderRecord): React.ReactNode {
        return renderCommissionStatus(this.props.dispatch, status, order);
    }

    render(): React.ReactNode {
        const { orders, pagination } = this.props.order;
        return (
            <Table<OrderRecord>
                tableLayout="auto"
                dataSource={orders}
                pagination={{ ...pagination, size: 'small' }}
                columns={createOrderListColumns(this.props.dispatch)}
                scroll={{ x: 1050 }}
                onChange={(nextPagination) =>
                    this.props.dispatch({
                        type: 'order/changeTable',
                        pagination: nextPagination,
                    })
                }
            />
        );
    }
}

export default connect((state: AdminRootState) => ({ order: state.order }))(OrderList);
