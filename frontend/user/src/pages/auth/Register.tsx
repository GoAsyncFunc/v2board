import React from 'react';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import history from '../../app/routerHistory';
import Recaptcha from '../../components/Recaptcha';
import { formatMessage, getLocale } from '../../locales/i18n';
import { LanguageSelector } from '../../components/LanguageSelector';
import { localeSettings } from '../../config/localeSettings';
import { notify } from '../../utils/siteHelpers';
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
          this.setState({ sendEmailVerifyTimeout: this.state.sendEmailVerifyTimeout - 1 });
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
      notify('error', formatMessage({ id: '请求失败' }), formatMessage({ id: '请同意服务条款' }));
      return;
    }

    const password = this.passwordInput.current?.value ?? '';
    if (password !== (this.repeatedPasswordInput.current?.value ?? '')) {
      notify('error', formatMessage({ id: '请求失败' }), formatMessage({ id: '两次密码输入不同' }));
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
    const { sendEmailVerifyLoading, registerLoading, getCommConfigLoading } = this.props.passport;
    const { commConfig, selectEmailSuffix: emailSuffix } = this.props.guest;
    const inviteCode = this.props.location.query.code;
    const { background_url: backgroundUrl, logo, title, description } = window.settings;

    return (
      <div id="page-container">
        <main id="main-container">
          <div className="v2board-background" style={{ backgroundImage: backgroundUrl && `url(${backgroundUrl})` }} />
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
                        <div className="mb-3 text-center">
                          <a className="font-size-h1" href="javascript:void(0);">
                            {logo ? <img className="v2board-logo mb-3" src={logo} /> : <span className="text-dark">{title || 'V2Board'}</span>}
                          </a>
                          {description && <p className="font-size-sm text-muted mb-3">{description}</p>}
                        </div>
                        {getCommConfigLoading ? (
                          <div className="content content-full text-center">
                            <div className="spinner-grow text-primary" role="status"><span className="sr-only">Loading...</span></div>
                          </div>
                        ) : (
                          <div>
                            <div className={`form-group ${commConfig.email_whitelist_suffix ? 'v2board-email-whitelist-enable' : ''}`}>
                              <input type="text" className="form-control form-control-alt" placeholder={formatMessage({ id: '邮箱' })} ref={this.emailInput} />
                              {commConfig.email_whitelist_suffix ? (
                                <select
                                  className="form-control form-control-alt"
                                  value={emailSuffix}
                                  onChange={event => this.props.dispatch({
                                    type: 'guest/setState',
                                    payload: { selectEmailSuffix: event.target.value },
                                  })}
                                >
                                  {commConfig.email_whitelist_suffix.map(suffix => <option key={suffix} value={suffix}>@{suffix}</option>)}
                                </select>
                              ) : ''}
                            </div>
                            {commConfig.is_email_verify ? (
                              <div className="form-group form-row">
                                <div className="col-9">
                                  <input type="text" className="form-control form-control-alt" placeholder={formatMessage({ id: '邮箱验证码' })} ref={this.emailCodeInput} />
                                </div>
                                <div className="col-3">
                                  <Recaptcha visible={Boolean(commConfig.is_recaptcha)} callback={data => this.sendEmailVerify(data)}>
                                    <button
                                      type="submit"
                                      disabled={this.state.sendEmailVerifyTimeout !== 60 || sendEmailVerifyLoading}
                                      className="btn btn-block btn-primary font-w400"
                                    >
                                      {this.state.sendEmailVerifyTimeout === 60
                                        ? sendEmailVerifyLoading ? <Icon type="loading" /> : formatMessage({ id: '发送' })
                                        : this.state.sendEmailVerifyTimeout}
                                    </button>
                                  </Recaptcha>
                                </div>
                              </div>
                            ) : ''}
                            <div className="form-group">
                              <input type="password" className="form-control form-control-alt" placeholder={formatMessage({ id: '密码' })} ref={this.passwordInput} />
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control form-control-alt" placeholder={formatMessage({ id: '密码' })} ref={this.repeatedPasswordInput} />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                disabled={Boolean(inviteCode)}
                                defaultValue={inviteCode}
                                className="form-control form-control-alt"
                                placeholder={formatMessage({ id: commConfig.is_invite_force ? '邀请码' : '邀请码(选填)' })}
                                ref={this.inviteInput}
                              />
                            </div>
                            {commConfig.tos_url && (
                              <div className="form-group">
                                <div className="custom-control custom-checkbox custom-control-primary">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={Boolean(this.state.tosChecked)}
                                    style={{ zIndex: 1000 }}
                                    onChange={() => this.setState({ tosChecked: !this.state.tosChecked })}
                                  />
                                  <label className="custom-control-label">
                                    <div dangerouslySetInnerHTML={{
                                      __html: formatMessage(
                                        { id: '我已阅读并同意 <a target="_blank" href="{url}">服务条款</a>' },
                                        { url: commConfig.tos_url },
                                      ),
                                    }} />
                                  </label>
                                </div>
                              </div>
                            )}
                            <div className="form-group mb-0">
                              <Recaptcha visible={Boolean(commConfig.is_recaptcha)} callback={data => this.register(data)}>
                                <button
                                  disabled={Boolean(registerLoading || (commConfig.tos_url && !this.state.tosChecked))}
                                  type="submit"
                                  className="btn btn-block btn-primary font-w400"
                                  onClick={() => this.register()}
                                >
                                  {registerLoading ? <Icon type="loading" /> : <span><i className="si si-emoticon-smile mr-1" />{formatMessage({ id: '注册' })}</span>}
                                </button>
                              </Recaptcha>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-left bg-gray-lighter p-3 px-4">
                    <a className="font-size-sm text-muted" href="javascript:void(0);" onClick={() => history.push('/login')}>{formatMessage({ id: '返回登入' })}</a>
                    <LanguageSelector>
                      <span className="v2board-login-i18n-btn">
                        <i className="si si-globe pr-1" />
                        <span className="font-size-sm text-muted" style={{ verticalAlign: 'text-bottom' }}>{currentLocaleLabel()}</span>
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

export default connect((state: UserRootState) => ({ passport: state.passport, guest: state.guest }))(RegisterPage);
