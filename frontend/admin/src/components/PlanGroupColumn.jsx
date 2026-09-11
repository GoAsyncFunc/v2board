import React from 'react';
import { a as Tag } from '../vendor/modules/6d723332.js';

export function createPlanGroupColumn(groups) {
  return {
    title: '权限组', dataIndex: 'group_id', key: 'group_id',
    render: value => {
      const tags = [];
      // Keep parsing inside iteration and retain every matching group, including
      // duplicates. Do not replace with find(), coerce group IDs or add defaults.
      groups.map(group => {
        if (group.id === parseInt(value)) tags.push(<Tag>{group.name}</Tag>);
      });
      return tags;
    },
  };
}
