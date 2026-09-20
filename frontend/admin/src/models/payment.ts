import { get, post, type ApiResponse, type FormRecord, type JsonValue } from '../services/request';
import '../config/adminSettings';
import type { PaymentRecord } from '../components/PaymentDisplayColumns';
import type { PaymentForm, PaymentState } from '../types/payment';
import type { AdminAction } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/effects';

interface PaymentRootState { payment: PaymentState; }
interface PaymentTools extends ModelEffectTools<PaymentRootState> {}
interface CompleteAction<Data> { complete(data: Data): void; }
interface PaymentFormAction extends CompleteAction<PaymentForm> { payment: string; id?: string | number; }
interface SavePaymentAction { params: FormRecord; complete?: (data: JsonValue) => void; }
interface PaymentIdAction { id?: string | number; }
interface SortPaymentAction { fromIndex: number; toIndex: number; }
type PaymentYield =
  | ApiResponse
  | ApiResponse<PaymentForm>
  | ApiResponse<PaymentRecord[]>
  | ApiResponse<string[]>
  | PaymentState;
type PaymentEffect = ModelEffect<PaymentYield>;

const initialState: PaymentState = { payments: [], fetchLoading: false };

export default {
  name: 'payment', state: { ...initialState },
  reducers: {
    setState(state: PaymentState, { payload }: { payload: Partial<PaymentState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch(_: AdminAction, { put }: PaymentTools): PaymentEffect {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = (yield get<PaymentRecord[]>(`/${window.settings.secure_path}/payment/fetch`)) as ApiResponse<PaymentRecord[]>;
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { payments: response.data } });
    },
    *getPaymentMethods({ complete }: CompleteAction<string[]>): PaymentEffect {
      const response = (yield get<string[]>(`/${window.settings.secure_path}/payment/getPaymentMethods`)) as ApiResponse<string[]>;
      if (response.code === 200) complete(response.data);
    },
    *getPaymentForm({ complete, payment, id }: PaymentFormAction): PaymentEffect {
      const response = (yield post<PaymentForm>(`/${window.settings.secure_path}/payment/getPaymentForm`, { payment, id })) as ApiResponse<PaymentForm>;
      if (response.code === 200) complete(response.data);
    },
    *save({ params, complete }: SavePaymentAction, { put }: PaymentTools): PaymentEffect {
      const response = (yield post(`/${window.settings.secure_path}/payment/save`, { ...params })) as ApiResponse;
      if (response.code !== 200) return;
      complete?.(response.data);
      yield put({ type: 'fetch' });
    },
    *show({ id }: PaymentIdAction, { put }: PaymentTools): PaymentEffect {
      const response = (yield post(`/${window.settings.secure_path}/payment/show`, { id })) as ApiResponse;
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *drop({ id }: PaymentIdAction, { put }: PaymentTools): PaymentEffect {
      const response = (yield post(`/${window.settings.secure_path}/payment/drop`, { id })) as ApiResponse;
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *sort({ fromIndex, toIndex }: SortPaymentAction, { select, put }: PaymentTools): PaymentEffect {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const paymentState = (yield select(state => state.payment)) as PaymentState;
      const payments = paymentState.payments;
      if (fromIndex < toIndex) {
        payments.splice(toIndex + 1, 0, payments[fromIndex]); payments.splice(fromIndex, 1);
      } else {
        payments.splice(toIndex, 0, payments[fromIndex]); payments.splice(fromIndex + 1, 1);
      }
      yield put({ type: 'setState', payload: { payments } });
      const response = (yield post(`/${window.settings.secure_path}/payment/sort`, { ids: payments.map(payment => payment.id) })) as ApiResponse;
      if (response.code === 200) yield put({ type: 'fetch' });
    },
  },
};
