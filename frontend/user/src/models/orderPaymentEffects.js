import { post } from '../services/request.js';
import history from '../vendor/routerHistory.js';
import { a as message } from '../vendor/modules/antdMessage.js';

export function* save({ params }, { put }) {
  yield put({ type: 'setState', payload: { saveLoading: true } });
  const response = yield post('/user/order/save', params);
  yield put({ type: 'setState', payload: { saveLoading: false } });
  if (response.code !== 200) return;
  history.push('/order/' + response.data);
}

export function* checkout({ tradeNo, method }, { put }) {
  yield put({ type: 'setState', payload: { checkoutLoading: true } });
  const response = yield post('/user/order/checkout', { trade_no: tradeNo, method });
  yield put({ type: 'setState', payload: { checkoutLoading: false } });
  if (response.code !== 200) return;
  switch (response.type) {
    case 0:
      yield put({ type: 'setState', payload: { qrcodeModalVisible: true, payUrl: response.data } });
      break;
    case 1:
      window.location.href = response.data;
      message.info('正在前往收银台');
      break;
  }
}

export function* checkoutByStripe({ tradeNo, method, token }, { put }) {
  yield put({ type: 'setState', payload: { checkoutLoading: true } });
  const response = yield post('/user/order/checkout', { trade_no: tradeNo, method, token });
  yield put({ type: 'setState', payload: { checkoutLoading: false } });
  if (response.code !== 200) return;
  message.loading('请稍等，我们正在验证该笔支付', 5);
}

export function* cancel({ tradeNo, complete }, { put }) {
  yield put({ type: 'setState', payload: { cancelLoading: true } });
  const response = yield post('/user/order/cancel', { trade_no: tradeNo });
  yield put({ type: 'setState', payload: { cancelLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'fetch' });
  // Preserve the inherited action spelling; fixing it is a separate behavior change.
  yield put({ type: 'details', tradeNo });
  if (typeof complete === 'function') complete();
}
