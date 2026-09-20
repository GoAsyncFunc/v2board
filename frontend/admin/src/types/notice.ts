import type { NoticeRecord } from '../components/NoticeDisplayColumns';

export interface NoticeState {
  notices: NoticeRecord[];
  fetchLoading: boolean;
  saveLoading?: boolean;
}
