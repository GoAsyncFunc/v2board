import React from 'react';
import Input from 'antd/lib/input';
import type { PlanRecord } from '../../../types/planContracts';

export interface PlanBasicFieldsProps {
    record: PlanRecord;
    onChange: (field: string, value: string) => void;
}

export function PlanBasicFields({ record, onChange }: PlanBasicFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>套餐名称</label>
                <Input
                    placeholder="请输入套餐名称"
                    value={record.name ?? undefined}
                    onChange={(event) => onChange('name', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label>套餐描述</label>
                <Input.TextArea
                    rows={4}
                    value={record.content ?? undefined}
                    placeholder="请输入套餐描述，支持HTML"
                    onChange={(event) => onChange('content', event.target.value)}
                />
            </div>
        </>
    );
}
