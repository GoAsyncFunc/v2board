import React from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import history from '../../app/history';
import AuthPageShell from '../../components/auth/AuthPageShell';
import { formatMessage, getLocale } from '../../locales/i18n';
import { LanguageSelector } from '../../components/common/LanguageSelector';
import { localeSettings } from '../../config/localeSettings';
import type { LoginPageProps } from '../../types/auth';
import type { UserRootState } from '../../types/storeContracts';

const translate = (id: string): string => formatMessage({ id });

function currentLocaleLabel(): string {
    return localeSettings.i18nText[getLocale() as keyof typeof localeSettings.i18nText];
}

export class UserLogin extends React.Component<LoginPageProps> {
    emailInput = React.createRef<HTMLInputElement>();
    passwordInput = React.createRef<HTMLInputElement>();

    componentDidMount(): void {
        const { verify, redirect } = this.props.location.query;
        if (verify) this.props.dispatch({ type: 'passport/token2Login', verify, redirect });
        this.props.dispatch({ type: 'user/checkLogin', redirect });
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount(): void {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event: KeyboardEvent): void => {
        if (event.keyCode === 13) this.login();
    };

    login = (): void => {
        this.props.dispatch({
            type: 'passport/login',
            email: this.emailInput.current?.value ?? '',
            password: this.passwordInput.current?.value ?? '',
            redirect: this.props.location.query.redirect,
        });
    };

    render(): React.ReactNode {
        const { loginLoading } = this.props.passport;
        const { background_url: backgroundUrl, title, logo, description } = window.settings;

        const footer = (
            <>
                <a
                    className="font-size-sm text-muted"
                    href="javascript:void(0);"
                    onClick={() => history.push('/register')}
                >
                    {translate('注册')}
                </a>
                <Divider type="vertical" />
                <a
                    className="font-size-sm text-muted"
                    href="javascript:void(0);"
                    onClick={() => history.push('/forgetpassword')}
                >
                    {translate('忘记密码')}
                </a>
                <LanguageSelector>
                    <span className="v2board-login-i18n-btn">
                        <i className="si si-globe pr-1" />
                        <span
                            className="font-size-sm text-muted"
                            style={{ verticalAlign: 'text-bottom' }}
                        >
                            {currentLocaleLabel()}
                        </span>
                    </span>
                </LanguageSelector>
            </>
        );

        return (
            <AuthPageShell
                backgroundUrl={backgroundUrl}
                logo={logo}
                title={title}
                description={description}
                footer={footer}
            >
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-alt"
                        placeholder={translate('邮箱')}
                        ref={this.emailInput}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control form-control-alt"
                        placeholder={translate('密码')}
                        ref={this.passwordInput}
                    />
                </div>
                <div className="form-group mb-0">
                    <button
                        disabled={loginLoading}
                        type="submit"
                        className="btn btn-block btn-primary font-w400"
                        onClick={this.login}
                    >
                        {loginLoading ? (
                            <Icon type="loading" />
                        ) : (
                            <span>
                                <i className="si si-login mr-1" />
                                {translate('登入')}
                            </span>
                        )}
                    </button>
                </div>
            </AuthPageShell>
        );
    }
}

export default connect((state: UserRootState) => ({ passport: state.passport }))(UserLogin);
