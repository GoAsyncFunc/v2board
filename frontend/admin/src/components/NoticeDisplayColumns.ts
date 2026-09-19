import moment from 'moment';
import type { ColumnProps } from 'antd/lib/table/interface';

export type NoticeTimestamp = number | string | null | undefined;

export interface NoticeRecord {
  id?: string | number;
  title?: string;
  content?: string;
  tags?: string[] | null;
  img_url?: string;
  show?: boolean | number;
  created_at?: NoticeTimestamp;
}

export function formatNoticeCreatedAt(value: NoticeTimestamp): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function createReadonlyNoticeColumns(): Record<'id' | 'title' | 'created_at', ColumnProps<NoticeRecord>> {
  return {
    id: { title: '#', dataIndex: 'id', key: 'id' },
    title: { title: '标题', dataIndex: 'title', key: 'title' },
    created_at: {
      title: '创建时间', dataIndex: 'created_at', key: 'created_at', align: 'right',
      render: formatNoticeCreatedAt,
    },
  };
}
