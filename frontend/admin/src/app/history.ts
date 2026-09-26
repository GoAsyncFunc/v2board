import type { History, Location } from 'history';
import { history } from 'umi';

// umi owns the history instance; this shim keeps the `@/app/history` import
// stable for layouts, the navigation service and the test suite.
// umi 3 patches `location.query` (react-router v3-style query object) onto
// every location, preserving the contract the old historyFactory provided.
export interface QueryLocation extends Location {
    query: Record<string, string | string[]>;
}

export type AdminHistory = Omit<History, 'location'> & { location: QueryLocation };

export default history as AdminHistory;
