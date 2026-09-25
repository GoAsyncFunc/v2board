import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import type {
    EchMode,
    NodeTlsSettings,
    TlsFingerprint,
} from '../../../../../types/serverContracts';

export interface TlsAdvancedSettingsProps {
    settings: NodeTlsSettings;
    tlsMode: number;
    certApply?: boolean;
    onChange: <Field extends keyof NodeTlsSettings>(
        field: Field,
        value: NodeTlsSettings[Field],
    ) => void;
}

type SecurityInputValue = string | number | null | undefined;

const TLS_FINGERPRINTS: TlsFingerprint[] = [
    'chrome',
    'firefox',
    'safari',
    'ios',
    'android',
    'edge',
    '360',
    'qq',
];

function inputValue(value: SecurityInputValue): string | number | undefined {
    return value ?? undefined;
}

function numericSetting(value: SecurityInputValue): number {
    return parseInt(String(value ?? ''), 10) || 0;
}

function fingerprintLabel(fingerprint: TlsFingerprint): string {
    return fingerprint === 'ios'
        ? 'IOS'
        : fingerprint.charAt(0).toUpperCase() + fingerprint.slice(1);
}

function isEchMode(value: string): value is EchMode {
    return value === '' || value === 'cloudflare' || value === 'custom';
}

export function TlsAdvancedSettings({
    settings,
    tlsMode,
    certApply,
    onChange,
}: TlsAdvancedSettingsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>FingerPrint</label>
                <Select
                    value={settings.fingerprint ?? undefined}
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('fingerprint', value)}
                    placeholder="TLS指纹默认Chrome"
                >
                    {TLS_FINGERPRINTS.map((fingerprint) => (
                        <Select.Option key={fingerprint} value={fingerprint}>
                            {fingerprintLabel(fingerprint)}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            {tlsMode === 1 && certApply && (
                <div className="form-group">
                    <label>Reject unknown sni</label>
                    <div>
                        <Switch
                            checked={Boolean(numericSetting(settings.reject_unknown_sni))}
                            onChange={(enabled) =>
                                onChange('reject_unknown_sni', enabled ? '1' : '0')
                            }
                        />
                    </div>
                </div>
            )}

            <div className="form-group">
                <label>Allow Insecure</label>
                <div>
                    <Switch
                        checked={Boolean(numericSetting(settings.allow_insecure))}
                        onChange={(enabled) => onChange('allow_insecure', enabled ? '1' : '0')}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>ECH (Encrypted Client Hello)</label>
                <Select
                    value={settings.ech || ''}
                    style={{ width: '100%' }}
                    onChange={(value) => {
                        if (isEchMode(value)) onChange('ech', value);
                    }}
                    placeholder="选择 ECH 模式"
                >
                    <Select.Option value="">无</Select.Option>
                    <Select.Option value="cloudflare">Cloudflare</Select.Option>
                    <Select.Option value="custom">自定义 SNI</Select.Option>
                </Select>
            </div>

            {settings.ech === 'cloudflare' && (
                <div
                    className="form-group"
                    style={{
                        background: '#f6ffed',
                        padding: '8px 12px',
                        borderRadius: 4,
                        border: '1px solid #b7eb8f',
                    }}
                >
                    <span style={{ color: '#52c41a' }}>
                        ✓ Cloudflare 托管 ECH，密钥由 Cloudflare 自动管理，客户端从 DNS
                        自动获取配置，服务端无需配置
                    </span>
                </div>
            )}

            {settings.ech === 'custom' && (
                <>
                    <div className="form-group">
                        <label>ECH Server Name (伪装域名/外层SNI)</label>
                        <Input
                            value={inputValue(settings.ech_server_name)}
                            onChange={(event) => onChange('ech_server_name', event.target.value)}
                            placeholder="必填"
                        />
                    </div>
                    <div className="form-group">
                        <label>ECH Key (服务端私钥)</label>
                        <Input
                            value={inputValue(settings.ech_key)}
                            onChange={(event) => onChange('ech_key', event.target.value)}
                            placeholder="留空自动生成"
                        />
                    </div>
                    <div className="form-group">
                        <label>ECH Config (客户端配置)</label>
                        <Input
                            value={inputValue(settings.ech_config)}
                            onChange={(event) => onChange('ech_config', event.target.value)}
                            placeholder="留空自动生成"
                        />
                    </div>
                </>
            )}
        </>
    );
}
