import type { Action, Location } from 'history';

export interface RouterState {
    location: Location | null | undefined;
    action: Action | null | undefined;
}
