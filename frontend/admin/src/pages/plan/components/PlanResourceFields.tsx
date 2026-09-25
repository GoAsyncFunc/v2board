import React from 'react';
import Input from 'antd/lib/input';
import type { PlanRecord } from '../../../types/planContracts';

export interface PlanResourceFieldsProps {
    record: PlanRecord;
    onChange: (field: string, value: string) => void;
}

export function PlanResourceFields({
    record,
    onChange,
}: PlanResourceFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>套餐流量</label>
                <Input
                    addonAfter="GB"
                    placeholder="请输入套餐流量"
                    value={record.transfer_enable as string | number | undefined}
                    onChange={(event) => onChange('transfer_enable', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label>设备数限制</label>
                <Input
                    placeholder="留空则不限制"
                    value={record.device_limit as string | number | undefined}
                    onChange={(event) => onChange('device_limit', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label>最大容纳用户量</label>
                <Input
                    placeholder="留空则不限制"
                    value={record.capacity_limit as string | number | undefined}
                    onChange={(event) => onChange('capacity_limit', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label>限速</label>
                <Input
                    addonAfter="Mbps"
                    placeholder="留空则不限制"
                    value={record.speed_limit as string | number | undefined}
                    onChange={(event) => onChange('speed_limit', event.target.value)}
                />
            </div>
        </>
    );
}
