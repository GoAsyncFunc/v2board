import React from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { ColumnProps, SorterResult } from 'antd/lib/table/interface';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { GiftcardRecord, GiftcardState } from '../../../types/promotion';
import type { PlanSummary } from '../../../types/configurationValues';
import { copyText } from '../../../utils/clipboard';
import { createReadonlyGiftcardColumns } from './GiftcardColumns';

interface GiftcardListProps {
    dispatch: AdminDispatch;
    giftcard: GiftcardState;
    plan: { plans: PlanSummary[] };
    onEdit: (record: GiftcardRecord) => void;
}

export class GiftcardList extends React.Component<GiftcardListProps> {
    drop(card: GiftcardRecord): void {
        this.props.dispatch({ type: 'giftcard/drop', id: card.id });
    }

    tableOnChange(pagination: PaginationConfig, sorter: SorterResult<GiftcardRecord>): void {
        this.props.dispatch({
            type: 'giftcard/changeTable',
            pagination,
            sort: {
                sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC',
                sort: sorter.columnKey,
            },
        });
    }

    render(): React.ReactNode {
        const { giftcard, plan } = this.props;
        const readonlyColumns = createReadonlyGiftcardColumns(plan.plans);
        const columns: ColumnProps<GiftcardRecord>[] = [
            readonlyColumns.id,
            readonlyColumns.name,
            readonlyColumns.type,
            readonlyColumns.value,
            readonlyColumns.plan_id,
            {
                title: '卡密',
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
            readonlyColumns.limit_use,
            readonlyColumns.started_at,
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
            <Table<GiftcardRecord>
                tableLayout="auto"
                dataSource={giftcard.giftcards}
                columns={columns}
                scroll={{ x: 1050 }}
                pagination={{
                    ...giftcard.pagination,
                    size: 'small',
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100', '150'],
                }}
                onChange={(pagination, _filters, sorter) => this.tableOnChange(pagination, sorter)}
            />
        );
    }
}

export default connect((state: AdminRootState) => ({
    giftcard: state.giftcard,
    plan: state.plan,
}))(GiftcardList);
