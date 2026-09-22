import React from 'react';
import Select from 'antd/lib/select';
import PermissionGroupEditor from '../../../components/common/PermissionGroupEditor';
import NullableSelectOption from '../../../components/common/NullableSelectOption';
import type { PlanRecord } from '../../../types/plan';

interface ServerGroup {
    id: number | string;
    name?: React.ReactNode;
}

export interface PlanAccessFieldsProps {
    record: PlanRecord;
    groups: ServerGroup[];
    onChange: (field: string, value: number | string | null | undefined) => void;
}

export function PlanAccessFields({
    record,
    groups,
    onChange,
}: PlanAccessFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>
                    权限组{' '}
                    <PermissionGroupEditor>
                        <a href="javascript:void(0);">添加权限组</a>
                    </PermissionGroupEditor>
                </label>
                <Select
                    placeholder="请选择权限组"
                    style={{ width: '100%' }}
                    value={record.group_id}
                    onChange={(groupId) => onChange('group_id', groupId)}
                >
                    {groups.map((group) => (
                        <Select.Option key={group.id} value={group.id}>
                            {group.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="form-group">
                <label>流量重置方式</label>
                <Select
                    placeholder="请选择权限组"
                    style={{ width: '100%' }}
                    value={record.reset_traffic_method}
                    onChange={(method) => onChange('reset_traffic_method', method)}
                >
                    <NullableSelectOption value={null}>跟随系统设置</NullableSelectOption>
                    <Select.Option value={0}>每月1号</Select.Option>
                    <Select.Option value={1}>按月重置</Select.Option>
                    <Select.Option value={2}>不重置</Select.Option>
                    <Select.Option value={3}>每年1月1日</Select.Option>
                    <Select.Option value={4}>按年重置</Select.Option>
                </Select>
            </div>
        </>
    );
}
