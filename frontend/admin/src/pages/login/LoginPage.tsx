import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import type { AdminDispatch, AdminRootState } from '../../types/storeContracts';
import type { PassportState } from '../../types/authenticationContracts';
import AdminLoginScreen from './components/AdminLoginScreen';

interface LoginQuery {
    verify?: string;
    redirect?: string;
}

interface LoginLocation {
    query?: LoginQuery;
}

interface AdminLoginProps {
    dispatch: AdminDispatch;
    passport: PassportState;
    location: LoginLocation;
}

interface AdminLoginState {
    email: string;
    password: string;
}

type LoginBrandSetting = 'background_url' | 'logo' | 'title';

function getSettingString(name: LoginBrandSetting): string | undefined {
    const value = window.settings[name];
    return typeof value === 'string' ? value : undefined;
}

export class AdminLogin extends React.Component<AdminLoginProps, AdminLoginState> {
    private emailInput = React.createRef<HTMLInputElement>();
    private passwordInput = React.createRef<HTMLInputElement>();

    state: AdminLoginState = { email: '', password: '' };

    componentDidMount(): void {
        const { verify, redirect } = this.props.location.query || {};
        if (verify) {
            this.props.dispatch({ type: 'passport/token2Login', verify, redirect });
        }
        this.props.dispatch({ type: 'user/checkLogin', redirect });
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount(): void {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Enter' || event.keyCode === 13) this.login();
    };

    login = (): void => {
        this.props.dispatch({
            type: 'passport/login',
            email: this.emailInput.current?.value || this.state.email,
            password: this.passwordInput.current?.value || this.state.password,
        });
    };

    private showPasswordHelp = (): void => {
        Modal.info({
            title: '忘记密码',
            content: (
                <div>
                    <div>在站点目录下执行命令找回密码</div>
                    <code>php artisan reset:password 管理员邮箱</code>
                </div>
            ),
            centered: true,
            okText: '我知道了',
            onOk() {},
        });
    };

    render(): React.ReactNode {
        const { loginLoading } = this.props.passport;
        return (
            <AdminLoginScreen
                backgroundUrl={getSettingString('background_url')}
                logo={getSettingString('logo')}
                title={getSettingString('title')}
                emailInput={this.emailInput}
                passwordInput={this.passwordInput}
                loginLoading={loginLoading}
                onEmailChange={(event) => this.setState({ email: event.target.value })}
                onPasswordChange={(event) => this.setState({ password: event.target.value })}
                onSubmit={this.login}
                onForgotPassword={this.showPasswordHelp}
            />
        );
    }
}

export default connect((state: AdminRootState) => ({ passport: state.passport }))(AdminLogin);
