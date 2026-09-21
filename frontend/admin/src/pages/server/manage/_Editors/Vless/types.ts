import type { ServerRecord } from '../../../../../types/server';

export type UpdateVlessServer = <Field extends keyof ServerRecord>(
    field: Field,
    value: ServerRecord[Field],
) => void;

export type OpenVlessSettings = (title: string, panel: string) => void;
