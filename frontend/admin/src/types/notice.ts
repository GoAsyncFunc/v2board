export type NoticeTimestamp = number | string | null | undefined;

export interface NoticeRecord {
    id?: string | number;
    title?: string;
    content?: string;
    tags?: string[] | null;
    img_url?: string;
    show?: boolean | number;
    created_at?: NoticeTimestamp;
}

export interface NoticeState {
    notices: NoticeRecord[];
    fetchLoading: boolean;
    saveLoading?: boolean;
}
