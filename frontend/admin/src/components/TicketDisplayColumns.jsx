import moment from '../vendor/modules/77642f52.js';

export function createReadonlyTicketColumns(levels) {
  return {
    id: { title: '#', dataIndex: 'id', key: 'id' },
    subject: { title: '主题', dataIndex: 'subject', key: 'subject' },
    level: { title: '工单级别', dataIndex: 'level', key: 'level', render: value => levels[value] },
    created_at: { title: '创建时间', dataIndex: 'created_at', key: 'created_at', render: value => moment(1000 * value).format('YYYY/MM/DD HH:mm') },
    updated_at: { title: '最后回复', dataIndex: 'updated_at', key: 'updated_at', render: value => moment(1000 * value).format('YYYY/MM/DD HH:mm') },
  };
}
