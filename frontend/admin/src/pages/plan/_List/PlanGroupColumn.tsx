import React from 'react';
import Tag from 'antd/lib/tag';

export interface PlanGroup {
    id: number | string;
    name?: React.ReactNode;
}

export function renderPlanGroupTags(
    groups: PlanGroup[] | null | undefined,
    groupId: string | number | null | undefined,
) {
    const tags: React.ReactElement[] = [];
    // Keep parsing inside iteration and retain every matching group, including
    // duplicates. Do not replace with find(), coerce group IDs or add defaults.
    groups!.map((group) => {
        if (group.id === parseInt(groupId as string)) tags.push(<Tag>{group.name}</Tag>);
    });
    return tags;
}

export function createPlanGroupColumn(groups: PlanGroup[] | null | undefined) {
    return {
        title: '权限组',
        dataIndex: 'group_id',
        key: 'group_id',
        render: (value: string | number | null | undefined) => renderPlanGroupTags(groups, value),
    };
}
