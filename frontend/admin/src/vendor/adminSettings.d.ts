export interface AdminSettings {
  i18nText: Record<string, string>;
  periodText: Record<PropertyKey, string>;
  orderStatusText: Record<PropertyKey, string>;
  commissionStatusText: Record<PropertyKey, string>;
  routeActionText: Record<PropertyKey, string>;
  [key: string]: unknown;
}

export const settings: AdminSettings;
export default settings;
