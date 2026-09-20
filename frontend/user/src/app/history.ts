import type { History, Location } from 'history';
import { createHistory } from '../vendor/appRuntime.js';

export interface QueryLocation extends Location {
  query: Record<string, string | string[]>;
}

export type UserHistory = Omit<History, 'location'> & { location: QueryLocation };

const history = createHistory({ basename: '/' }) as UserHistory;
window.g_history = history;

export default history;
