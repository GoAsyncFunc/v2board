import { post } from '../services/request.js';
import { message } from '../vendor/ui.js';
import moment from '../vendor/dateTime.js';
import { downloadCsv } from '../services/download.js';
const endpoint = action => `/${window.settings.secure_path}/user/${action}`;

export function* generate({ params, callback }, { put }) {
  yield put({ type: 'setState', payload: { generateLoading: true } });
  const response = yield post(endpoint('generate'), params);
  yield put({ type: 'setState', payload: { generateLoading: false } });
  if (response.code !== 200) return;
  if (params.generate_count) downloadCsv(response.buffer, `USER ${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`);
  yield put({ type: 'fetch' });
  if (typeof callback === 'function') callback();
}
export function* dumpCSV(action, { select }) {
  const { filter } = yield select(state => state.user);
  message.loading('导出中');
  const response = yield post(endpoint('dumpCSV'), { filter });
  message.destroy();
  if (response.code !== 200) return;
  downloadCsv(response.buffer, moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
}
