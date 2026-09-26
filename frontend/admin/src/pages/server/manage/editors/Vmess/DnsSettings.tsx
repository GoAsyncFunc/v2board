import React from 'react';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import type { DnsSettingsValue } from '@/types/serverContracts';

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
