import moment from '../vendor/modules/77642f52.js';

export function createReadonlyKnowledgeColumns() {
  return {
    id: { title: '文章ID', dataIndex: 'id', key: 'id' },
    title: { title: '标题', dataIndex: 'title', key: 'title' },
    category: { title: '分类', dataIndex: 'category', key: 'category' },
    updated_at: {
      title: '更新时间', dataIndex: 'updated_at', key: 'updated_at', align: 'right',
      render: value => moment(1000 * value).format('YYYY/MM/DD HH:mm'),
    },
  };
}
