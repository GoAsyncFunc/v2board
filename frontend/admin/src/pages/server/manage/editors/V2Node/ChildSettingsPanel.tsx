import React from 'react';
import JsonEditor from '@/pages/server/manage/editors/JsonEditor';
import { TlsSettings } from '@/pages/server/manage/editors/Security/TlsSettings';
import { EncryptionSettings } from '@/pages/server/manage/editors/Security/EncryptionSettings';
import type { ChildDrawerState, ServerRecord } from '@/types/serverContracts';
import type { UpdateV2Node } from '@/pages/server/manage/editors/serverEditorTypes';
import { formatServerJsonEditorValue } from '@/pages/server/manage/editors/serverJsonEditorValues';

const NETWORK_PRESETS: Record<string, string> = {
    tcp: JSON.stringify(
        {
            acceptProxyProtocol: false,
            header: {
                type: 'http',
                request: { path: ['/'], headers: { Host: ['www.baidu.com', 'www.bing.com'] } },
                response: {},
            },
        },
        null,
        4,
    ),
    http: JSON.stringify(
        { acceptProxyProtocol: false, path: '/', Host: 'xtls.github.io' },
        null,
        4,
    ),
    ws: JSON.stringify(
        { acceptProxyProtocol: false, path: '/', headers: { Host: 'xtls.github.io' } },
        null,
        4,
    ),
    grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
    httpupgrade: JSON.stringify(
        { acceptProxyProtocol: false, path: '/', host: 'xtls.github.io' },
        null,
        4,
    ),
    xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io', mode: 'auto', extra: {} }, null, 4),
};

const DEFAULT_PADDING_SCHEME = JSON.stringify(
    [
        'stop=8',
        '0=30-30',
        '1=100-400',
        '2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000',
        '3=9-9,500-1000',
        '4=500-1000',
        '5=500-1000',
        '6=500-1000',
        '7=500-1000',
    ],
    null,
    4,
);

export interface V2NodeChildSettingsPanelProps {
    server: ServerRecord;
    childDrawer: ChildDrawerState;
    onChange: UpdateV2Node;
}

function JsonSettingsEditor({
    value,
    placeholder,
    field,
    id,
    onChange,
}: {
    value: ServerRecord['network_settings'] | ServerRecord['padding_scheme'];
    placeholder: string;
    field: 'network_settings' | 'padding_scheme';
    id: string;
    onChange: UpdateV2Node;
}): React.ReactElement {
    const editorValue = formatServerJsonEditorValue(value);
    return (
        <div id={id}>
            <div className="form-group">
                <JsonEditor
                    placeholder={placeholder}
                    mode="json"
                    theme="github"
                    fontSize={14}
                    showPrintMargin
                    showGutter
                    highlightActiveLine
                    value={editorValue}
                    onChange={(nextValue) => onChange(field, nextValue)}
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

export function V2NodeChildSettingsPanel({
    server,
    childDrawer,
    onChange,
}: V2NodeChildSettingsPanelProps): React.ReactElement | null {
    if (childDrawer.type === 'network_settings') {
        return (
            <JsonSettingsEditor
                value={server.network_settings}
                placeholder={NETWORK_PRESETS[server.network || ''] || ''}
                field="network_settings"
                id="v2ray-protocol"
                onChange={onChange}
            />
        );
    }
    if (childDrawer.type === 'tls_settings') {
        return (
            <TlsSettings
                settings={server.tls_settings}
                tls={server.tls ?? 0}
                certApply
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
    if (childDrawer.type === 'padding_scheme') {
        return (
            <JsonSettingsEditor
                value={server.padding_scheme}
                placeholder={DEFAULT_PADDING_SCHEME}
                field="padding_scheme"
                id="anytls-padding-scheme"
                onChange={onChange}
            />
        );
    }
    return null;
}
