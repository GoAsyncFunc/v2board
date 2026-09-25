import {
    check as checkOrder,
    detail as fetchOrderDetail,
    fetch as fetchOrders,
    getPaymentMethod as fetchPaymentMethods,
    cancel as cancelOrder,
    checkout as checkoutOrder,
    checkoutByStripe,
    save as saveOrder,
} from './orderManagementEffects';
import type { OrderModelState } from '../types/paymentContracts';
import type { StateUpdate } from '../types/queryStateContracts';

const initialState: OrderModelState = {
    fetchLoading: true,
    saveLoading: false,
    checkoutLoading: false,
    order: { plan: {} },
    paymentMethod: [],
    selectMethod: undefined,
    qrcodeModalVisible: false,
    payUrl: undefined,
    orders: [],
    cancelLoading: false,
    detailsLoading: false,
};

export default {
    namespace: 'order',
    state: { ...initialState },
    reducers: {
        setState(
            state: OrderModelState,
            { payload }: StateUpdate<OrderModelState>,
        ): OrderModelState {
            return { ...state, ...payload };
        },
        empty(state: OrderModelState): OrderModelState {
            return { ...state, ...initialState };
        },
    },
    effects: {
        save: saveOrder,
        detail: fetchOrderDetail,
        check: checkOrder,
        getPaymentMethod: fetchPaymentMethods,
        checkout: checkoutOrder,
        checkoutByStripe,
        fetch: fetchOrders,
        cancel: cancelOrder,
    },
};
