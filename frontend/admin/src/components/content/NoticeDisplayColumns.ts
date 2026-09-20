import moment from 'moment';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { NoticeRecord, NoticeTimestamp } from '../../types/notice';

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
