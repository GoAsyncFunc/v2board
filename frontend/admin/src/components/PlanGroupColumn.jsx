import React from 'react';
import { Tag } from '../vendor/ui.js';

export function renderPlanGroupTags(groups, groupId) {
  const tags = [];
  // Keep parsing inside iteration and retain every matching group, including
  // duplicates. Do not replace with find(), coerce group IDs or add defaults.
  groups.map(group => {
    if (group.id === parseInt(groupId)) tags.push(<Tag>{group.name}</Tag>);
  });
  return tags;
}

export function createPlanGroupColumn(groups) {
  return {
    title: '权限组', dataIndex: 'group_id', key: 'group_id',
    render: value => renderPlanGroupTags(groups, value),
  };
}
