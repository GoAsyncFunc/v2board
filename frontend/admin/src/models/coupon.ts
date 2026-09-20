import dayjs from 'moment';
import { get, isSuccessfulResponse, post, type ApiResponse } from '../services/request';
import type { CouponRecord, CouponState, PromotionPagination, PromotionSort } from '../types/promotion';
import type { AdminAction, AdminRootState } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/effects';

type CouponRootState = Pick<AdminRootState, 'coupon'>;
interface CouponTools extends ModelEffectTools<CouponRootState> {}
interface CouponGenerateAction { params: CouponRecord; callback?: () => void; }
interface CouponIdAction { id?: string | number; }
interface CouponTableAction { pagination: Partial<PromotionPagination>; sort: PromotionSort; }
type CouponResponse = ApiResponse<CouponRecord[]>;
type CouponGenerateResponse = ApiResponse & { buffer?: BlobPart };
type CouponYield = CouponState | ApiResponse;
type CouponEffect = ModelEffect<CouponYield>;

const initialState: CouponState = {
  coupons: [], fetchLoading: false, saveLoading: false,
  pagination: { pageSize: 10, current: 1 }, sort: {},
};

function downloadCouponCsv(buffer: BlobPart): void {
  const blob = new Blob([buffer], { type: 'text/plain,charset=UTF-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.style.display = 'none';
  link.download = `COUPON ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
}

export default {
  name: 'coupon', state: { ...initialState },
  reducers: {
    setState(state: CouponState, { payload }: { payload: Partial<CouponState> }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_: AdminAction, { put, select }: CouponTools): CouponEffect {
      const couponState = (yield select(state => state.coupon)) as CouponState;
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = (yield get<CouponRecord[]>(`/${window.settings.secure_path}/coupon/fetch`, { ...couponState.pagination, ...couponState.sort })) as CouponResponse;
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      response.data.forEach(coupon => { if (coupon.type === 1) coupon.value = (coupon.value as number) / 100; });
      yield put({ type: 'setState', payload: { coupons: response.data, pagination: { ...couponState.pagination, total: response.total } } });
    },
    *generate({ params, callback }: CouponGenerateAction, { put }: CouponTools): CouponEffect {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      if (params.type === 1) params.value = (params.value as number) * 100;
      const response = (yield post(`/${window.settings.secure_path}/coupon/generate`, params)) as CouponGenerateResponse;
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      if (params.generate_count) downloadCouponCsv(response.buffer as BlobPart);
      yield put({ type: 'fetch' });
      if (typeof callback === 'function') callback();
    },
    *drop({ id }: CouponIdAction, { put }: CouponTools): CouponEffect {
      const response = (yield post(`/${window.settings.secure_path}/coupon/drop`, { id })) as ApiResponse;
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
    *show({ id }: CouponIdAction, { put }: CouponTools): CouponEffect {
      const response = (yield post(`/${window.settings.secure_path}/coupon/show`, { id })) as ApiResponse;
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
    *changeTable({ pagination, sort }: CouponTableAction, { put, select }: CouponTools): CouponEffect {
      const couponState = (yield select(state => state.coupon)) as CouponState;
      yield put({ type: 'setState', payload: { pagination: { ...couponState.pagination, ...pagination }, sort } });
      yield put({ type: 'fetch' });
    },
  },
};
