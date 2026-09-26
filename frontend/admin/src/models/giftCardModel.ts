import dayjs from 'moment';
import { get, post } from '@/services/apiClient';
import { isSuccessfulResponse, type ApiResponse } from '@/types/apiContracts';
import type {
    GiftCardRecord,
    GiftCardState,
    PromotionPagination,
    PromotionSort,
} from '@/types/promotionContracts';
import type { AdminAction, AdminRootState } from '@/types/storeContracts';
import type { ModelEffect, ModelEffectTools } from '@/types/modelEffectContracts';

type GiftCardRootState = Pick<AdminRootState, 'giftcard'>;
interface GiftCardTools extends ModelEffectTools<GiftCardRootState> {}
interface GiftCardGenerateAction {
    params: GiftCardRecord;
    callback?: () => void;
}
interface GiftCardIdAction {
    id?: string | number;
}
interface GiftCardTableAction {
    pagination: Partial<PromotionPagination>;
    sort: PromotionSort;
}
type GiftCardResponse = ApiResponse<GiftCardRecord[]>;
type GiftCardGenerateResponse = ApiResponse & { buffer: BlobPart };
type GiftCardYield = GiftCardState | ApiResponse;
type GiftCardEffect = ModelEffect<GiftCardYield>;

const initialState: GiftCardState = {
    giftcards: [],
    fetchLoading: false,
    saveLoading: false,
    pagination: { pageSize: 10, current: 1 },
    sort: {},
};

function downloadGiftCardCsv(buffer: BlobPart): void {
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
        setState(state: GiftCardState, { payload }: { payload: Partial<GiftCardState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(_: AdminAction, { put, select }: GiftCardTools): GiftCardEffect {
            const giftcardState = (yield select((state) => state.giftcard)) as GiftCardState;
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = (yield get<GiftCardRecord[]>(
                `/${window.settings.secure_path}/giftcard/fetch`,
                { ...giftcardState.pagination, ...giftcardState.sort },
            )) as GiftCardResponse;
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            response.data.forEach((giftcard) => {
                if (giftcard.type === 1) giftcard.value = Number(giftcard.value) / 100;
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
            { params, callback }: GiftCardGenerateAction,
            { put }: GiftCardTools,
        ): GiftCardEffect {
            yield put({ type: 'setState', payload: { saveLoading: true } });
            if (params.type === 1) params.value = Number(params.value) * 100;
            const response = (yield post(
                `/${window.settings.secure_path}/giftcard/generate`,
                params,
            )) as GiftCardGenerateResponse;
            yield put({ type: 'setState', payload: { saveLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            if (params.generate_count) downloadGiftCardCsv(response.buffer);
            yield put({ type: 'fetch' });
            if (typeof callback === 'function') callback();
        },
        *drop({ id }: GiftCardIdAction, { put }: GiftCardTools): GiftCardEffect {
            const response = (yield post(`/${window.settings.secure_path}/giftcard/drop`, {
                id,
            })) as ApiResponse;
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *changeTable(
            { pagination, sort }: GiftCardTableAction,
            { put, select }: GiftCardTools,
        ): GiftCardEffect {
            const giftcardState = (yield select((state) => state.giftcard)) as GiftCardState;
            yield put({
                type: 'setState',
                payload: { pagination: { ...giftcardState.pagination, ...pagination }, sort },
            });
            yield put({ type: 'fetch' });
        },
    },
};
