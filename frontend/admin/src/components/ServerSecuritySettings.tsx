import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import type { SecuritySettings, SecuritySettingValue } from '../types/server';

export type { SecuritySettings, SecuritySettingValue } from '../types/server';

export interface TlsSettingsProps {
  settings?: SecuritySettings | null;
  tls: string | number;
  certApply?: boolean;
  onChange: (settings: SecuritySettings) => void;
}

export interface EncryptionSettingsProps {
  settings?: SecuritySettings | null;
  onChange: (settings: SecuritySettings) => void;
}

interface SecuritySettingsState {
  settings: SecuritySettings;
}

const DEFAULT_TLS_SETTINGS = {
  server_name: '',
  cert_mode: 'self',
  provider: '',
  dns_env: '',
  reject_unknown_sni: '0',
  allow_insecure: '0',
};

const DEFAULT_ENCRYPTION_SETTINGS = {
  mode: 'native',
  rtt: '0rtt',
  ticket: '600s',
  server_padding: null,
  client_padding: null,
  private_key: null,
  password: null,
};

export class TlsSettings extends React.Component<TlsSettingsProps, SecuritySettingsState> {
  constructor(props: TlsSettingsProps) {
    super(props);
    this.state = {
      settings: props.settings && Object.keys(props.settings).length ? { ...props.settings } : { ...DEFAULT_TLS_SETTINGS },
    };
  }

  change(field: string, value: SecuritySettingValue): void {
    const settings = { ...this.state.settings, [field]: value };
    this.setState({ settings });
    this.props.onChange(settings);
  }

  render() {
    const { settings } = this.state;
    const tlsMode = parseInt(this.props.tls as string, 10);
    const canApplyCertificate = this.props.certApply;
    return <div>
      <div className="form-group"><label>Server Name(SNI)</label><Input value={settings.server_name as string | number | undefined} onChange={event => this.change('server_name', event.target.value)} placeholder={tlsMode === 2 ? 'REALITY必填，与后端保持一致' : ''} /></div>
      {tlsMode === 1 && canApplyCertificate && <div className="form-group"><label>证书模式Cert Mode</label><Select value={settings.cert_mode ?? 'self'} style={{ width: '100%' }} onChange={value => this.change('cert_mode', value)}><Select.Option value="self">自签名</Select.Option><Select.Option value="remote">自签名(面板下发)</Select.Option><Select.Option value="http">HTTP申请</Select.Option><Select.Option value="dns">DNS申请</Select.Option><Select.Option value="none">无证书(关闭TLS)</Select.Option></Select></div>}
      {settings.cert_mode === 'dns' && canApplyCertificate && <div className="form-group"><label>DNS解析提供商Provider <a target="_blank" href="https://go-acme.github.io/lego/dns/index.html" rel="noreferrer">填写参考</a></label><Input value={settings.provider as string | number | undefined} onChange={event => this.change('provider', event.target.value)} placeholder="书写格式cloudflare" /></div>}
      {settings.cert_mode === 'dns' && canApplyCertificate && <div className="form-group"><label>DNS env</label><Input value={settings.dns_env as string | number | undefined} onChange={event => this.change('dns_env', event.target.value)} placeholder="书写格式CF_DNS_API_TOKEN=xxxxxxx如有多条使用逗号,分隔" /></div>}
      {tlsMode === 1 && settings.cert_mode !== 'none' && canApplyCertificate && <><div className="form-group"><label>证书公钥文件地址Cert File Path</label><Input value={settings.cert_file as string | number | undefined} onChange={event => this.change('cert_file', event.target.value)} placeholder="留空在/etc/v2node/目录自动生成" /></div><div className="form-group"><label>证书私钥文件地址Key File Path</label><Input value={settings.key_file as string | number | undefined} onChange={event => this.change('key_file', event.target.value)} placeholder="留空在/etc/v2node/目录自动生成" /></div></>}
      {tlsMode === 1 && settings.cert_mode === 'remote' && canApplyCertificate && <div className="form-group"><label>pinnedPeerCertSha256</label><Input value={settings.pinned_peer_cert_sha256 as string | number | undefined} readOnly style={{ backgroundColor: '#f5f5f5a0', cursor: 'text' }} placeholder="自动生成" /></div>}
      {tlsMode === 2 && <><div className="form-group"><label>Server Address</label><Input value={settings.dest as string | number | undefined} onChange={event => this.change('dest', event.target.value)} placeholder="REALITY目标地址,默认使用SNI" /></div><div className="form-group"><label>Server Port</label><Input value={settings.server_port as string | number | undefined} onChange={event => this.change('server_port', event.target.value)} placeholder="REALITY目标端口,默认443" /></div><div className="form-group"><label>Proxy Protocol</label><Select value={parseInt(settings.xver as string, 10) || 0} style={{ width: '100%' }} onChange={value => this.change('xver', value)}><Select.Option value={0}>0</Select.Option><Select.Option value={1}>1</Select.Option><Select.Option value={2}>2</Select.Option></Select></div><div className="form-group"><label>Private Key</label><Input value={settings.private_key as string | number | undefined} onChange={event => this.change('private_key', event.target.value)} placeholder="留空自动生成" /></div><div className="form-group"><label>Public Key</label><Input value={settings.public_key as string | number | undefined} onChange={event => this.change('public_key', event.target.value)} placeholder="留空自动生成" /></div><div className="form-group"><label>ShortId</label><Input value={settings.short_id as string | number | undefined} onChange={event => this.change('short_id', event.target.value)} placeholder="留空自动生成" /></div></>}
      <div className="form-group"><label>FingerPrint</label><Select value={settings.fingerprint} style={{ width: '100%' }} onChange={value => this.change('fingerprint', value)} placeholder="TLS指纹默认Chrome">{['chrome', 'firefox', 'safari', 'ios', 'android', 'edge', '360', 'qq'].map(value => <Select.Option key={value} value={value}>{value === 'ios' ? 'IOS' : value.charAt(0).toUpperCase() + value.slice(1)}</Select.Option>)}</Select></div>
      {tlsMode === 1 && canApplyCertificate && <div className="form-group"><label>Reject unknown sni</label><div><Switch checked={Boolean(parseInt(settings.reject_unknown_sni as string, 10))} onChange={enabled => this.change('reject_unknown_sni', enabled ? '1' : '0')} /></div></div>}
      <div className="form-group"><label>Allow Insecure</label><div><Switch checked={Boolean(parseInt(settings.allow_insecure as string, 10))} onChange={enabled => this.change('allow_insecure', enabled ? '1' : '0')} /></div></div>
      <div className="form-group"><label>ECH (Encrypted Client Hello)</label><Select value={settings.ech || ''} style={{ width: '100%' }} onChange={value => this.change('ech', value)} placeholder="选择 ECH 模式"><Select.Option value="">无</Select.Option><Select.Option value="cloudflare">Cloudflare</Select.Option><Select.Option value="custom">自定义 SNI</Select.Option></Select></div>
      {settings.ech === 'cloudflare' && <div className="form-group" style={{ background: '#f6ffed', padding: '8px 12px', borderRadius: 4, border: '1px solid #b7eb8f' }}><span style={{ color: '#52c41a' }}>✓ Cloudflare 托管 ECH，密钥由 Cloudflare 自动管理，客户端从 DNS 自动获取配置，服务端无需配置</span></div>}
      {settings.ech === 'custom' && <><div className="form-group"><label>ECH Server Name (伪装域名/外层SNI)</label><Input value={settings.ech_server_name || ''} onChange={event => this.change('ech_server_name', event.target.value)} placeholder="必填" /></div><div className="form-group"><label>ECH Key (服务端私钥)</label><Input value={settings.ech_key || ''} onChange={event => this.change('ech_key', event.target.value)} placeholder="留空自动生成" /></div><div className="form-group"><label>ECH Config (客户端配置)</label><Input value={settings.ech_config || ''} onChange={event => this.change('ech_config', event.target.value)} placeholder="留空自动生成" /></div></>}
    </div>;
  }
}

export class EncryptionSettings extends React.Component<EncryptionSettingsProps, SecuritySettingsState> {
  constructor(props: EncryptionSettingsProps) {
    super(props);
    const settings = props.settings && Object.keys(props.settings).length ? { ...props.settings } : { ...DEFAULT_ENCRYPTION_SETTINGS };
    this.state = { settings };
    props.onChange(settings);
  }

  change(field: string, value: SecuritySettingValue): void {
    const settings = { ...this.state.settings, [field]: value };
    this.setState({ settings });
    this.props.onChange(settings);
  }

  render() {
    const { settings } = this.state;
    return <div>
      <div className="form-group"><label>Mode</label><Select value={settings.mode} style={{ width: '100%' }} onChange={value => this.change('mode', value)}><Select.Option value="native">native</Select.Option><Select.Option value="xorpub">xorpub</Select.Option><Select.Option value="random">random</Select.Option></Select></div>
      <div className="row"><div className="form-group col-md-6 col-xs-12"><label>RTT</label><Select value={settings.rtt} style={{ width: '100%' }} onChange={value => this.change('rtt', value)}><Select.Option value="0rtt">0rtt</Select.Option><Select.Option value="1rtt">1rtt</Select.Option></Select></div>{settings.rtt === '0rtt' && <div className="form-group col-md-6 col-xs-12"><label>Ticket time</label><Input value={settings.ticket as string | number | undefined} onChange={event => this.change('ticket', event.target.value)} placeholder="最长允许时间" /></div>}</div>
      <div className="form-group"><label>Server Padding</label><Input value={settings.server_padding as string | number | undefined} onChange={event => this.change('server_padding', event.target.value)} placeholder="留空使用默认值100-111-1111.75-0-111.50-0-3333" /></div>
      <div className="form-group"><label>Private Key</label><Input value={settings.private_key as string | number | undefined} onChange={event => this.change('private_key', event.target.value)} placeholder="留空自动生成，需抗量子加密请自行替换" /></div>
      <div className="form-group"><label>Client Padding</label><Input value={settings.client_padding as string | number | undefined} onChange={event => this.change('client_padding', event.target.value)} placeholder="留空使用默认值100-111-1111.75-0-111.50-0-3333" /></div>
      <div className="form-group"><label>Password</label><Input value={settings.password as string | number | undefined} onChange={event => this.change('password', event.target.value)} placeholder="留空自动生成，需抗量子加密请自行替换" /></div>
    </div>;
  }
}
