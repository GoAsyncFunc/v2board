import history from './history';

export const push = history.push.bind(history);
export const replace = history.replace.bind(history);
export const go = history.go.bind(history);
export const goBack = history.goBack.bind(history);
export const goForward = history.goForward.bind(history);

const navigation = { push, replace, go, goBack, goForward };

export default navigation;
