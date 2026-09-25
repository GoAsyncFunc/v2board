import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { EncryptionSecuritySettings } from '../../../../../types/serverContracts';

export interface EncryptionSettingsProps {
    settings?: EncryptionSecuritySettings | null;
    onChange: (settings: EncryptionSecuritySettings) => void;
}

interface EncryptionSettingsState {
    settings: EncryptionSecuritySettings;
}

type SecurityInputValue = string | number | null | undefined;

const DEFAULT_ENCRYPTION_SETTINGS: EncryptionSecuritySettings = {
    mode: 'native',
    rtt: '0rtt',
    ticket: '600s',
    server_padding: null,
    client_padding: null,
    private_key: null,
    password: null,
};

function inputValue(value: SecurityInputValue): string | number | undefined {
    return value ?? undefined;
}

export class EncryptionSettings extends React.Component<
    EncryptionSettingsProps,
    EncryptionSettingsState
> {
    constructor(props: EncryptionSettingsProps) {
        super(props);
        const settings =
            props.settings && Object.keys(props.settings).length
                ? { ...props.settings }
                : { ...DEFAULT_ENCRYPTION_SETTINGS };
        this.state = { settings };
        props.onChange(settings);
    }

    change<Field extends keyof EncryptionSecuritySettings>(
        field: Field,
        value: EncryptionSecuritySettings[Field],
    ): void {
        const settings = { ...this.state.settings, [field]: value };
        this.setState({ settings });
        this.props.onChange(settings);
    }

    render(): React.ReactNode {
        const { settings } = this.state;

        return (
            <div>
                <div className="form-group">
                    <label>Mode</label>
                    <Select
                        value={settings.mode ?? undefined}
                        style={{ width: '100%' }}
                        onChange={(value) => this.change('mode', value)}
                    >
                        <Select.Option value="native">native</Select.Option>
                        <Select.Option value="xorpub">xorpub</Select.Option>
                        <Select.Option value="random">random</Select.Option>
                    </Select>
                </div>

                <div className="row">
                    <div className="form-group col-md-6 col-xs-12">
                        <label>RTT</label>
                        <Select
                            value={settings.rtt ?? undefined}
                            style={{ width: '100%' }}
                            onChange={(value) => this.change('rtt', value)}
                        >
                            <Select.Option value="0rtt">0rtt</Select.Option>
                            <Select.Option value="1rtt">1rtt</Select.Option>
                        </Select>
                    </div>
                    {settings.rtt === '0rtt' && (
                        <div className="form-group col-md-6 col-xs-12">
                            <label>Ticket time</label>
                            <Input
                                value={inputValue(settings.ticket)}
                                onChange={(event) => this.change('ticket', event.target.value)}
                                placeholder="最长允许时间"
                            />
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label>Server Padding</label>
                    <Input
                        value={inputValue(settings.server_padding)}
                        onChange={(event) => this.change('server_padding', event.target.value)}
                        placeholder="留空使用默认值100-111-1111.75-0-111.50-0-3333"
                    />
                </div>
                <div className="form-group">
                    <label>Private Key</label>
                    <Input
                        value={inputValue(settings.private_key)}
                        onChange={(event) => this.change('private_key', event.target.value)}
                        placeholder="留空自动生成，需抗量子加密请自行替换"
                    />
                </div>
                <div className="form-group">
                    <label>Client Padding</label>
                    <Input
                        value={inputValue(settings.client_padding)}
                        onChange={(event) => this.change('client_padding', event.target.value)}
                        placeholder="留空使用默认值100-111-1111.75-0-111.50-0-3333"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Input
                        value={inputValue(settings.password)}
                        onChange={(event) => this.change('password', event.target.value)}
                        placeholder="留空自动生成，需抗量子加密请自行替换"
                    />
                </div>
            </div>
        );
    }
}
