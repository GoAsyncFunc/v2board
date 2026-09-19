import type React from 'react';
import type { AdminDispatch } from './store';

export type ServerId = string | number;
export type Scalar = string | number | null;

export interface ServerGroupOption {
  id: number;
  name: string;
}

export interface ServerRouteOption {
  id: ServerId;
  remarks?: string;
}

export interface ServerRecord {
  id?: ServerId;
  type?: string;
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
  network_settings?: string | Record<string, unknown> | null;
  networkSettings?: string | Record<string, unknown> | null;
  tls?: Scalar;
  insecure?: Scalar;
  allow_insecure?: Scalar;
  server_name?: string;
  protocol?: string;
  cipher?: string;
  flow?: string | null;
  encryption?: string | null;
  encryption_settings?: Record<string, unknown>;
  tls_settings?: Record<string, unknown>;
  tlsSettings?: Record<string, unknown>;
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
  [key: string]: unknown;
}

export interface ManagedServerRecord extends ServerRecord {
  id: ServerId;
  type: string;
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

export interface ServerGroupState { groups: ServerGroupOption[]; }
export interface ServerRouteState { routes: ServerRouteOption[]; }
export interface ServerSaveState { saveLoading: boolean; }

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
