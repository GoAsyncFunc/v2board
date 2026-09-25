import React from 'react';
import Input from 'antd/lib/input';
import type { RuleSettingsValue } from '../../../../../types/serverContracts';

export interface RuleSettingsProps {
    settings?: RuleSettingsValue;
    onChange: (settings: RuleSettingsValue) => void;
}

interface RuleSettingsState {
    settings: RuleSettingsValue;
}

export class RuleSettings extends React.Component<RuleSettingsProps, RuleSettingsState> {
    constructor(props: RuleSettingsProps) {
        super(props);
        const settings =
            props.settings && Object.keys(props.settings).length
                ? props.settings
                : { domain: [], protocol: [] };
        this.state = { settings };
    }

    change(field: 'domain' | 'protocol', value: string): void {
        const settings = { ...this.state.settings, [field]: value.split('\n') };
        this.setState({ settings });
        this.props.onChange(settings);
    }

    render(): React.ReactNode {
        const { domain, protocol } = this.state.settings;
        return (
            <>
                <div className="form-group">
                    <label>域名过滤器</label>
                    <Input.TextArea
                        value={domain?.join('\n')}
                        onChange={(event) => this.change('domain', event.target.value)}
                        rows={5}
                    />
                </div>
                <div className="form-group">
                    <label>协议过滤器</label>
                    <Input.TextArea
                        value={protocol?.join('\n')}
                        onChange={(event) => this.change('protocol', event.target.value)}
                        rows={5}
                    />
                </div>
            </>
        );
    }
}
