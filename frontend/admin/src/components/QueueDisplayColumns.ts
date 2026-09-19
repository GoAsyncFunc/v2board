// Readonly queue workload columns, extracted unchanged from the admin Queue page.
// Only pure display cells are here: no events, requests, sorting or pagination.
import type { ColumnProps } from 'antd/lib/table/interface';

const QUEUE_NAME_LABELS: Record<string, string> = {
  order_handle: '订单队列',
  send_email: '邮件队列',
  send_email_mass: '邮件群发队列',
  send_telegram: 'Telegram消息队列',
  stat: '统计队列',
  traffic_fetch: '流量消费队列',
};

// Direct property lookup: unknown names return undefined, as in the original.
export type QueueName = string | number | symbol | null | undefined;
export type QueueWait = string | number | object | null | undefined;

export interface QueueWorkload {
  name: QueueName;
  processes?: unknown;
  length?: unknown;
  wait?: QueueWait;
  [key: string]: unknown;
}

export function formatQueueName(value: QueueName): string | undefined {
  return QUEUE_NAME_LABELS[value as string];
}

// Preserve the original implicit string coercion (`e + "s"`), including
// undefined -> "undefineds" and object Symbol.toPrimitive/toString behaviour.
export function formatQueueWait(value: QueueWait): string {
  return value + 's';
}

export function createReadonlyQueueColumns(): ColumnProps<QueueWorkload>[] {
  return [
    { title: '队列名称', dataIndex: 'name', key: 'name', render: formatQueueName },
    { title: '作业量', dataIndex: 'processes', key: 'processes' },
    { title: '任务量', dataIndex: 'length', key: 'length' },
    { title: '占用时间', dataIndex: 'wait', key: 'wait', align: 'right', render: formatQueueWait },
  ];
}
