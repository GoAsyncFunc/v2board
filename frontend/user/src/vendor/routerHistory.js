import appHistory from '../app/history';

export const push = (...args) => appHistory.push(...args);
export const replace = (...args) => appHistory.replace(...args);
export const go = (...args) => appHistory.go(...args);
export const goBack = (...args) => appHistory.goBack(...args);
export const goForward = (...args) => appHistory.goForward(...args);

const history = { push, replace, go, goBack, goForward };

export default history;
