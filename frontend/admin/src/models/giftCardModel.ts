import dayjs from 'moment';
import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/apiContracts';
import type {
    GiftcardRecord,
    GiftcardState,
    PromotionPagination,
    PromotionSort,
} from '../types/promotion';
import type { AdminAction, AdminRootState } from '../types/storeContracts';
import type { ModelEffect, ModelEffectTools } from '../types/modelEffects';

type GiftcardRootState = Pick<AdminRootState, 'giftcard'>;
interface GiftcardTools extends ModelEffectTools<GiftcardRootState> {}
interface GiftcardGenerateAction {
    params: GiftcardRecord;
    callback?: () => void;
}
interface GiftcardIdAction {
    id?: string | number;
}
interface GiftcardTableAction {
    pagination: Partial<PromotionPagination>;
    sort: PromotionSort;
}
type GiftcardResponse = ApiResponse<GiftcardRecord[]>;
type GiftcardGenerateResponse = ApiResponse & { buffer?: BlobPart };
type GiftcardYield = GiftcardState | ApiResponse;
type GiftcardEffect = ModelEffect<GiftcardYield>;

const initialState: GiftcardState = {
    giftcards: [],
    fetchLoading: false,
    saveLoading: false,
    pagination: { pageSize: 10, current: 1 },
    sort: {},
};

function downloadGiftcardCsv(buffer: BlobPart): void {
    const blob = new Blob([buffer], { type: 'text/plain,charset=UTF-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.style.display = 'none';
    link.download = `GIFTCARD ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
}

export default {
    namespace: 'giftcard',
    state: { ...initialState },
    reducers: {
        setState(state: GiftcardState, { payload }: { payload: Partial<GiftcardState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(_: AdminAction, { put, select }: GiftcardTools): GiftcardEffect {
            const giftcardState = (yield select((state) => state.giftcard)) as GiftcardState;
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = (yield get<GiftcardRecord[]>(
                `/${window.settings.secure_path}/giftcard/fetch`,
                { ...giftcardState.pagination, ...giftcardState.sort },
            )) as GiftcardResponse;
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            response.data.forEach((giftcard) => {
                if (giftcard.type === 1) giftcard.value = (giftcard.value as number) / 100;
            });
            yield put({
                type: 'setState',
                payload: {
                    giftcards: response.data,
                    pagination: { ...giftcardState.pagination, total: response.total },
                },
            });
        },
        *generate(
            { params, callback }: GiftcardGenerateAction,
            { put }: GiftcardTools,
        ): GiftcardEffect {
            yield put({ type: 'setState', payload: { saveLoading: true } });
            if (params.type === 1) params.value = (params.value as number) * 100;
            const response = (yield post(
                `/${window.settings.secure_path}/giftcard/generate`,
                params,
            )) as GiftcardGenerateResponse;
            yield put({ type: 'setState', payload: { saveLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            if (params.generate_count) downloadGiftcardCsv(response.buffer as BlobPart);
            yield put({ type: 'fetch' });
            if (typeof callback === 'function') callback();
        },
        *drop({ id }: GiftcardIdAction, { put }: GiftcardTools): GiftcardEffect {
            const response = (yield post(`/${window.settings.secure_path}/giftcard/drop`, {
                id,
            })) as ApiResponse;
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *changeTable(
            { pagination, sort }: GiftcardTableAction,
            { put, select }: GiftcardTools,
        ): GiftcardEffect {
            const giftcardState = (yield select((state) => state.giftcard)) as GiftcardState;
            yield put({
                type: 'setState',
                payload: { pagination: { ...giftcardState.pagination, ...pagination }, sort },
            });
            yield put({ type: 'fetch' });
        },
    },
};
