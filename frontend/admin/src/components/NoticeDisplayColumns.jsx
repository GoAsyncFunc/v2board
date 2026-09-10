import moment from '../vendor/modules/77642f52.js';

export function createReadonlyNoticeColumns() {
  return {
    id: { title: '#', dataIndex: 'id', key: 'id' },
    title: { title: '标题', dataIndex: 'title', key: 'title' },
    created_at: {
      title: '创建时间', dataIndex: 'created_at', key: 'created_at', align: 'right',
      render: value => moment(1000 * value).format('YYYY/MM/DD HH:mm'),
    },
  };
}
