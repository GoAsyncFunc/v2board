// Display only: this column does not execute routing actions.
export type RouteActionText = Readonly<Record<PropertyKey, string>>;

export function createRouteActionColumn<RecordType extends object = object>(actionText: RouteActionText | null) {
  return {
    title: '动作', dataIndex: 'action', key: 'action',
    render: (value: PropertyKey) => (actionText as RouteActionText)[value],
  };
}
