export interface ProfileInfo {
  balance?: number;
  auto_renewal?: boolean | 0 | 1;
  remind_expire?: boolean | 0 | 1;
  remind_traffic?: boolean | 0 | 1;
  telegram_id?: string | number | null;
}

export interface ProfileUserState {
  userInfo: ProfileInfo;
  auto_renewal_loading?: boolean;
  remind_expire_loading?: boolean;
  remind_traffic_loading?: boolean;
  redeemgiftcardLoading?: boolean;
  changePasswordLoading?: boolean;
}

export interface ProfileConfig {
  currency?: string;
  is_telegram?: boolean | number;
  telegram_discuss_link?: string;
}

export type ProfileSetting = 'auto_renewal' | 'remind_expire' | 'remind_traffic';
