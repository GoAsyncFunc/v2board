import type { ServerRecord } from '../../../../types/serverContracts';

export type UpdateV2Node = <Field extends keyof ServerRecord>(
    field: Field,
    value: ServerRecord[Field],
) => void;

export type V2NodeSettingsPanel =
    'network_settings' | 'tls_settings' | 'encryption_settings' | 'padding_scheme';

export type OpenV2NodeSettings = (title: string, panel: V2NodeSettingsPanel) => void;

export type UpdateVlessServer = <Field extends keyof ServerRecord>(
    field: Field,
    value: ServerRecord[Field],
) => void;

export type OpenVlessSettings = (title: string, panel: string) => void;

export type UpdateVmessServer = <Field extends keyof ServerRecord>(
    field: Field,
    value: ServerRecord[Field],
) => void;

export type OpenVmessSettings = (title: string, panel: string) => void;
