import React from 'react';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import type { RadioChangeEvent } from 'antd/lib/radio/interface';
import type { TicketFilterState } from '../../../types/ticketContracts';

interface TicketToolbarProps {
    filter: TicketFilterState;
    onStatusChange: (status: TicketFilterState['status']) => void;
    onEmailSearch: (email: string) => void;
}

export default function TicketToolbar({
    filter,
    onStatusChange,
    onEmailSearch,
}: TicketToolbarProps): React.ReactElement {
    return (
        <div className="p-3">
            <Radio.Group
                value={filter.status}
                onChange={(event: RadioChangeEvent) => onStatusChange(event.target.value)}
            >
                <Radio.Button value={0}>已开启</Radio.Button>
                <Radio.Button value={1}>已关闭</Radio.Button>
            </Radio.Group>
            <div style={{ float: 'right' }}>
                <Input
                    placeholder="输入邮箱搜索"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onEmailSearch(event.target.value)
                    }
                />
            </div>
        </div>
    );
}
