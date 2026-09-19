import type { localeSettings } from '../vendor/localeSettings.js';
import type { NumericValue } from './commerce';

export type PlanPeriod = keyof typeof localeSettings.periodText;
export type PlanTab = 0 | 1 | 2;

export interface PlanFeature {
  support: boolean;
  feature: string;
}

export type CatalogPlan = Partial<Record<PlanPeriod, NumericValue>> & {
  id: number;
  name: string;
  content: string;
  capacity_limit: number | null;
};

export interface PlanUnitPrice {
  tag?: string;
  price?: NumericValue;
}
