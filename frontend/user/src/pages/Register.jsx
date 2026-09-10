let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
require("../vendor/iconStyles.js");
var r = require("../vendor/Icon.js"),
  o = require("../vendor/modules/71317449.js"),
  i = interopDefault(o),
  a = require("../vendor/routerHistory.js"),
  s = interopDefault(a),
  c = require("../vendor/reactRedux.js"),
  u = require("../vendor/modules/464f4151.js"),
  l = require("../vendor/i18n.js"),
  f = require("../components/LanguageSelector.jsx"),
  p = (require("../services/request.js"), require("../vendor/siteHelpers.js")),
  d = require("../vendor/localeSettings.js");
class h extends i.a.Component {
  constructor(e) {
    super(e), this.state = {
      sendEmailVerifyTimeout: 60
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "guest/getCommConfig"
    });
  }
  sendEmailVerify(e) {
    var t = this;
    function n() {
      setTimeout(() => {
        0 !== t.state.sendEmailVerifyTimeout ? (t.setState({
          sendEmailVerifyTimeout: t.state.sendEmailVerifyTimeout - 1
        }), n()) : t.setState({
          sendEmailVerifyTimeout: 60
        });
      }, 1e3);
    }
    this.props.dispatch({
      type: "passport/sendEmailVerify",
      email: this.getEmail(),
      isforget: 0,
      recaptchaData: e,
      callback: () => {
        n();
      }
    });
  }
  getEmail() {
    var e = this.props.guest,
      t = e.commConfig,
      n = e.selectEmailSuffix;
    return t.email_whitelist_suffix ? "".concat(this.refs.email.value, "@").concat(n) : this.refs.email.value;
  }
  register(e) {
    var t = this.props.guest.commConfig;
    !t.tos_url || this.state.tosChecked ? this.refs.password.value === this.refs.repassword.value ? this.props.dispatch({
      type: "passport/register",
      email: this.getEmail(),
      password: this.refs.password.value,
      inviteCode: this.refs.invite.value,
      emailCode: this.refs.email_code ? this.refs.email_code.value : "",
      recaptchaData: e
    }) : Object(p["r"])("error", Object(l["formatMessage"])({
      id: "请求失败"
    }), Object(l["formatMessage"])({
      id: "两次密码输入不同"
    })) : Object(p["r"])("error", Object(l["formatMessage"])({
      id: "请求失败"
    }), Object(l["formatMessage"])({
      id: "请同意服务条款"
    }));
  }
  render() {
    var e = this.props.passport,
      t = e.sendEmailVerifyLoading,
      n = e.registerLoading,
      o = e.getCommConfigLoading,
      a = this.props.guest,
      c = a.commConfig,
      p = a.selectEmailSuffix;
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
                                                {o ? <div className={"content content-full text-center"}>
                                                        <div className={"spinner-grow text-primary"} role={"status"}>
                                                            <span className={"sr-only"}>
                                                                {"Loading..."}
                                                            </span>
                                                        </div>
                                                    </div> : <div>
                                                        <div className={"form-group ".concat(c.email_whitelist_suffix ? "v2board-email-whitelist-enable" : "")}>
                                                            <input type={"text"} className={"form-control form-control-alt"} placeholder={Object(l["formatMessage"])({
                            id: "邮箱"
                          })} ref={"email"}></input>
                                                            {c.email_whitelist_suffix ? <select className={"form-control form-control-alt"} value={p} onChange={e => {
                            this.props.dispatch({
                              type: "guest/setState",
                              payload: {
                                selectEmailSuffix: e.target.value
                              }
                            });
                          }}>
                                                                    {c.email_whitelist_suffix.map(e => {
                              return <option key={e} value={e}>
                                                                                    {"@"}
                                                                                    {e}
                                                                                </option>;
                            })}
                                                                </select> : ""}
                                                        </div>
                                                        {c.is_email_verify ? <div className={"form-group form-row"}>
                                                                <div className={"col-9"}>
                                                                    <input type={"text"} className={"form-control form-control-alt"} placeholder={Object(l["formatMessage"])({
                              id: "邮箱验证码"
                            })} ref={"email_code"}></input>
                                                                </div>
                                                                <div className={"col-3"}>
                                                                    {i.a.createElement(u["a"], {
                              visible: c.is_recaptcha,
                              callback: e => this.sendEmailVerify(e)
                            }, <button type={"submit"} disabled={60 !== this.state.sendEmailVerifyTimeout || t} className={"btn btn-block btn-primary font-w400"}>
                                                                            {60 === this.state.sendEmailVerifyTimeout ? t ? i.a.createElement(r["a"], {
                                type: "loading"
                              }) : Object(l["formatMessage"])({
                                id: "发送"
                              }) : this.state.sendEmailVerifyTimeout}
                                                                        </button>)}
                                                                </div>
                                                            </div> : ""}
                                                        <div className={"form-group"}>
                                                            <input type={"password"} className={"form-control form-control-alt"} placeholder={Object(l["formatMessage"])({
                            id: "密码"
                          })} ref={"password"}></input>
                                                        </div>
                                                        <div className={"form-group"}>
                                                            <input type={"password"} className={"form-control form-control-alt"} placeholder={Object(l["formatMessage"])({
                            id: "密码"
                          })} ref={"repassword"}></input>
                                                        </div>
                                                        <div className={"form-group"}>
                                                            <input type={"text"} disabled={this.props.location.query.code} defaultValue={this.props.location.query.code} className={"form-control form-control-alt"} placeholder={Object(l["formatMessage"])({
                            id: c.is_invite_force ? "邀请码" : "邀请码(选填)"
                          })} ref={"invite"}></input>
                                                        </div>
                                                        {c.tos_url && <div className={"form-group"}>
                                                                <div className={"custom-control custom-checkbox custom-control-primary"}>
                                                                    <input type={"checkbox"} className={"custom-control-input"} checked={this.state.tosChecked} style={{
                              zIndex: 1e3
                            }} onClick={() => this.setState({
                              tosChecked: !this.state.tosChecked
                            })}></input>
                                                                    <label className={"custom-control-label"}>
                                                                        <div dangerouslySetInnerHTML={{
                                __html: Object(l["formatMessage"])({
                                  id: '我已阅读并同意 <a target="_blank" href="{url}">服务条款</a>'
                                }, {
                                  url: c.tos_url
                                })
                              }}></div>
                                                                    </label>
                                                                </div>
                                                            </div>}
                                                        <div className={"form-group mb-0"}>
                                                            {i.a.createElement(u["a"], {
                            visible: c.is_recaptcha,
                            callback: e => this.register(e)
                          }, <button disabled={n || c.tos_url && !this.state.tosChecked} type={"submit"} className={"btn btn-block btn-primary font-w400"} onClick={() => this.register()}>
                                                                    {n ? i.a.createElement(r["a"], {
                              type: "loading"
                            }) : <span>
                                                                            <i className={"si si-emoticon-smile mr-1"}></i>
                                                                            {Object(l["formatMessage"])({
                                id: "注册"
                              })}
                                                                        </span>}
                                                                </button>)}
                                                        </div>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"text-left bg-gray-lighter p-3 px-4"}>
                                        <a className={"font-size-sm text-muted"} href={"javascript:void(0);"} onClick={() => s.a.push("/login")}>
                                            {Object(l["formatMessage"])({
                      id: "返回登入"
                    })}
                                        </a>
                                        {i.a.createElement(f["a"], null, <span className={"v2board-login-i18n-btn"}>
                                                <i className={"si si-globe pr-1"}></i>
                                                <span className={"font-size-sm text-muted"} style={{
                      verticalAlign: "text-bottom"
                    }}>
                                                    {d["a"].i18nText[Object(l["getLocale"])()]}
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
legacyExports["default"] = Object(c["c"])(e => {
  var t = e.passport,
    n = e.guest;
  return {
    passport: t,
    guest: n
  };
})(h);
