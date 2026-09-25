import React from 'react';
import Icon from 'antd/lib/icon';
import JsonEditor from '../JsonEditor';
import { TlsSettings } from '../Security/TlsSettings';
import { EncryptionSettings } from '../Security/EncryptionSettings';
import type { ChildDrawerState, ServerRecord } from '../../../../../types/serverContracts';
import type { OpenVlessSettings, UpdateVlessServer } from '../serverEditorTypes';

const NETWORK_PRESETS: Record<string, string> = {
    tcp: JSON.stringify(
        {
            header: {
                type: 'http',
                request: { path: ['/'], headers: { Host: ['www.baidu.com', 'www.bing.com'] } },
                response: {},
            },
        },
        null,
        4,
    ),
    ws: JSON.stringify(
        { security: 'auto', path: '/', headers: { Host: 'xtls.github.io' } },
        null,
        4,
    ),
    grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
    kcp: JSON.stringify({ header: { type: 'none' }, seed: '' }, null, 4),
    httpupgrade: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
    xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io', mode: 'auto', extra: {} }, null, 4),
};

export interface VlessChildSettingsPanelProps {
    server: ServerRecord;
    childDrawer: ChildDrawerState;
    onChange: UpdateVlessServer;
    onOpenSettings: OpenVlessSettings;
}

export function VlessChildSettingsPanel({
    server,
    childDrawer,
    onChange,
}: VlessChildSettingsPanelProps): React.ReactElement | null {
    if (childDrawer.type === 'network_settings') {
        const value =
            typeof server.network_settings === 'string'
                ? server.network_settings
                : server.network_settings
                  ? JSON.stringify(server.network_settings, null, 2)
                  : '';
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
                        placeholder={NETWORK_PRESETS[server.network || ''] || ''}
                        mode="json"
                        theme="github"
                        fontSize={14}
                        showPrintMargin
                        showGutter
                        highlightActiveLine
                        value={value}
                        onChange={(nextValue) => onChange('network_settings', nextValue)}
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
    if (childDrawer.type === 'tls_settings') {
        return (
            <TlsSettings
                settings={server.tls_settings}
                tls={server.tls ?? 0}
                onChange={(settings) => onChange('tls_settings', settings)}
            />
        );
    }
    if (childDrawer.type === 'encryption_settings') {
        return (
            <EncryptionSettings
                settings={server.encryption_settings}
                onChange={(settings) => onChange('encryption_settings', settings)}
            />
        );
    }
    return null;
}
