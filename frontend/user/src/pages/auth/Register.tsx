import React from 'react';
import { connect } from 'react-redux';
import history from '../../app/routerHistory';
import AuthBrand from '../../components/auth/AuthBrand';
import RegistrationForm from '../../components/auth/RegistrationForm';
import { formatMessage, getLocale } from '../../locales/i18n';
import { LanguageSelector } from '../../components/common/LanguageSelector';
import { localeSettings } from '../../config/localeSettings';
import { notify } from '../../app/notifications';
import type { RecaptchaToken, RegistrationPageProps } from '../../types/auth';
import type { UserRootState } from '../../types/store';

interface RegistrationPageState {
    sendEmailVerifyTimeout: number;
    tosChecked?: boolean;
}

function currentLocaleLabel(): string {
    return localeSettings.i18nText[getLocale() as keyof typeof localeSettings.i18nText];
}

export class RegisterPage extends React.Component<RegistrationPageProps, RegistrationPageState> {
    state: RegistrationPageState = { sendEmailVerifyTimeout: 60 };
    emailInput = React.createRef<HTMLInputElement>();
    emailCodeInput = React.createRef<HTMLInputElement>();
    passwordInput = React.createRef<HTMLInputElement>();
    repeatedPasswordInput = React.createRef<HTMLInputElement>();
    inviteInput = React.createRef<HTMLInputElement>();

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
            email: this.getEmail(),
            isforget: 0,
            recaptchaData,
            succeed: () => notify('success', '发送成功', '如果没有收到验证码请检查垃圾箱。'),
            callback: startCountdown,
        });
    }

    getEmail(): string {
        const { commConfig, selectEmailSuffix: emailSuffix } = this.props.guest;
        const email = this.emailInput.current?.value ?? '';
        return commConfig.email_whitelist_suffix ? `${email}@${emailSuffix ?? ''}` : email;
    }

    register(recaptchaData?: RecaptchaToken): void {
        const { commConfig } = this.props.guest;
        if (commConfig.tos_url && !this.state.tosChecked) {
            notify(
                'error',
                formatMessage({ id: '请求失败' }),
                formatMessage({ id: '请同意服务条款' }),
            );
            return;
        }

        const password = this.passwordInput.current?.value ?? '';
        if (password !== (this.repeatedPasswordInput.current?.value ?? '')) {
            notify(
                'error',
                formatMessage({ id: '请求失败' }),
                formatMessage({ id: '两次密码输入不同' }),
            );
            return;
        }

        this.props.dispatch({
            type: 'passport/register',
            email: this.getEmail(),
            password,
            inviteCode: this.inviteInput.current?.value ?? '',
            emailCode: this.emailCodeInput.current?.value ?? '',
            recaptchaData,
        });
    }

    render(): React.ReactNode {
        const { sendEmailVerifyLoading, registerLoading, getCommConfigLoading } =
            this.props.passport;
        const { commConfig, selectEmailSuffix: emailSuffix } = this.props.guest;
        const inviteCode = this.props.location.query.code;
        const { background_url: backgroundUrl, logo, title, description } = window.settings;

        return (
            <div id="page-container">
                <main id="main-container">
                    <div
                        className="v2board-background"
                        style={{ backgroundImage: backgroundUrl && `url(${backgroundUrl})` }}
                    />
                    <div className="no-gutters v2board-auth-box">
                        <div className="" style={{ maxWidth: 450, width: '100%', margin: 'auto' }}>
                            <div className="mx-2 mx-sm-0">
                                <div
                                    className="block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image"
                                    style={{ boxShadow: '0 0.5rem 2rem #0000000d' }}
                                >
                                    <div className="row no-gutters">
                                        <div className="col-md-12 order-md-1 bg-white">
                                            <div className="block-content block-content-full px-lg-4 py-md-4 py-lg-4">
                                                <AuthBrand
                                                    logo={logo}
                                                    title={title}
                                                    description={description}
                                                />
                                                {getCommConfigLoading ? (
                                                    <div className="content content-full text-center">
                                                        <div
                                                            className="spinner-grow text-primary"
                                                            role="status"
                                                        >
                                                            <span className="sr-only">
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <RegistrationForm
                                                        commConfig={commConfig}
                                                        emailCodeInput={this.emailCodeInput}
                                                        emailInput={this.emailInput}
                                                        emailSuffix={emailSuffix}
                                                        inviteCode={inviteCode}
                                                        inviteInput={this.inviteInput}
                                                        onEmailSuffixChange={(value) =>
                                                            this.props.dispatch({
                                                                type: 'guest/setState',
                                                                payload: {
                                                                    selectEmailSuffix: value,
                                                                },
                                                            })
                                                        }
                                                        onRegister={(data) => this.register(data)}
                                                        onSendEmailVerify={(data) =>
                                                            this.sendEmailVerify(data)
                                                        }
                                                        onToggleTerms={() =>
                                                            this.setState({
                                                                tosChecked: !this.state.tosChecked,
                                                            })
                                                        }
                                                        passwordInput={this.passwordInput}
                                                        registerLoading={registerLoading}
                                                        repeatedPasswordInput={
                                                            this.repeatedPasswordInput
                                                        }
                                                        sendEmailVerifyLoading={
                                                            sendEmailVerifyLoading
                                                        }
                                                        sendEmailVerifyTimeout={
                                                            this.state.sendEmailVerifyTimeout
                                                        }
                                                        tosChecked={Boolean(this.state.tosChecked)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left bg-gray-lighter p-3 px-4">
                                        <a
                                            className="font-size-sm text-muted"
                                            href="javascript:void(0);"
                                            onClick={() => history.push('/login')}
                                        >
                                            {formatMessage({ id: '返回登入' })}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default connect((state: UserRootState) => ({
    passport: state.passport,
    guest: state.guest,
}))(RegisterPage);
