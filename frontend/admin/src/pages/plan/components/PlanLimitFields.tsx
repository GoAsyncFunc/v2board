import React from 'react';
import Input from 'antd/lib/input';
import type { PlanRecord } from '@/types/planContracts';

export interface PlanLimitFieldsProps {
    record: PlanRecord;
    onChange: (field: string, value: string) => void;
}

// In the original drawer these two fields sit outside the wrapper div, after the
// access fields, so they are kept as a separate component to preserve that shape.
export function PlanLimitFields({ record, onChange }: PlanLimitFieldsProps): React.ReactElement {
    // The original markup predates React's htmlFor mapping and emits the raw `for` attribute.
    const legacyLabelProps = { for: 'example-text-input-alt' } as { for: string };
    return (
        <>
            <div className="form-group">
                <label {...legacyLabelProps}>最大容纳用户量</label>
                <Input
                    placeholder="留空则不限制"
                    value={record.capacity_limit ?? undefined}
                    onChange={(event) => onChange('capacity_limit', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label {...legacyLabelProps}>限速</label>
                <Input
                    addonAfter="Mbps"
                    placeholder="留空则不限制"
                    value={record.speed_limit ?? undefined}
                    onChange={(event) => onChange('speed_limit', event.target.value)}
                />
            </div>
        </>
    );
}
