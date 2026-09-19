// Display only: this column does not execute routing actions.
export type RouteActionText = Record<PropertyKey, unknown>;

export function createRouteActionColumn(actionText: RouteActionText | null) {
  return {
    title: '动作', dataIndex: 'action', key: 'action',
    render: (value: PropertyKey) => (actionText as RouteActionText)[value],
  };
}
