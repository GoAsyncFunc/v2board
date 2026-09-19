import moment from 'moment';
import type { ColumnProps } from 'antd/lib/table/interface';

export type KnowledgeTimestamp = number | string | null | undefined;

export interface KnowledgeRecord {
  id?: string | number;
  title?: string;
  category?: string;
  language?: string | number;
  body?: string;
  show?: boolean | number;
  updated_at?: KnowledgeTimestamp;
}

export function formatKnowledgeUpdatedAt(value: KnowledgeTimestamp): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function createReadonlyKnowledgeColumns(): Record<'id' | 'title' | 'category' | 'updated_at', ColumnProps<KnowledgeRecord>> {
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
