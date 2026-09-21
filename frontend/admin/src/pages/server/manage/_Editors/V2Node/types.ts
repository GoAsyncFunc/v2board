import type { ServerRecord } from '../../../../../types/server';

export type UpdateV2Node = <Field extends keyof ServerRecord>(
    field: Field,
    value: ServerRecord[Field],
) => void;
