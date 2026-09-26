import React from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { ColumnProps, SorterResult } from 'antd/lib/table/interface';
import type { AdminDispatch, AdminRootState } from '@/types/storeContracts';
import type { CouponRecord, CouponState } from '@/types/promotionContracts';
import { copyText } from '@/utils/clipboardService';
import { createCouponColumns } from './CouponColumns';

interface CouponListProps {
    dispatch: AdminDispatch;
    coupon: CouponState;
    onEdit: (record: CouponRecord) => void;
}

export class CouponList extends React.Component<CouponListProps> {
    show(id: string | number | undefined): void {
        this.props.dispatch({ type: 'coupon/show', id });
    }

    drop(coupon: CouponRecord): void {
        this.props.dispatch({ type: 'coupon/drop', id: coupon.id });
    }

    tableOnChange(pagination: PaginationConfig, sorter: SorterResult<CouponRecord>): void {
        this.props.dispatch({
            type: 'coupon/changeTable',
            pagination,
            sort: {
                sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC',
                sort: sorter.columnKey,
            },
        });
    }

    render(): React.ReactNode {
        const { coupon } = this.props;
        const tableColumns = createCouponColumns();
        const columns: ColumnProps<CouponRecord>[] = [
            tableColumns.id,
            {
                title: '启用',
                dataIndex: 'show',
                key: 'show',
                render: (enabled: boolean, row) => (
                    <Switch size="small" checked={enabled} onChange={() => this.show(row.id)} />
                ),
            },
            tableColumns.name,
            tableColumns.type,
            {
                title: '券码',
                dataIndex: 'code',
                key: 'code',
                render: (code: string) => (
                    <Tag
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            copyText(code);
                            message.success('复制成功');
                        }}
                    >
                        {code}
                    </Tag>
                ),
            },
            tableColumns.limit_use,
            tableColumns.started_at,
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                fixed: 'right',
                render: (_value, row) => (
                    <div>
                        <a href="javascript:void(0);" onClick={() => this.props.onEdit(row)}>
                            编辑
                        </a>
                        <Divider type="vertical" />
                        <a
                            href="javascript:void(0);"
                            onClick={() =>
                                Modal.confirm({
                                    title: '警告',
                                    content: '确定要删除该条项目吗？',
                                    onOk: () => this.drop(row),
                                    okText: '确定',
                                    cancelText: '取消',
                                })
                            }
                        >
                            删除
                        </a>
                    </div>
                ),
            },
        ];

        return (
            <Table<CouponRecord>
                tableLayout="auto"
                dataSource={coupon.coupons}
                columns={columns}
                scroll={{ x: 1050 }}
                pagination={{
                    ...coupon.pagination,
                    size: 'small',
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100', '150'],
                }}
                onChange={(pagination, _filters, sorter) => this.tableOnChange(pagination, sorter)}
            />
        );
    }
}

export default connect((state: AdminRootState) => ({ coupon: state.coupon }))(CouponList);
