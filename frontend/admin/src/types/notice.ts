import type { NoticeRecord } from '../components/content/NoticeDisplayColumns';

export interface NoticeState {
  notices: NoticeRecord[];
  fetchLoading: boolean;
  saveLoading?: boolean;
}
