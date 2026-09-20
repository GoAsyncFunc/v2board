import type { JsonValue } from './api';
import type { CouponData } from './commerce';

export interface CouponState { coupon: CouponData & { code?: string }; checkLoading: boolean; }
export interface LayoutState { showNav: boolean; }

// Legacy tutorial records pass through untouched, except for the JSON-encoded steps field.
export interface TutorialRecord {
  steps?: JsonValue;
  [field: string]: JsonValue | undefined;
}
export interface TutorialWireRecord extends TutorialRecord { steps?: string | null; }
export interface TutorialState {
  tutorials: TutorialRecord[];
  safeAreaVar: Record<string, JsonValue>;
  steps: JsonValue[];
  tutorial: TutorialRecord;
  fetchByIdLoading: boolean;
}
export interface TutorialListResponse {
  tutorials: TutorialRecord[];
  safe_area_var: Record<string, JsonValue>;
}
