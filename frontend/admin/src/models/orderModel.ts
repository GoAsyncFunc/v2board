import {
    addFilter as addOrderFilter,
    assign as assignOrder,
    cancel as cancelOrder,
    changeTable as changeOrderTable,
    fetch as fetchOrders,
    filter as filterOrders,
    paid as markOrderPaid,
    update as updateOrder,
} from './orderManagementEffects';
import type { OrderState } from '../types/order';

const initialState: OrderState = {
    orders: [],
    fetchLoading: false,
    assignLoading: false,
    pagination: { pageSize: 10, current: 0 },
    filter: [],
};

export default {
    namespace: 'order',
    state: { ...initialState },
    reducers: {
        setState(state: OrderState, { payload }: { payload: Partial<OrderState> }) {
            return { ...state, ...payload };
        },
        empty() {
            return { ...initialState };
        },
    },
    effects: {
        fetch: fetchOrders,
        filter: filterOrders,
        addFilter: addOrderFilter,
        update: updateOrder,
        paid: markOrderPaid,
        cancel: cancelOrder,
        assign: assignOrder,
        changeTable: changeOrderTable,
    },
};
