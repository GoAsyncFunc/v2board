import React from 'react';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Switch from 'antd/lib/switch';
import type {
    DnsSettingsValue,
    RuleSettingsValue,
    VmessTlsSettings,
} from '../../../../../types/server';

export interface DnsSettingsProps {
    settings?: DnsSettingsValue;
    onChange: (settings: DnsSettingsValue) => void;
}

interface DnsSettingsState {
    settings: DnsSettingsValue;
}

export class DnsSettings extends React.Component<DnsSettingsProps, DnsSettingsState> {
    constructor(props: DnsSettingsProps) {
        super(props);
        this.state = { settings: props.settings || { servers: [], hosts: {} } };
    }

    commit(settings: DnsSettingsValue): void {
        this.setState({ settings }, () => this.props.onChange(this.state.settings));
    }

    addServer(): void {
        this.commit({
            ...this.state.settings,
            servers: [
                ...this.state.settings.servers,
                { address: '', port: 53, domains: [], expectIPs: [] },
            ],
        });
    }

    dropServer(index: number): void {
        this.commit({
            ...this.state.settings,
            servers: this.state.settings.servers.filter(
                (server, serverIndex) => serverIndex !== index,
            ),
        });
    }

    changeServer(
        index: number,
        field: 'address' | 'port' | 'domains',
        value: string | number,
    ): void {
        const servers = this.state.settings.servers.map((server, serverIndex) => {
            if (serverIndex !== index) return server;
            if (field === 'domains') return { ...server, domains: String(value).split('\n') };
            if (field === 'port') return { ...server, port: Number(value) };
            return { ...server, address: String(value) };
        });
        this.commit({ ...this.state.settings, servers });
    }

    render(): React.ReactNode {
        return (
            <div className="form-group">
                <label>DNS服务器表</label>
                {this.state.settings.servers.map((server, index) => (
                    <div key={`${server.address}-${index}`}>
                        <div className="row">
                            <Divider type="horizontal">
                                {server.address || `服务器组${index + 1}`}{' '}
                                <Icon
                                    type="delete"
                                    style={{ color: '#ff4d4f' }}
                                    onClick={() => this.dropServer(index)}
                                />
                            </Divider>
                            <div className="form-group col-md-9 col-xs-12">
                                <label>DNS服务器地址</label>
                                <Input
                                    placeholder="请输入DNS服务器地址"
                                    value={server.address}
                                    onChange={(event) =>
                                        this.changeServer(index, 'address', event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group col-md-3 col-xs-12">
                                <label>端口</label>
                                <Input
                                    type="number"
                                    placeholder="端口"
                                    value={server.port}
                                    onChange={(event) =>
                                        this.changeServer(
                                            index,
                                            'port',
                                            parseInt(event.target.value, 10),
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>域名</label>
                            <Input.TextArea
                                rows={5}
                                value={server.domains?.join('\n')}
                                placeholder="域名列表，此列表包含的域名，将优先使用此服务器进行查询。一行一条"
                                onChange={(event) =>
                                    this.changeServer(index, 'domains', event.target.value)
                                }
                            />
                        </div>
                    </div>
                ))}
                <Button type="primary" style={{ width: '100%' }} onClick={() => this.addServer()}>
                    添加
                </Button>
            </div>
        );
    }
}

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
