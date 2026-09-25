import React from 'react';
import Badge from 'antd/lib/badge';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import { formatDateTime } from '../../../utils/dateTimeFormatter';
import type { UserTimestamp } from '../../../types/userContracts';

export type { UserTimestamp } from '../../../types/userContracts';

export interface UserListRecord {
    email?: string | null;
    t?: UserTimestamp;
}

export function formatUserLastOnline(lastSeen: UserTimestamp): string {
    return lastSeen ? `最后在线${formatDateTime(lastSeen, 'YYYY-MM-DD HH:mm:ss')}` : '从未在线';
}

export function renderUserOnlineStatus(lastSeen: UserTimestamp): 'default' | 'success' {
    return new Date().getTime() / 1e3 - 600 > Number(lastSeen) ? 'default' : 'success';
}

// Readonly email/online column; no sorter, filter or event handlers.
export function createUserEmailColumn<
    RecordType extends UserListRecord = UserListRecord,
>(): ColumnProps<RecordType> {
    return {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render: (email: string | null | undefined, record) => (
            <Tooltip placement="top" title={formatUserLastOnline(record.t)}>
                <Badge status={renderUserOnlineStatus(record.t)} />
                {email}
            </Tooltip>
        ),
    };
}
