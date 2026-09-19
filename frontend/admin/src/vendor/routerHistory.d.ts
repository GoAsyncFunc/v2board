import type { History } from 'history';

declare const history: History;

export const push: History['push'];
export const replace: History['replace'];
export const go: History['go'];
export const goBack: History['goBack'];
export const goForward: History['goForward'];

export default history;
