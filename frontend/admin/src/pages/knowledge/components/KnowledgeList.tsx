import React from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import Modal from 'antd/lib/modal';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import { createReadonlyKnowledgeColumns } from './KnowledgeColumns';
import SortableTable, { TableDragHandle } from '../../../components/common/SortableTable';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type { KnowledgeRecord, KnowledgeState } from '../../../types/knowledge';
import ConnectedKnowledgeEditor from './KnowledgeEditor';

const readonlyColumns = createReadonlyKnowledgeColumns();

interface KnowledgeListProps {
    dispatch: AdminDispatch;
    knowledge: KnowledgeState;
}

export class KnowledgeList extends React.Component<KnowledgeListProps> {
    show(id: string | number | undefined): void {
        this.props.dispatch({ type: 'knowledge/show', id });
    }

    drop(article: KnowledgeRecord): void {
        this.props.dispatch({ type: 'knowledge/drop', id: article.id });
    }

    render(): React.ReactNode {
        const { knowledge } = this.props;
        const columns: ColumnProps<KnowledgeRecord>[] = [
            {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                render: () => <TableDragHandle title="拖动排序" />,
            },
            readonlyColumns.id,
            {
                title: '显示',
                dataIndex: 'show',
                key: 'show',
                render: (visible: boolean, article) => (
                    <Switch size="small" checked={visible} onChange={() => this.show(article.id)} />
                ),
            },
            readonlyColumns.title,
            readonlyColumns.category,
            readonlyColumns.updated_at,
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                fixed: 'right',
                render: (_value, article) => (
                    <>
                        <ConnectedKnowledgeEditor id={article.id}>
                            <a href="javascript:void(0);">编辑</a>
                        </ConnectedKnowledgeEditor>
                        <Divider type="vertical" />
                        <a
                            href="javascript:void(0);"
                            onClick={() =>
                                Modal.confirm({
                                    title: '警告',
                                    content: '确定要删除该条项目吗？',
                                    onOk: () => this.drop(article),
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
            <SortableTable
                records={knowledge.knowledges}
                getRowKey={(article) => String(article.id ?? '')}
                onSortEnd={(fromIndex, toIndex) =>
                    this.props.dispatch({
                        type: 'knowledge/sort',
                        fromIndex,
                        toIndex,
                    })
                }
            >
                <Table<KnowledgeRecord>
                    tableLayout="auto"
                    dataSource={knowledge.knowledges}
                    pagination={false}
                    columns={columns}
                    scroll={{ x: 750 }}
                />
            </SortableTable>
        );
    }
}

export default connect((state: AdminRootState) => ({ knowledge: state.knowledge }))(KnowledgeList);
