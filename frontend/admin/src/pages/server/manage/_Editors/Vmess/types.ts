import type { ServerRecord } from '../../../../../types/server';

export type UpdateVmessServer = <Field extends keyof ServerRecord>(
    field: Field,
    value: ServerRecord[Field],
) => void;

export type OpenVmessSettings = (title: string, panel: string) => void;
