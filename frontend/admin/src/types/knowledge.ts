export type KnowledgeTimestamp = number | string | null | undefined;

export interface KnowledgeRecord {
    [field: string]: string | number | boolean | null | undefined;
    id?: string | number;
    title?: string;
    category?: string;
    language?: string | number;
    body?: string;
    show?: boolean | number;
    updated_at?: KnowledgeTimestamp;
}

export interface KnowledgeState {
    knowledges: KnowledgeRecord[];
    fetchLoading: boolean;
    categorys: string[];
    knowledge: KnowledgeRecord;
    fetchByIdLoading: boolean;
    saveLoading: boolean;
}
