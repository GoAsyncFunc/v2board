import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { TlsAdvancedSettings } from './TlsAdvancedSettings';
import type { NodeTlsSettings } from '../../../../../types/server';

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

function numericSetting(value: SecurityInputValue): number {
    return parseInt(String(value ?? ''), 10) || 0;
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

                {tlsMode === 1 && canApplyCertificate && (
                    <div className="form-group">
                        <label>证书模式Cert Mode</label>
                        <Select
                            value={settings.cert_mode ?? 'self'}
                            style={{ width: '100%' }}
                            onChange={(value) => this.change('cert_mode', value)}
                        >
                            <Select.Option value="self">自签名</Select.Option>
                            <Select.Option value="remote">自签名(面板下发)</Select.Option>
                            <Select.Option value="http">HTTP申请</Select.Option>
                            <Select.Option value="dns">DNS申请</Select.Option>
                            <Select.Option value="none">无证书(关闭TLS)</Select.Option>
                        </Select>
                    </div>
                )}

                {settings.cert_mode === 'dns' && canApplyCertificate && (
                    <>
                        <div className="form-group">
                            <label>
                                DNS解析提供商Provider{' '}
                                <a
                                    target="_blank"
                                    href="https://go-acme.github.io/lego/dns/index.html"
                                    rel="noreferrer"
                                >
                                    填写参考
                                </a>
                            </label>
                            <Input
                                value={inputValue(settings.provider)}
                                onChange={(event) => this.change('provider', event.target.value)}
                                placeholder="书写格式cloudflare"
                            />
                        </div>
                        <div className="form-group">
                            <label>DNS env</label>
                            <Input
                                value={inputValue(settings.dns_env)}
                                onChange={(event) => this.change('dns_env', event.target.value)}
                                placeholder="书写格式CF_DNS_API_TOKEN=xxxxxxx如有多条使用逗号,分隔"
                            />
                        </div>
                    </>
                )}

                {tlsMode === 1 && settings.cert_mode !== 'none' && canApplyCertificate && (
                    <>
                        <div className="form-group">
                            <label>证书公钥文件地址Cert File Path</label>
                            <Input
                                value={inputValue(settings.cert_file)}
                                onChange={(event) => this.change('cert_file', event.target.value)}
                                placeholder="留空在/etc/v2node/目录自动生成"
                            />
                        </div>
                        <div className="form-group">
                            <label>证书私钥文件地址Key File Path</label>
                            <Input
                                value={inputValue(settings.key_file)}
                                onChange={(event) => this.change('key_file', event.target.value)}
                                placeholder="留空在/etc/v2node/目录自动生成"
                            />
                        </div>
                    </>
                )}

                {tlsMode === 1 && settings.cert_mode === 'remote' && canApplyCertificate && (
                    <div className="form-group">
                        <label>pinnedPeerCertSha256</label>
                        <Input
                            value={inputValue(settings.pinned_peer_cert_sha256)}
                            readOnly
                            style={{ backgroundColor: '#f5f5f5a0', cursor: 'text' }}
                            placeholder="自动生成"
                        />
                    </div>
                )}

                {tlsMode === 2 && (
                    <>
                        <div className="form-group">
                            <label>Server Address</label>
                            <Input
                                value={inputValue(settings.dest)}
                                onChange={(event) => this.change('dest', event.target.value)}
                                placeholder="REALITY目标地址,默认使用SNI"
                            />
                        </div>
                        <div className="form-group">
                            <label>Server Port</label>
                            <Input
                                value={inputValue(settings.server_port)}
                                onChange={(event) => this.change('server_port', event.target.value)}
                                placeholder="REALITY目标端口,默认443"
                            />
                        </div>
                        <div className="form-group">
                            <label>Proxy Protocol</label>
                            <Select
                                value={numericSetting(settings.xver)}
                                style={{ width: '100%' }}
                                onChange={(value) => this.change('xver', value)}
                            >
                                <Select.Option value={0}>0</Select.Option>
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>Private Key</label>
                            <Input
                                value={inputValue(settings.private_key)}
                                onChange={(event) => this.change('private_key', event.target.value)}
                                placeholder="留空自动生成"
                            />
                        </div>
                        <div className="form-group">
                            <label>Public Key</label>
                            <Input
                                value={inputValue(settings.public_key)}
                                onChange={(event) => this.change('public_key', event.target.value)}
                                placeholder="留空自动生成"
                            />
                        </div>
                        <div className="form-group">
                            <label>ShortId</label>
                            <Input
                                value={inputValue(settings.short_id)}
                                onChange={(event) => this.change('short_id', event.target.value)}
                                placeholder="留空自动生成"
                            />
                        </div>
                    </>
                )}

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
