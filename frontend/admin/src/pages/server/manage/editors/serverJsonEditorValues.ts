import type { ServerRecord } from '@/types/serverContracts';

export type ServerJsonEditorValue =
    ServerRecord['network_settings'] | ServerRecord['padding_scheme'];

export function formatServerJsonEditorValue(value: ServerJsonEditorValue): string {
    if (typeof value === 'string') return value;
    return value ? JSON.stringify(value, null, 2) : '';
}

export function prepareServerJsonRequestValue(
    value: ServerJsonEditorValue,
): ServerRecord['network_settings'] {
    if (!value) return null;
    return typeof value === 'string'
        ? (JSON.parse(value) as ServerRecord['network_settings'])
        : value;
}

export function formatServerJsonStateValue<T extends ServerJsonEditorValue>(value: T): T | string {
    if (typeof value === 'string' || !value) return value;
    return JSON.stringify(value, null, 2);
}
