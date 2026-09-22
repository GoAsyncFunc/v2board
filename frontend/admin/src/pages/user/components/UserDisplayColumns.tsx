import React from 'react';
import Badge from 'antd/lib/badge';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import moment from 'moment';
import type { UserGroupOption, UserRecord } from '../../../types/user';

export type UserTimestamp = number | string | null | undefined;

export interface UserListRecord {
    email?: string | null;
    t?: UserTimestamp;
}

export function formatUserLastOnline(lastSeen: UserTimestamp): string {
    return lastSeen
        ? `最后在线${moment(1000 * (lastSeen as number)).format('YYYY-MM-DD HH:mm:ss')}`
        : '从未在线';
}

export function renderUserOnlineStatus(lastSeen: UserTimestamp): 'default' | 'success' {
    return new Date().getTime() / 1e3 - 600 > (lastSeen as number) ? 'default' : 'success';
}

// Readonly email/online column; no sorter, filter or event handlers.
export function createReadonlyUserEmailColumn<
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
