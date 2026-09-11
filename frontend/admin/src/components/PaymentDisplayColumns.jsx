export function createReadonlyPaymentColumns() {
  return {
    name: { title: '显示名称', dataIndex: 'name', key: 'name' },
    payment: { title: '支付接口', dataIndex: 'payment', key: 'payment' },
  };
}
