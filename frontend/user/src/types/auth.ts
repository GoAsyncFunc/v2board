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
  email_whitelist_suffix?: string[];
  is_email_verify?: boolean;
  is_invite_force?: boolean;
  is_recaptcha?: boolean;
  recaptcha_site_key?: string;
  tos_url?: string;
}

export interface GuestState {
  commConfig: CommunicationConfig;
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
