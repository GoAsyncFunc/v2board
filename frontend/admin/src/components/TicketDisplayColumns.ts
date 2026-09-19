import moment from 'moment';

export function renderTicketLevel(levels: unknown[], value: unknown): unknown {
  return (levels as unknown as Record<PropertyKey, unknown>)[value as PropertyKey];
}

export function formatTicketCreatedAt(value: unknown): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function formatTicketUpdatedAt(value: unknown): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function createReadonlyTicketColumns(levels: unknown[]) {
  return {
    id: { title: '#', dataIndex: 'id', key: 'id' },
    subject: { title: '主题', dataIndex: 'subject', key: 'subject' },
    level: { title: '工单级别', dataIndex: 'level', key: 'level', render: (value: unknown) => renderTicketLevel(levels, value) },
    created_at: { title: '创建时间', dataIndex: 'created_at', key: 'created_at', render: formatTicketCreatedAt },
    updated_at: { title: '最后回复', dataIndex: 'updated_at', key: 'updated_at', render: formatTicketUpdatedAt },
  };
}
