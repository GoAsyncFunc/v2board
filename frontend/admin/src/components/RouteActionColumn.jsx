// Display only: this column does not execute routing actions.
export function createRouteActionColumn(actionText) {
  return {
    title: '动作', dataIndex: 'action', key: 'action',
    render: value => actionText[value],
  };
}
