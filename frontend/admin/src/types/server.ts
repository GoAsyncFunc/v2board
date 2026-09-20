import type React from 'react';
import type { AdminDispatch } from './store';

export type ServerId = string | number;
export type Scalar = string | number | null;
export type ServerProtocolType =
    'shadowsocks' | 'vmess' | 'trojan' | 'hysteria' | 'tuic' | 'vless' | 'anytls' | 'v2node';
export type ServerJsonValue =
    string | number | boolean | null | ServerJsonValue[] | { [key: string]: ServerJsonValue };

export type CertificateMode = 'self' | 'remote' | 'http' | 'dns' | 'none';
export type TlsFingerprint =
    'chrome' | 'firefox' | 'safari' | 'ios' | 'android' | 'edge' | '360' | 'qq';
export type EchMode = '' | 'cloudflare' | 'custom';
export type EncryptionMode = 'native' | 'xorpub' | 'random';
export type EncryptionRoundTripMode = '0rtt' | '1rtt';

export interface NodeTlsSettings {
    server_name?: string | number | null;
    cert_mode?: CertificateMode | null;
    provider?: string | number | null;
    dns_env?: string | number | null;
    reject_unknown_sni?: string | number | null;
    allow_insecure?: string | number | null;
    cert_file?: string | number | null;
    key_file?: string | number | null;
    pinned_peer_cert_sha256?: string | number | null;
    dest?: string | number | null;
    server_port?: string | number | null;
    xver?: string | number | null;
    private_key?: string | number | null;
    public_key?: string | number | null;
    short_id?: string | number | null;
    fingerprint?: TlsFingerprint | null;
    ech?: EchMode | null;
    ech_server_name?: string | number | null;
    ech_key?: string | number | null;
    ech_config?: string | number | null;
}

export interface EncryptionSecuritySettings {
    mode?: EncryptionMode | null;
    rtt?: EncryptionRoundTripMode | null;
    ticket?: string | number | null;
    server_padding?: string | number | null;
    client_padding?: string | number | null;
    private_key?: string | number | null;
    password?: string | number | null;
}

export interface VmessTlsSettings {
    serverName?: string | number | null;
    allowInsecure?: string | number | null;
}

export interface ServerGroupOption {
    id: number;
    name: string;
    user_count?: LegacyDisplayValue;
    server_count?: LegacyDisplayValue;
}

export type LegacyDisplayValue =
    React.ReactNode | Readonly<Record<string, React.ReactNode>> | symbol;

export interface ServerRouteOption {
    id: ServerId;
    remarks?: string;
}

export interface ServerRecord {
    id?: ServerId;
    type?: ServerProtocolType;
    name?: string;
    host?: string;
    port?: Scalar;
    server_port?: Scalar;
    parent_id?: ServerId | null;
    rate?: Scalar;
    show?: Scalar;
    online?: number;
    available_status?: PropertyKey;
    tags?: string[] | null;
    group_id?: Array<string | number>;
    route_id?: ServerId[] | null;
    network?: string;
    network_settings?: string | Record<string, ServerJsonValue> | null;
    networkSettings?: string | Record<string, ServerJsonValue> | null;
    tls?: Scalar;
    insecure?: Scalar;
    allow_insecure?: Scalar;
    server_name?: string;
    protocol?: string;
    cipher?: string;
    flow?: string | null;
    encryption?: string | null;
    encryption_settings?: EncryptionSecuritySettings;
    tls_settings?: NodeTlsSettings;
    tlsSettings?: VmessTlsSettings;
    ruleSettings?: RuleSettingsValue;
    dnsSettings?: DnsSettingsValue;
    obfs?: string | null;
    obfs_password?: string;
    obfs_settings?: { path?: string; host?: string };
    padding_scheme?: string;
    version?: Scalar;
    up_mbps?: Scalar;
    down_mbps?: Scalar;
    disable_sni?: Scalar;
    udp_relay_mode?: string;
    congestion_control?: string;
    zero_rtt_handshake?: Scalar;
    trusted_x_forwarded_for?: string[] | null;
    listen_ip?: string;
    install_command?: string;
}

export interface ManagedServerRecord extends ServerRecord {
    id: ServerId;
    type: ServerProtocolType;
    name: string;
    host: string;
    port: Scalar;
    online: number;
    available_status: PropertyKey;
    group_id: Array<string | number>;
}

export interface ServerManageState {
    servers: ManagedServerRecord[];
    fetchLoading: boolean;
    sortMode: boolean;
}

export interface ServerProtocolState {
    switchLoading: Record<string, boolean>;
    saveLoading: boolean;
}

export interface ServerGroupState {
    groups: ServerGroupOption[];
    switchLoading: Record<string, boolean>;
    saveLoading: boolean;
    fetchLoading: boolean;
}

export interface ServerRouteState {
    routes: ServerRouteOption[];
    saveLoading: boolean;
    fetchLoading: boolean;
}
export interface ServerSaveState {
    saveLoading: boolean;
}

export interface ServerEditorProps {
    children: React.ReactElement;
    dispatch: AdminDispatch;
    record?: ServerRecord;
    serverGroup: ServerGroupState;
    serverManage: ServerManageState;
    serverRoute: ServerRouteState;
}

export interface DnsServerValue {
    address: string;
    port: number;
    domains: string[];
    expectIPs: string[];
}

export interface DnsSettingsValue {
    servers: DnsServerValue[];
    hosts: Record<string, string>;
}

export interface RuleSettingsValue {
    domain: string[];
    protocol: string[];
}

export interface ChildDrawerState {
    visible: boolean;
    title: string;
    type?: string;
}
