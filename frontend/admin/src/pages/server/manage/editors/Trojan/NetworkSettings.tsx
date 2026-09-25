import React from 'react';
import Icon from 'antd/lib/icon';
import JsonEditor from '../../../../../components/common/JsonEditor';
import type { ServerRecord } from '../../../../../types/serverContracts';

export const NETWORK_PRESETS: Record<string, string> = {
    tcp: '',
    ws: JSON.stringify({ path: '/', headers: { Host: 'v2ray.com' } }, null, 4),
    grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
};

export interface TrojanNetworkSettingsProps {
    network?: string | null;
    value?: ServerRecord['network_settings'];
    onChange: (value: string) => void;
    onClose?: () => void;
}

function formatNetworkSettings(value: ServerRecord['network_settings']): string {
    if (typeof value === 'string') return value;
    return value ? JSON.stringify(value, null, 2) : '';
}

export function TrojanNetworkSettings({
    network,
    value,
    onChange,
}: TrojanNetworkSettingsProps): React.ReactElement {
    return (
        <div id="v2ray-protocol">
            <div className="form-group">
                <label>
                    协议详细配置{' '}
                    <a href="https://www.v2ray.com/chapter_02/05_transport.html">
                        <Icon type="link" />
                        参考
                    </a>
                </label>
                <JsonEditor
                    placeholder={NETWORK_PRESETS[network || ''] || ''}
                    mode="json"
                    theme="github"
                    fontSize={14}
                    showPrintMargin
                    showGutter
                    highlightActiveLine
                    value={formatNetworkSettings(value)}
                    onChange={onChange}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </div>
        </div>
    );
}
