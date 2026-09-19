const SHOW_LOADING = "@@DVA_LOADING/SHOW";
const HIDE_LOADING = "@@DVA_LOADING/HIDE";

export default function createLoadingPlugin(options = {}) {
    const namespace = options.namespace || "loading";
    const only = options.only || [];
    const except = options.except || [];

    if (only.length && except.length) {
        throw new Error("It is ambiguous to configurate `only` and `except` items at the same time.");
    }

    const initialState = {
        global: false,
        models: {},
        effects: {},
    };

    const extraReducers = {
        [namespace](state = initialState, action = {}) {
            const payload = action.payload || {};
            if (action.type === SHOW_LOADING) {
                return {
                    ...state,
                    global: true,
                    models: { ...state.models, [payload.namespace]: true },
                    effects: { ...state.effects, [payload.actionType]: true },
                };
            }

            if (action.type === HIDE_LOADING) {
                const effects = { ...state.effects, [payload.actionType]: false };
                const models = {
                    ...state.models,
                    [payload.namespace]: Object.keys(effects).some(
                        effect => effect.split("/")[0] === payload.namespace && effects[effect],
                    ),
                };
                return {
                    ...state,
                    global: Object.values(models).some(Boolean),
                    models,
                    effects,
                };
            }

            return state;
        },
    };

    const shouldTrack = effectName => (
        (!only.length && !except.length)
        || (only.length > 0 && only.includes(effectName))
        || (except.length > 0 && !except.includes(effectName))
    );

    return {
        extraReducers,
        onEffect(effect, { put }, model, effectContext, effectName) {
            if (!shouldTrack(effectName)) return effect;
            return function* trackedEffect(...args) {
                yield put({
                    type: SHOW_LOADING,
                    payload: { namespace: model.namespace, actionType: effectName },
                });
                yield effect(...args);
                yield put({
                    type: HIDE_LOADING,
                    payload: { namespace: model.namespace, actionType: effectName },
                });
            };
        },
    };
}
