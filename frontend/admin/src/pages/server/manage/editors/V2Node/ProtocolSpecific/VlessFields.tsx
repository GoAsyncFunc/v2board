import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../../types/serverContracts';
import type { OpenV2NodeSettings, UpdateV2Node } from '../../serverEditorTypes';

export function VlessFields({
    server,
    onChange,
    onOpenSettings,
}: {
    server: ServerRecord;
    onChange: UpdateV2Node;
    onOpenSettings: OpenV2NodeSettings;
}): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>
                    加密方式{' '}
                    {server.encryption && (
                        <a
                            href="javascript:void(0);"
                            onClick={() => onOpenSettings('编辑加密配置', 'encryption_settings')}
                        >
                            编辑配置
                        </a>
                    )}
                </label>
                <Select
                    value={server.encryption ?? ''}
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('encryption', value || null)}
                >
                    <Select.Option value="">无</Select.Option>
                    <Select.Option value="mlkem768x25519plus">MLKEM768X25519PLUS</Select.Option>
                </Select>
            </div>
            <div className="form-group">
                <label>XTLS流控算法</label>
                <Select
                    value={server.flow ?? ''}
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('flow', value || null)}
                >
                    <Select.Option value="">无</Select.Option>
                    <Select.Option value="xtls-rprx-vision">xtls-rprx-vision</Select.Option>
                </Select>
            </div>
        </>
    );
}
