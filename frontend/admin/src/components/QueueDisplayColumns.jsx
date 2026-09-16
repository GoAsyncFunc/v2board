// Readonly queue workload columns, extracted unchanged from the admin Queue page.
// Only pure display cells are here: no events, requests, sorting or pagination.

const QUEUE_NAME_LABELS = {
  order_handle: '订单队列',
  send_email: '邮件队列',
  send_email_mass: '邮件群发队列',
  send_telegram: 'Telegram消息队列',
  stat: '统计队列',
  traffic_fetch: '流量消费队列',
};

// Direct property lookup: unknown names return undefined, as in the original.
export function formatQueueName(value) {
  return QUEUE_NAME_LABELS[value];
}

// Preserve the original implicit string coercion (`e + "s"`), including
// undefined -> "undefineds" and object Symbol.toPrimitive/toString behaviour.
export function formatQueueWait(value) {
  return value + 's';
}

export function createReadonlyQueueColumns() {
  return [
    { title: '队列名称', dataIndex: 'name', key: 'name', render: formatQueueName },
    { title: '作业量', dataIndex: 'processes', key: 'processes' },
    { title: '任务量', dataIndex: 'length', key: 'length' },
    { title: '占用时间', dataIndex: 'wait', key: 'wait', align: 'right', render: formatQueueWait },
  ];
}
