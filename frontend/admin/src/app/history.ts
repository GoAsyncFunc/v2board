import type { History, Location } from 'history';
import { createHistory } from './historyFactory';

export interface QueryLocation extends Location {
    query: Record<string, string | string[]>;
}

export type AdminHistory = Omit<History, 'location'> & { location: QueryLocation };

const history = createHistory({ basename: '/' }) as AdminHistory;
window.g_history = history;

export default history;
