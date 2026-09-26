import React from 'react';
import Input from 'antd/lib/input';
import Switch from 'antd/lib/switch';
import type { VmessTlsSettings } from '@/types/serverContracts';

export interface VmessTlsSettingsProps {
    settings?: VmessTlsSettings;
    onChange: (settings: VmessTlsSettings) => void;
}

interface VmessTlsSettingsState {
    settings: VmessTlsSettings;
}

export class TlsSettings extends React.Component<VmessTlsSettingsProps, VmessTlsSettingsState> {
    constructor(props: VmessTlsSettingsProps) {
        super(props);
        const settings =
            props.settings && Object.keys(props.settings).length
                ? props.settings
                : { serverName: '', allowInsecure: 0 };
        this.state = { settings };
    }

    change<Field extends keyof VmessTlsSettings>(
        field: Field,
        value: VmessTlsSettings[Field],
    ): void {
        const settings = { ...this.state.settings, [field]: value };
        this.setState({ settings });
        this.props.onChange(settings);
    }

    render(): React.ReactNode {
        const { serverName, allowInsecure } = this.state.settings;
        return (
            <div>
                <div className="form-group">
                    <label>Server Name</label>
                    <Input
                        value={serverName ?? undefined}
                        onChange={(event) => this.change('serverName', event.target.value)}
                        placeholder="不使用请留空"
                    />
                </div>
                <div className="form-group">
                    <label>Allow Insecure</label>
                    <div>
                        <Switch
                            checked={Boolean(parseInt(String(allowInsecure ?? 0), 10))}
                            onChange={(enabled) =>
                                this.change('allowInsecure', enabled ? '1' : '0')
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}
