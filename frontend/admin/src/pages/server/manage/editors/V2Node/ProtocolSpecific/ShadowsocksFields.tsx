import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord } from '@/types/serverContracts';
import type { UpdateV2Node } from '@/pages/server/manage/editors/serverEditorTypes';

const CIPHERS = [
    'aes-128-gcm',
    'aes-192-gcm',
    'aes-256-gcm',
    'chacha20-ietf-poly1305',
    '2022-blake3-aes-128-gcm',
    '2022-blake3-aes-256-gcm',
];

export function ShadowsocksFields({
    server,
    onChange,
}: {
    server: ServerRecord;
    onChange: UpdateV2Node;
}): React.ReactElement {
    return (
        <div className="form-group">
            <label>加密算法</label>
            <Select
                value={server.cipher ?? 'aes-128-gcm'}
                style={{ width: '100%' }}
                onChange={(value) => onChange('cipher', value)}
            >
                {CIPHERS.map((value) => (
                    <Select.Option key={value} value={value}>
                        {value}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
}
