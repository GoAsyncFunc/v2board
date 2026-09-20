import message from 'antd/lib/message';
import moment from 'moment';
import { isSuccessfulResponse, post, type ApiResponse, type FormRecord } from '../services/request';
import { downloadCsv } from '../services/download';
import type { UserModuleState } from '../types/user';
import type { AdminAction, AdminRootState } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/effects';

type UserRootState = Pick<AdminRootState, 'user'>;
interface UserTools extends ModelEffectTools<UserRootState> {}
interface GenerateAction { params: FormRecord; callback?: () => void; }
type ExportResponse = ApiResponse & { buffer?: BlobPart };
type UserYield = UserModuleState | ApiResponse;
type UserEffect = ModelEffect<UserYield>;
const endpoint = (action: string): string => `/${window.settings.secure_path}/user/${action}`;

export function* generate({ params, callback }: GenerateAction, { put }: UserTools): UserEffect {
  yield put({ type: 'setState', payload: { generateLoading: true } });
  const response = (yield post(endpoint('generate'), params)) as ExportResponse;
  yield put({ type: 'setState', payload: { generateLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  if (params.generate_count) downloadCsv(response.buffer as BlobPart, `USER ${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`);
  yield put({ type: 'fetch' });
  if (typeof callback === 'function') callback();
}
export function* dumpCSV(_: AdminAction, { select }: UserTools): UserEffect {
  const { filter } = (yield select(state => state.user)) as UserModuleState;
  message.loading('导出中');
  const response = (yield post(endpoint('dumpCSV'), { filter })) as ExportResponse;
  message.destroy();
  if (!isSuccessfulResponse(response)) return;
  downloadCsv(response.buffer as BlobPart, moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
}
