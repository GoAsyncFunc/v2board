import React from 'react';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import Sortable from '../../../../components/common/Sortable';
import { createPaymentNotifyColumn } from './PaymentNotifyColumn';
import type { AdminDispatch } from '../../../../types/store';
import type { PaymentRecord, PaymentState } from '../../../../types/payment';

export interface PaymentListProps {
    dispatch: AdminDispatch;
    payment: PaymentState;
    renderEditor: (record?: PaymentRecord, key?: React.Key) => React.ReactElement;
}

export default function PaymentList({ dispatch, payment, renderEditor }: PaymentListProps) {
    const columns: ColumnProps<PaymentRecord>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id: PaymentRecord['id']) => (
                <>
                    <Icon type="menu" style={{ cursor: 'move' }} /> {id}
                </>
            ),
        },
        {
            title: '启用',
            dataIndex: 'enable',
            key: 'enable',
            render: (enabled: PaymentRecord['enable'], record) => (
                <Switch
                    checked={Boolean(parseInt(String(enabled), 10))}
                    size="small"
                    onChange={() => dispatch({ type: 'payment/show', id: record.id })}
                />
            ),
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (value: PaymentRecord['name']) => value,
        },
        {
            title: '支付方式',
            dataIndex: 'payment',
            key: 'payment',
            render: (value: PaymentRecord['payment']) => value,
        },
        createPaymentNotifyColumn(),
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            fixed: 'right',
            render: (_value, record) => (
                <>
                    {renderEditor(record, record.id)}
                    <Divider type="vertical" />
                    <a
                        href="javascript:void(0);"
                        onClick={() =>
                            Modal.confirm({
                                title: '警告',
                                content: '确定要删除该条项目吗？',
                                onOk: () => dispatch({ type: 'payment/drop', id: record.id }),
                                okText: '确定',
                                cancelText: '取消',
                            })
                        }
                    >
                        删除
                    </a>
                </>
            ),
        },
    ];

    return (
        <Sortable
            onDragEnd={(fromIndex, toIndex) =>
                dispatch({ type: 'payment/sort', fromIndex, toIndex })
            }
            nodeSelector="tr"
            handleSelector="i"
        >
            <Table<PaymentRecord>
                tableLayout="auto"
                dataSource={payment.payments}
                columns={columns}
                pagination={false}
                scroll={{ x: 1300 }}
            />
        </Sortable>
    );
}
