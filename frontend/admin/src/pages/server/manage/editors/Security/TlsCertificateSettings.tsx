import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { NodeTlsSettings } from '../../../../../types/server';

type SecurityInputValue = string | number | null | undefined;

export interface TlsCertificateSettingsProps {
    settings: NodeTlsSettings;
    tlsMode: number;
    certApply?: boolean;
    onChange: <Field extends keyof NodeTlsSettings>(
        field: Field,
        value: NodeTlsSettings[Field],
    ) => void;
}

function inputValue(value: SecurityInputValue): string | number | undefined {
    return value ?? undefined;
}

export function TlsCertificateSettings({
    settings,
    tlsMode,
    certApply,
    onChange,
}: TlsCertificateSettingsProps): React.ReactElement {
    return (
        <>
            {tlsMode === 1 && certApply && (
                <div className="form-group">
                    <label>证书模式Cert Mode</label>
                    <Select
                        value={settings.cert_mode ?? 'self'}
                        style={{ width: '100%' }}
                        onChange={(value) => onChange('cert_mode', value)}
                    >
                        <Select.Option value="self">自签名</Select.Option>
                        <Select.Option value="remote">自签名(面板下发)</Select.Option>
                        <Select.Option value="http">HTTP申请</Select.Option>
                        <Select.Option value="dns">DNS申请</Select.Option>
                        <Select.Option value="none">无证书(关闭TLS)</Select.Option>
                    </Select>
                </div>
            )}

            {settings.cert_mode === 'dns' && certApply && (
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
                            onChange={(event) => onChange('provider', event.target.value)}
                            placeholder="书写格式cloudflare"
                        />
                    </div>
                    <div className="form-group">
                        <label>DNS env</label>
                        <Input
                            value={inputValue(settings.dns_env)}
                            onChange={(event) => onChange('dns_env', event.target.value)}
                            placeholder="书写格式CF_DNS_API_TOKEN=xxxxxxx如有多条使用逗号,分隔"
                        />
                    </div>
                </>
            )}

            {tlsMode === 1 && settings.cert_mode !== 'none' && certApply && (
                <>
                    <div className="form-group">
                        <label>证书公钥文件地址Cert File Path</label>
                        <Input
                            value={inputValue(settings.cert_file)}
                            onChange={(event) => onChange('cert_file', event.target.value)}
                            placeholder="留空在/etc/v2node/目录自动生成"
                        />
                    </div>
                    <div className="form-group">
                        <label>证书私钥文件地址Key File Path</label>
                        <Input
                            value={inputValue(settings.key_file)}
                            onChange={(event) => onChange('key_file', event.target.value)}
                            placeholder="留空在/etc/v2node/目录自动生成"
                        />
                    </div>
                </>
            )}

            {tlsMode === 1 && settings.cert_mode === 'remote' && certApply && (
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
        </>
    );
}
