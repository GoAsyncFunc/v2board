import moment from 'moment';

export type KnowledgeTimestamp = number | string | null | undefined;

export function formatKnowledgeUpdatedAt(value: KnowledgeTimestamp): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function createReadonlyKnowledgeColumns() {
  return {
    id: { title: '文章ID', dataIndex: 'id', key: 'id' },
    title: { title: '标题', dataIndex: 'title', key: 'title' },
    category: { title: '分类', dataIndex: 'category', key: 'category' },
    updated_at: {
      title: '更新时间', dataIndex: 'updated_at', key: 'updated_at', align: 'right',
      render: formatKnowledgeUpdatedAt,
    },
  };
}
