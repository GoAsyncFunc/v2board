import React from 'react';
import { a as Icon } from '../vendor/Icon.js';
import history from '../vendor/routerHistory.js';
import { c as connect } from '../vendor/reactRedux.js';
import { Recaptcha } from '../vendor/features.js';
import { formatMessage, getLocale } from '../vendor/i18n.js';
import { a as LanguageSelector } from '../components/LanguageSelector.jsx';
import { r as notify } from '../vendor/siteHelpers.js';
import { a as localeSettings } from '../vendor/localeSettings.js';
import '../vendor/iconStyles.js';

class ForgetPasswordPage extends React.Component {
  constructor(props) {
    super(props), this.state = {
      sendEmailVerifyTimeout: 60
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "guest/getCommConfig"
    });
  }
  sendEmailVerify(recaptchaData) {
    var page = this;
    function startCountdown() {
      setTimeout(() => {
        0 !== page.state.sendEmailVerifyTimeout ? (page.setState({
          sendEmailVerifyTimeout: page.state.sendEmailVerifyTimeout - 1
        }), startCountdown()) : page.setState({
          sendEmailVerifyTimeout: 60
        });
      }, 1e3);
    }
    this.props.dispatch({
      type: "passport/sendEmailVerify",
      email: this.refs.email.value,
      recaptchaData,
      isforget: 1,
      callback: () => {
        startCountdown();
      }
    });
  }
  forget() {
    this.refs.password.value === this.refs.repassword.value ? this.props.dispatch({
      type: "passport/forget",
      email: this.refs.email.value,
      password: this.refs.password.value,
      emailCode: this.refs.email_code.value
    }) : notify("error", "请求失败", "两次密码输入不同");
  }
  render() {
    var passport = this.props.passport,
      sendEmailVerifyLoading = passport.sendEmailVerifyLoading,
      forgetLoading = passport.forgetLoading,
      commConfig = this.props.guest.commConfig;
    return <div id={"page-container"}>
                <main id={"main-container"}>
                    <div className={"v2board-background"} style={{
          backgroundImage: window.settings.background_url && "url(".concat(window.settings.background_url, ")")
        }}></div>
                    <div className={"no-gutters v2board-auth-box"}>
                        <div className={""} style={{
            maxWidth: 450,
            width: "100%",
            margin: "auto"
          }}>
                            <div className={"mx-2 mx-sm-0"}>
                                <div className={"block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image"} style={{
                boxShadow: "0 0.5rem 2rem #0000000d"
              }}>
                                    <div className={"row no-gutters"}>
                                        <div className={"col-md-12 order-md-1 bg-white"}>
                                            <div className={"block-content block-content-full px-lg-4 py-md-4 py-lg-4"}>
                                                <div className={"mb-3 text-center"}>
                                                    <a className={"font-size-h1"} href={"javascript:void(0);"}>
                                                        {window.settings.logo ? <img className={"v2board-logo mb-3"} src={window.settings.logo}></img> : <span className={"text-dark"}>
                                                                {window.settings.title || "V2Board"}
                                                            </span>}
                                                    </a>
                                                    {window.settings.description && <p className={"font-size-sm text-muted mb-3"}>
                                                            {window.settings.description}
                                                        </p>}
                                                </div>
                                                <div className={"form-group"}>
                                                    <input type={"text"} className={"form-control form-control-alt"} placeholder={formatMessage({
                          id: "邮箱"
                        })} ref={"email"}></input>
                                                </div>
                                                <div className={"form-group form-row"}>
                                                    <div className={"col-9"}>
                                                        <input type={"text"} className={"form-control form-control-alt"} placeholder={formatMessage({
                            id: "邮箱验证码"
                          })} ref={"email_code"}></input>
                                                    </div>
                                                    <div className={"col-3"}>
                                                        {React.createElement(Recaptcha, {
                            visible: commConfig.is_recaptcha,
                            callback: e => this.sendEmailVerify(e)
                          }, <button type={"submit"} disabled={60 !== this.state.sendEmailVerifyTimeout || sendEmailVerifyLoading} className={"btn btn-block btn-primary"}>
                                                                {60 === this.state.sendEmailVerifyTimeout ? sendEmailVerifyLoading ? React.createElement(Icon, {
                              type: "loading"
                            }) : formatMessage({
                              id: "发送"
                            }) : this.state.sendEmailVerifyTimeout}
                                                            </button>)}
                                                    </div>
                                                </div>
                                                <div className={"form-group"}>
                                                    <input type={"password"} className={"form-control form-control-alt"} placeholder={formatMessage({
                          id: "密码"
                        })} ref={"password"}></input>
                                                </div>
                                                <div className={"form-group"}>
                                                    <input type={"password"} className={"form-control form-control-alt"} placeholder={formatMessage({
                          id: "密码"
                        })} ref={"repassword"}></input>
                                                </div>
                                                <div className={"form-group mb-0"}>
                                                    <button disabled={forgetLoading} type={"submit"} className={"btn btn-block btn-primary font-w400"} onClick={() => this.forget()}>
                                                        {forgetLoading ? React.createElement(Icon, {
                            type: "loading"
                          }) : <span>
                                                                <i className={"si si-support mr-1"}></i>
                                                                {formatMessage({
                              id: "重置密码"
                            })}
                                                            </span>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"text-left bg-gray-lighter p-3 px-4"}>
                                        <a className={"font-size-sm text-muted"} href={"javascript:void(0);"} onClick={() => history.push("/login")}>
                                            {formatMessage({
                      id: "返回登入"
                    })}
                                        </a>
                                        {React.createElement(LanguageSelector, null, <span className={"v2board-login-i18n-btn"}>
                                                <i className={"si si-globe pr-1"}></i>
                                                <span className={"font-size-sm text-muted"} style={{
                      verticalAlign: "text-bottom"
                    }}>
                                                    {localeSettings.i18nText[getLocale()]}
                                                </span>
                                            </span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>;
  }
}
export default connect(state => {
  return { passport: state.passport, guest: state.guest };
})(ForgetPasswordPage);
