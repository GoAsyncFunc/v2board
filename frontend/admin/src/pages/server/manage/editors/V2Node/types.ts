import type { ServerRecord } from '../../../../../types/server';

export type UpdateV2Node = <Field extends keyof ServerRecord>(
    field: Field,
    value: ServerRecord[Field],
) => void;

export type V2NodeSettingsPanel =
    'network_settings' | 'tls_settings' | 'encryption_settings' | 'padding_scheme';

export type OpenV2NodeSettings = (title: string, panel: V2NodeSettingsPanel) => void;
