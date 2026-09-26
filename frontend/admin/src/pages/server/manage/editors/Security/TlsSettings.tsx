import React from 'react';
import Input from 'antd/lib/input';
import { TlsAdvancedSettings } from './TlsAdvancedSettings';
import { TlsCertificateSettings } from './TlsCertificateSettings';
import { TlsRealitySettings } from './TlsRealitySettings';
import type { NodeTlsSettings } from '@/types/serverContracts';

export interface TlsSettingsProps {
    settings?: NodeTlsSettings | null;
    tls: string | number;
    certApply?: boolean;
    onChange: (settings: NodeTlsSettings) => void;
}

interface TlsSettingsState {
    settings: NodeTlsSettings;
}

type SecurityInputValue = string | number | null | undefined;

const DEFAULT_TLS_SETTINGS: NodeTlsSettings = {
    server_name: '',
    cert_mode: 'self',
    provider: '',
    dns_env: '',
    reject_unknown_sni: '0',
    allow_insecure: '0',
};

function inputValue(value: SecurityInputValue): string | number | undefined {
    return value ?? undefined;
}

export class TlsSettings extends React.Component<TlsSettingsProps, TlsSettingsState> {
    constructor(props: TlsSettingsProps) {
        super(props);
        this.state = {
            settings:
                props.settings && Object.keys(props.settings).length
                    ? { ...props.settings }
                    : { ...DEFAULT_TLS_SETTINGS },
        };
    }

    change<Field extends keyof NodeTlsSettings>(field: Field, value: NodeTlsSettings[Field]): void {
        const settings = { ...this.state.settings, [field]: value };
        this.setState({ settings });
        this.props.onChange(settings);
    }

    render(): React.ReactNode {
        const { settings } = this.state;
        const tlsMode = parseInt(String(this.props.tls), 10);
        const canApplyCertificate = this.props.certApply;

        return (
            <div>
                <div className="form-group">
                    <label>Server Name(SNI)</label>
                    <Input
                        value={inputValue(settings.server_name)}
                        onChange={(event) => this.change('server_name', event.target.value)}
                        placeholder={tlsMode === 2 ? 'REALITY必填，与后端保持一致' : ''}
                    />
                </div>

                <TlsCertificateSettings
                    settings={settings}
                    tlsMode={tlsMode}
                    certApply={canApplyCertificate}
                    onChange={(field, value) => this.change(field, value)}
                />
                <TlsRealitySettings
                    settings={settings}
                    tlsMode={tlsMode}
                    onChange={(field, value) => this.change(field, value)}
                />

                <TlsAdvancedSettings
                    settings={settings}
                    tlsMode={tlsMode}
                    certApply={canApplyCertificate}
                    onChange={(field, value) => this.change(field, value)}
                />
            </div>
        );
    }
}
