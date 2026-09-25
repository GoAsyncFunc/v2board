import React from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type { NoticeRecord } from '../../../types/noticeContracts';
import { createReadonlyNoticeColumns } from './NoticeColumns';

interface NoticeListProps {
    dispatch: AdminDispatch;
    notices: NoticeRecord[];
    onEdit: (record: NoticeRecord) => void;
}

const readonlyColumns = createReadonlyNoticeColumns();

export class NoticeList extends React.Component<NoticeListProps> {
    show(id: string | number | undefined): void {
        this.props.dispatch({ type: 'notice/show', id });
    }

    drop(notice: NoticeRecord): void {
        this.props.dispatch({ type: 'notice/drop', id: notice.id });
    }

    render(): React.ReactNode {
        const { notices } = this.props;
        const columns: ColumnProps<NoticeRecord>[] = [
            readonlyColumns.id,
            {
                title: '显示',
                dataIndex: 'show',
                key: 'show',
                render: (value: boolean, record) => (
                    <Switch size="small" checked={value} onChange={() => this.show(record.id)} />
                ),
            },
            readonlyColumns.title,
            readonlyColumns.created_at,
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                fixed: 'right',
                render: (_value, record) => (
                    <div>
                        <a href="javascript:void(0);" onClick={() => this.props.onEdit(record)}>
                            编辑
                        </a>
                        <Divider type="vertical" />
                        <a
                            href="javascript:void(0);"
                            onClick={() =>
                                Modal.confirm({
                                    title: '警告',
                                    content: '确定要删除该条项目吗？',
                                    onOk: () => this.drop(record),
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
            <Table<NoticeRecord>
                tableLayout="auto"
                dataSource={notices}
                pagination={false}
                columns={columns}
                scroll={{ x: 950 }}
            />
        );
    }
}

export default connect((state: AdminRootState) => ({ notices: state.notice.notices }))(NoticeList);
