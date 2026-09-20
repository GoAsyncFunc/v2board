import type React from 'react';

export type AdminRouteComponent = React.ElementType;

export interface AdminRouteConfig {
  key?: React.Key;
  path?: string;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
  redirect?: string;
  component?: AdminRouteComponent;
  routes?: AdminRouteConfig[];
  Routes?: React.ElementType[];
}
