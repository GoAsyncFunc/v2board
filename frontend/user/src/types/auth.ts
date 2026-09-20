import type { UserDispatch } from './store';

export type RecaptchaToken = string | null | undefined;

export interface AuthRouteQuery {
  code?: string;
  redirect?: string;
  verify?: string;
}

export interface AuthLocation {
  query: AuthRouteQuery;
}

export interface PassportState {
  forgetLoading?: boolean;
  getCommConfigLoading?: boolean;
  loginLoading?: boolean;
  registerLoading?: boolean;
  sendEmailVerifyLoading?: boolean;
}

export interface CommunicationConfig {
  app_description?: string;
  app_url?: string;
  email_whitelist_suffix?: 0 | string[];
  is_email_verify?: boolean | number;
  is_invite_force?: boolean | number;
  is_recaptcha?: boolean | number;
  recaptcha_site_key?: string;
  tos_url?: string | null;
}

export interface GuestState {
  commConfig: CommunicationConfig;
  getCommConfigLoading?: boolean;
  selectEmailSuffix?: string;
}

export interface AuthRootState {
  guest: GuestState;
  passport: PassportState;
}

export interface LoginPageProps {
  dispatch: UserDispatch;
  location: AuthLocation;
  passport: PassportState;
}

export interface RegistrationPageProps extends LoginPageProps {
  guest: GuestState;
}
