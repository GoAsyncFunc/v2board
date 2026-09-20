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
  loginLoading: boolean;
  commConfig: {
    emailWhitelistSuffix: string[];
    isEmailVerify?: boolean;
    isInviteForce?: boolean;
  };
  getCommConfigLoading: boolean;
  sendEmailVerifyLoading: boolean;
  registerLoading: boolean;
  forgetLoading: boolean;
}

export interface AuthTokenData { auth_data: string; }
export interface LoginSessionData { is_login: boolean; is_admin?: boolean; }

export interface TokenLoginAction {
  verify?: string;
  redirect?: string;
}

export interface LoginAction {
  email: string;
  password: string;
  redirect?: string;
}

export interface RegisterAction {
  email: string;
  password: string;
  inviteCode: string;
  emailCode: string;
  recaptchaData?: RecaptchaToken;
}

export interface SendEmailVerificationAction {
  email: string;
  callback?: () => void;
  recaptchaData?: RecaptchaToken;
  isforget?: number;
}

export interface ForgetPasswordAction {
  email: string;
  password: string;
  emailCode: string;
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
