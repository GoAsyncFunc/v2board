import React from 'react';
import Input from 'antd/lib/input';
import type { PlanRecord } from '@/types/planContracts';

export interface PlanResourceFieldsProps {
    record: PlanRecord;
    onChange: (field: string, value: string) => void;
}

export function PlanResourceFields({
    record,
    onChange,
}: PlanResourceFieldsProps): React.ReactElement {
    // The original markup predates React's htmlFor mapping and emits the raw `for` attribute.
    const legacyLabelProps = { for: 'example-text-input-alt' } as { for: string };
    return (
        <>
            <div className="form-group">
                <label {...legacyLabelProps}>套餐流量</label>
                <Input
                    addonAfter="GB"
                    placeholder="请输入套餐流量"
                    value={record.transfer_enable ?? undefined}
                    onChange={(event) => onChange('transfer_enable', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label {...legacyLabelProps}>设备数限制</label>
                <Input
                    placeholder="留空则不限制"
                    value={record.device_limit ?? undefined}
                    onChange={(event) => onChange('device_limit', event.target.value)}
                />
            </div>
        </>
    );
}
