import React from 'react';
import Icon from 'antd/lib/icon';
import JsonEditor from '@/pages/server/manage/editors/JsonEditor';
import { DnsSettings } from './DnsSettings';
import { RuleSettings } from './RuleSettings';
import { TlsSettings } from './TlsSettings';
import type { ChildDrawerState, ServerRecord } from '@/types/serverContracts';
import { formatServerJsonEditorValue } from '@/pages/server/manage/editors/serverJsonEditorValues';

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
    ws: JSON.stringify({ path: '/', headers: { Host: 'v2ray.com' } }, null, 4),
    grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
    kcp: JSON.stringify({ header: { type: 'none' }, seed: '' }, null, 4),
    httpupgrade: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
    xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
};

export interface VmessChildSettingsPanelProps {
    server: ServerRecord;
    childDrawer: ChildDrawerState;
    onChange: <Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]) => void;
}

export function VmessChildSettingsPanel({
    server,
    childDrawer,
    onChange,
}: VmessChildSettingsPanelProps): React.ReactElement | null {
    if (childDrawer.type === 'networkSettings') {
        const value = formatServerJsonEditorValue(server.networkSettings);
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
                        onChange={(nextValue) => onChange('networkSettings', nextValue)}
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
    if (childDrawer.type === 'ruleSettings') {
        return (
            <RuleSettings
                settings={server.ruleSettings}
                onChange={(settings) => onChange('ruleSettings', settings)}
            />
        );
    }
    if (childDrawer.type === 'tlsSettings') {
        return (
            <TlsSettings
                settings={server.tlsSettings}
                onChange={(settings) => onChange('tlsSettings', settings)}
            />
        );
    }
    if (childDrawer.type === 'dnsSettings') {
        return (
            <DnsSettings
                settings={server.dnsSettings}
                onChange={(settings) => onChange('dnsSettings', settings)}
            />
        );
    }
    return null;
}
