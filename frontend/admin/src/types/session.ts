import type { UserRecord } from './user';

export interface AdminLoginData {
    auth_data: string;
    is_admin: number | boolean;
}

export interface AdministratorAuthenticationState {
    loginLoading?: boolean;
}

export type AdminUserInfo = Partial<UserRecord>;

export interface PassportState {
    loginLoading: boolean;
}

export interface LayoutState {
    showNav: boolean;
}
