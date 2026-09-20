export interface UserInfo {
  email: string;
  balance: number;
  commission_balance?: number;
}

export interface SessionUserState {
  userInfo: UserInfo;
  getUserInfoLoading: boolean;
}
