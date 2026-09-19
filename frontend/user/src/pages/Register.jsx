import React from "react";
import { Icon } from "../vendor/Icon.js";
import history from "../vendor/routerHistory.js";
import { connect } from "../vendor/reactRedux.js";
import Recaptcha from "../components/Recaptcha.jsx";
import { formatMessage, getLocale } from "../vendor/i18n.js";
import { LanguageSelector } from "../components/LanguageSelector";
import { notify } from "../vendor/siteHelpers.js";
import { localeSettings } from "../vendor/localeSettings.js";
import "../vendor/iconStyles.js";
class RegisterPage extends React.Component {
    state = {
        sendEmailVerifyTimeout: 60,
    };
    componentDidMount() {
        this.props.dispatch({
            type: "guest/getCommConfig",
        });
    }
    sendEmailVerify(recaptchaData) {
        const startCountdown = () => {
            setTimeout(() => {
                if (this.state.sendEmailVerifyTimeout !== 0) {
                    this.setState({
                        sendEmailVerifyTimeout:
                            this.state.sendEmailVerifyTimeout - 1,
                    });
                    startCountdown();
                } else {
                    this.setState({
                        sendEmailVerifyTimeout: 60,
                    });
                }
            }, 1000);
        };
        this.props.dispatch({
            type: "passport/sendEmailVerify",
            email: this.getEmail(),
            isforget: 0,
            recaptchaData,
            callback: startCountdown,
        });
    }
    getEmail() {
        const { commConfig, selectEmailSuffix: emailSuffix } = this.props.guest;
        return commConfig.email_whitelist_suffix
            ? `${this.refs.email.value}@${emailSuffix}`
            : this.refs.email.value;
    }
    register(recaptchaData) {
        const { commConfig } = this.props.guest;
        if (commConfig.tos_url && !this.state.tosChecked) {
            notify(
                "error",
                formatMessage({
                    id: "请求失败",
                }),
                formatMessage({
                    id: "请同意服务条款",
                }),
            );
            return;
        }
        if (this.refs.password.value !== this.refs.repassword.value) {
            notify(
                "error",
                formatMessage({
                    id: "请求失败",
                }),
                formatMessage({
                    id: "两次密码输入不同",
                }),
            );
            return;
        }
        this.props.dispatch({
            type: "passport/register",
            email: this.getEmail(),
            password: this.refs.password.value,
            inviteCode: this.refs.invite.value,
            emailCode: this.refs.email_code ? this.refs.email_code.value : "",
            recaptchaData,
        });
    }
    render() {
        const {
            sendEmailVerifyLoading,
            registerLoading,
            getCommConfigLoading,
        } = this.props.passport;
        const { commConfig, selectEmailSuffix: emailSuffix } = this.props.guest;
        return (
            <div id="page-container">
                <main id="main-container">
                    <div
                        className="v2board-background"
                        style={{
                            backgroundImage:
                                window.settings.background_url &&
                                `url(${window.settings.background_url})`,
                        }}
                    />
                    <div className="no-gutters v2board-auth-box">
                        <div
                            className=""
                            style={{
                                maxWidth: 450,
                                width: "100%",
                                margin: "auto",
                            }}
                        >
                            <div className="mx-2 mx-sm-0">
                                <div
                                    className="block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image"
                                    style={{
                                        boxShadow: "0 0.5rem 2rem #0000000d",
                                    }}
                                >
                                    <div className="row no-gutters">
                                        <div className="col-md-12 order-md-1 bg-white">
                                            <div className="block-content block-content-full px-lg-4 py-md-4 py-lg-4">
                                                <div className="mb-3 text-center">
                                                    <a
                                                        className="font-size-h1"
                                                        href="javascript:void(0);"
                                                    >
                                                        {window.settings
                                                            .logo ? (
                                                            <img
                                                                className="v2board-logo mb-3"
                                                                src={
                                                                    window
                                                                        .settings
                                                                        .logo
                                                                }
                                                            />
                                                        ) : (
                                                            <span className="text-dark">
                                                                {window.settings
                                                                    .title ||
                                                                    "V2Board"}
                                                            </span>
                                                        )}
                                                    </a>
                                                    {window.settings
                                                        .description && (
                                                        <p className="font-size-sm text-muted mb-3">
                                                            {
                                                                window.settings
                                                                    .description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                {getCommConfigLoading ? (
                                                    <div className="content content-full text-center">
                                                        <div
                                                            className="spinner-grow text-primary"
                                                            role="status"
                                                        >
                                                            <span className="sr-only">
                                                                {"Loading..."}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div
                                                            className={`form-group ${
                                                                commConfig.email_whitelist_suffix
                                                                    ? "v2board-email-whitelist-enable"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-alt"
                                                                placeholder={formatMessage(
                                                                    {
                                                                        id: "邮箱",
                                                                    },
                                                                )}
                                                                ref="email"
                                                            />
                                                            {commConfig.email_whitelist_suffix ? (
                                                                <select
                                                                    className="form-control form-control-alt"
                                                                    value={
                                                                        emailSuffix
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) => {
                                                                        this.props.dispatch(
                                                                            {
                                                                                type: "guest/setState",
                                                                                payload:
                                                                                    {
                                                                                        selectEmailSuffix:
                                                                                            event
                                                                                                .target
                                                                                                .value,
                                                                                    },
                                                                            },
                                                                        );
                                                                    }}
                                                                >
                                                                    {commConfig.email_whitelist_suffix.map(
                                                                        (
                                                                            suffix,
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    key={
                                                                                        suffix
                                                                                    }
                                                                                    value={
                                                                                        suffix
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        "@"
                                                                                    }
                                                                                    {
                                                                                        suffix
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        },
                                                                    )}
                                                                </select>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                        {commConfig.is_email_verify ? (
                                                            <div className="form-group form-row">
                                                                <div className="col-9">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-alt"
                                                                        placeholder={formatMessage(
                                                                            {
                                                                                id: "邮箱验证码",
                                                                            },
                                                                        )}
                                                                        ref="email_code"
                                                                    />
                                                                </div>
                                                                <div className="col-3">
                                                                    <Recaptcha
                                                                        visible={
                                                                            commConfig.is_recaptcha
                                                                        }
                                                                        callback={(
                                                                            recaptchaData,
                                                                        ) =>
                                                                            this.sendEmailVerify(
                                                                                recaptchaData,
                                                                            )
                                                                        }
                                                                    >
                                                                        <button
                                                                            type="submit"
                                                                            disabled={
                                                                                60 !==
                                                                                    this
                                                                                        .state
                                                                                        .sendEmailVerifyTimeout ||
                                                                                sendEmailVerifyLoading
                                                                            }
                                                                            className="btn btn-block btn-primary font-w400"
                                                                        >
                                                                            {60 ===
                                                                            this
                                                                                .state
                                                                                .sendEmailVerifyTimeout ? (
                                                                                sendEmailVerifyLoading ? (
                                                                                    <Icon type="loading" />
                                                                                ) : (
                                                                                    formatMessage(
                                                                                        {
                                                                                            id: "发送",
                                                                                        },
                                                                                    )
                                                                                )
                                                                            ) : (
                                                                                this
                                                                                    .state
                                                                                    .sendEmailVerifyTimeout
                                                                            )}
                                                                        </button>
                                                                    </Recaptcha>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <div className="form-group">
                                                            <input
                                                                type="password"
                                                                className="form-control form-control-alt"
                                                                placeholder={formatMessage(
                                                                    {
                                                                        id: "密码",
                                                                    },
                                                                )}
                                                                ref="password"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                type="password"
                                                                className="form-control form-control-alt"
                                                                placeholder={formatMessage(
                                                                    {
                                                                        id: "密码",
                                                                    },
                                                                )}
                                                                ref="repassword"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                disabled={
                                                                    this.props
                                                                        .location
                                                                        .query
                                                                        .code
                                                                }
                                                                defaultValue={
                                                                    this.props
                                                                        .location
                                                                        .query
                                                                        .code
                                                                }
                                                                className="form-control form-control-alt"
                                                                placeholder={formatMessage(
                                                                    {
                                                                        id: commConfig.is_invite_force
                                                                            ? "邀请码"
                                                                            : "邀请码(选填)",
                                                                    },
                                                                )}
                                                                ref="invite"
                                                            />
                                                        </div>
                                                        {commConfig.tos_url && (
                                                            <div className="form-group">
                                                                <div className="custom-control custom-checkbox custom-control-primary">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="custom-control-input"
                                                                        checked={
                                                                            this
                                                                                .state
                                                                                .tosChecked
                                                                        }
                                                                        style={{
                                                                            zIndex: 1e3,
                                                                        }}
                                                                        onClick={() =>
                                                                            this.setState(
                                                                                {
                                                                                    tosChecked:
                                                                                        !this
                                                                                            .state
                                                                                            .tosChecked,
                                                                                },
                                                                            )
                                                                        }
                                                                    />
                                                                    <label className="custom-control-label">
                                                                        <div
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: formatMessage(
                                                                                    {
                                                                                        id: '我已阅读并同意 <a target="_blank" href="{url}">服务条款</a>',
                                                                                    },
                                                                                    {
                                                                                        url: commConfig.tos_url,
                                                                                    },
                                                                                ),
                                                                            }}
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="form-group mb-0">
                                                            <Recaptcha
                                                                visible={
                                                                    commConfig.is_recaptcha
                                                                }
                                                                callback={(
                                                                    recaptchaData,
                                                                ) =>
                                                                    this.register(
                                                                        recaptchaData,
                                                                    )
                                                                }
                                                            >
                                                                <button
                                                                    disabled={
                                                                        registerLoading ||
                                                                        (commConfig.tos_url &&
                                                                            !this
                                                                                .state
                                                                                .tosChecked)
                                                                    }
                                                                    type="submit"
                                                                    className="btn btn-block btn-primary font-w400"
                                                                    onClick={() =>
                                                                        this.register()
                                                                    }
                                                                >
                                                                    {registerLoading ? (
                                                                        <Icon type="loading" />
                                                                    ) : (
                                                                        <span>
                                                                            <i className="si si-emoticon-smile mr-1" />
                                                                            {formatMessage(
                                                                                {
                                                                                    id: "注册",
                                                                                },
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            </Recaptcha>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left bg-gray-lighter p-3 px-4">
                                        <a
                                            className="font-size-sm text-muted"
                                            href="javascript:void(0);"
                                            onClick={() =>
                                                history.push("/login")
                                            }
                                        >
                                            {formatMessage({
                                                id: "返回登入",
                                            })}
                                        </a>
                                        <LanguageSelector>
                                            <span className="v2board-login-i18n-btn">
                                                <i className="si si-globe pr-1" />
                                                <span
                                                    className="font-size-sm text-muted"
                                                    style={{
                                                        verticalAlign:
                                                            "text-bottom",
                                                    }}
                                                >
                                                    {
                                                        localeSettings.i18nText[
                                                            getLocale()
                                                        ]
                                                    }
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
export default connect((state) => {
    return {
        passport: state.passport,
        guest: state.guest,
    };
})(RegisterPage);
