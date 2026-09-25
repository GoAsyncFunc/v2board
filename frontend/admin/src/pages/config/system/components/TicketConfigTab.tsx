import React from 'react';
import ConfigRow from './ConfigRow';
import type {
    ConfigChangeHandler,
    TicketConfig,
} from '../../../../types/systemConfigurationContracts';

interface TicketConfigTabProps {
    ticket: TicketConfig;
    onChange: ConfigChangeHandler<TicketConfig>;
}

export default function TicketConfigTab({ ticket, onChange }: TicketConfigTabProps) {
    return (
        <div>
            <ConfigRow title="工单设置" description="请选择工单的状态。">
                <select
                    className="form-control"
                    value={ticket.ticket_status || 0}
                    onChange={(event) => onChange('ticket_status', event.target.value)}
                >
                    <option value={0}>完全开放工单</option>
                    <option value={1}>仅限有付费订单用户</option>
                    <option value={2}>完全禁止工单</option>
                </select>
            </ConfigRow>
        </div>
    );
}
