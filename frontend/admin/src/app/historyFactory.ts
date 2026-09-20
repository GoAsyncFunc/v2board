import { createHashHistory } from 'history';
import type { HashHistoryBuildOptions, History, Location } from 'history';
import type { AdminHistory, QueryLocation } from './history';

export function parseLocationQuery(search = ''): Record<string, string | string[]> {
    const query: Record<string, string | string[]> = {};
    const searchParams = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    searchParams.forEach((value, key) => {
        const currentValue = query[key];
        if (currentValue === undefined) {
            query[key] = value;
            return;
        }
        query[key] = Array.isArray(currentValue) ? [...currentValue, value] : [currentValue, value];
    });
    return query;
}

function attachLocationQuery(location: Location): QueryLocation {
    return Object.assign(location, { query: parseLocationQuery(location.search) });
}

export function createHistory(options?: HashHistoryBuildOptions): AdminHistory {
    const history = createHashHistory(options) as History & { location: QueryLocation };
    const listen = history.listen.bind(history);
    attachLocationQuery(history.location);
    history.listen = (callback) =>
        listen((location, action) => {
            callback(attachLocationQuery(location), action);
        });
    return history as AdminHistory;
}
