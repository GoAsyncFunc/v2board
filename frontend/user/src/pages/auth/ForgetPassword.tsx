import React from 'react';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import history from '../../app/history';
import AuthPageShell from '../../components/auth/AuthPageShell';
import Recaptcha from '../../components/common/Recaptcha';
import { formatMessage, getLocale } from '../../locales/i18n';
import { LanguageSelector } from '../../components/common/LanguageSelector';
import { localeSettings } from '../../config/localeSettings';
import { notify } from '../../app/notifications';
import type { RecaptchaToken, RegistrationPageProps } from '../../types/auth';
import type { UserRootState } from '../../types/storeContracts';

interface ForgetPasswordState {
    sendEmailVerifyTimeout: number;
}

const translate = (id: string): string => formatMessage({ id });

function currentLocaleLabel(): string {
    return localeSettings.i18nText[getLocale() as keyof typeof localeSettings.i18nText];
}

export class ForgetPasswordPage extends React.Component<
    RegistrationPageProps,
    ForgetPasswordState
> {
    state: ForgetPasswordState = { sendEmailVerifyTimeout: 60 };
    emailInput = React.createRef<HTMLInputElement>();
    emailCodeInput = React.createRef<HTMLInputElement>();
    passwordInput = React.createRef<HTMLInputElement>();
    repeatedPasswordInput = React.createRef<HTMLInputElement>();

    componentDidMount(): void {
        this.props.dispatch({ type: 'guest/getCommConfig' });
    }

    sendEmailVerify(recaptchaData?: RecaptchaToken): void {
        const startCountdown = (): void => {
            setTimeout(() => {
                if (this.state.sendEmailVerifyTimeout !== 0) {
                    this.setState({
                        sendEmailVerifyTimeout: this.state.sendEmailVerifyTimeout - 1,
                    });
                    startCountdown();
                } else {
                    this.setState({ sendEmailVerifyTimeout: 60 });
                }
            }, 1000);
        };
        this.props.dispatch({
            type: 'passport/sendEmailVerify',
            email: this.emailInput.current?.value ?? '',
            recaptchaData,
            isforget: 1,
            succeed: () => notify('success', '发送成功', '如果没有收到验证码请检查垃圾箱。'),
            callback: startCountdown,
        });
    }

    forget(): void {
        const password = this.passwordInput.current?.value ?? '';
        if (password !== (this.repeatedPasswordInput.current?.value ?? '')) {
            notify('error', '请求失败', '两次密码输入不同');
            return;
        }
        this.props.dispatch({
            type: 'passport/forget',
            email: this.emailInput.current?.value ?? '',
            password,
            emailCode: this.emailCodeInput.current?.value ?? '',
        });
    }

    render(): React.ReactNode {
        const { sendEmailVerifyLoading, forgetLoading } = this.props.passport;
        const { commConfig } = this.props.guest;
        const { sendEmailVerifyTimeout } = this.state;
        const { background_url: backgroundUrl, logo, title, description } = window.settings;

        const footer = (
            <>
                <a
                    className="font-size-sm text-muted"
                    href="javascript:void(0);"
                    onClick={() => history.push('/login')}
                >
                    {translate('返回登入')}
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
                <div className="form-group form-row">
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control form-control-alt"
                            placeholder={translate('邮箱验证码')}
                            ref={this.emailCodeInput}
                        />
                    </div>
                    <div className="col-3">
                        <Recaptcha
                            visible={Boolean(commConfig.is_recaptcha)}
                            callback={(data) => this.sendEmailVerify(data)}
                        >
                            <button
                                type="submit"
                                disabled={sendEmailVerifyTimeout !== 60 || sendEmailVerifyLoading}
                                className="btn btn-block btn-primary"
                            >
                                {sendEmailVerifyTimeout === 60 ? (
                                    sendEmailVerifyLoading ? (
                                        <Icon type="loading" />
                                    ) : (
                                        translate('发送')
                                    )
                                ) : (
                                    sendEmailVerifyTimeout
                                )}
                            </button>
                        </Recaptcha>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control form-control-alt"
                        placeholder={translate('密码')}
                        ref={this.passwordInput}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control form-control-alt"
                        placeholder={translate('密码')}
                        ref={this.repeatedPasswordInput}
                    />
                </div>
                <div className="form-group mb-0">
                    <button
                        disabled={forgetLoading}
                        type="submit"
                        className="btn btn-block btn-primary font-w400"
                        onClick={() => this.forget()}
                    >
                        {forgetLoading ? (
                            <Icon type="loading" />
                        ) : (
                            <span>
                                <i className="si si-support mr-1" />
                                {translate('重置密码')}
                            </span>
                        )}
                    </button>
                </div>
            </AuthPageShell>
        );
    }
}

export default connect((state: UserRootState) => ({
    passport: state.passport,
    guest: state.guest,
}))(ForgetPasswordPage);
