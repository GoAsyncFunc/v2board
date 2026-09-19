import React from "react";
import { connect } from "../vendor/reactRedux.js";
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from "../vendor/theme.js";
import {
    getCookie,
    setCookie,
} from "../vendor/siteHelpers.js";
import { formatMessage } from "../vendor/i18n.js";
import { LanguageSelector } from "../components/LanguageSelector.jsx";
const headerTheme = window.settings.theme;

export class Header extends React.Component {
    constructor(props) {
        (super(props),
            (this.state = {
                loading: !1,
                showAvatarMenu: !1,
                showSearchBar: !1,
                showLangMenu: !1,
            }));
    }
    componentDidMount() {
        const userInfo = this.props.user.userInfo;
        userInfo.email ||
            this.props.dispatch({
                type: "user/getUserInfo",
            });
    }
    showDropmenu(menuKey) {
        this.setState(
            {
                [menuKey]: !this.state[menuKey],
            },
            () => {
                document.onclick = () => {
                    (this.state[menuKey] &&
                        this.setState({
                            showAvatarMenu: !1,
                            showLangMenu: !1,
                        }),
                        (document.onclick = void 0));
                };
            },
        );
    }
    logout() {
        this.props.dispatch({
            type: "user/logout",
        });
    }
    darkMode() {
        ("1" === getCookie("dark_mode")
            ? (disableDarkMode(), setCookie("dark_mode", 0))
            : (enableDarkMode({
                  brightness: 100,
                  contrast: 90,
                  sepia: 10,
              }),
              setCookie("dark_mode", 1)),
            this.forceUpdate());
    }
    render() {
        const userInfo = this.props.user.userInfo;
        return (
            <header id={"page-header"}>
                <div className={"content-header"}>
                    <div
                        className={"sidebar-toggle"}
                        style={{
                            display: this.props.search ? "block" : "none",
                        }}
                    >
                        <button
                            type={"button"}
                            className={
                                "dark" === headerTheme.header
                                    ? "btn btn-primary mr-1 d-lg-none"
                                    : "btn mr-1 d-lg-none"
                            }
                            onClick={() =>
                                this.props.dispatch({
                                    type: "layout/showNav",
                                })
                            }
                        >
                            <i className={"fa fa-fw fa-bars"}></i>
                        </button>
                        {this.props.search && (
                            <button
                                type={"button"}
                                className={
                                    "dark" === headerTheme.header
                                        ? "btn btn-primary"
                                        : "btn"
                                }
                                onClick={() => {
                                    this.setState({
                                        showSearchBar: !0,
                                    });
                                }}
                            >
                                <i className={"fa fa-fw fa-search"}></i>{" "}
                                <span
                                    className={"ml-1 d-none d-sm-inline-block"}
                                >
                                    {formatMessage({
                                        id: "搜索",
                                    })}
                                </span>
                            </button>
                        )}
                    </div>
                    <div
                        className={
                            "dark" === headerTheme.header
                                ? "v2board-container-title text-white"
                                : "v2board-container-title text-black"
                        }
                    >
                        {this.props.title}
                    </div>
                    <div>
                        <div className={"dropdown d-inline-block"}>
                            <button
                                type={"button"}
                                className={
                                    "dark" === headerTheme.header
                                        ? "btn btn-primary mr-1"
                                        : "btn mr-1"
                                }
                                onClick={() => this.darkMode()}
                            >
                                {"1" === getCookie("dark_mode") ? (
                                    <i className={"far fa fa-moon"}></i>
                                ) : (
                                    <i className={"far fa fa-sun"}></i>
                                )}
                            </button>
                        </div>
                        <div className={"dropdown d-inline-block"}>
                            {
                                <LanguageSelector>
                                    <button
                                        type={"button"}
                                        className={
                                            "dark" === headerTheme.header
                                                ? "btn btn-primary mr-1"
                                                : "btn mr-1"
                                        }
                                    >
                                        <i className={"far fa fa-language"}></i>
                                    </button>
                                </LanguageSelector>
                            }
                        </div>
                        {this.state.loading ? (
                            <div className={"spinner-grow text-primary"}></div>
                        ) : (
                            <div className={"dropdown d-inline-block"}>
                                <button
                                    type={"button"}
                                    className={
                                        "dark" === headerTheme.header
                                            ? "btn btn-primary"
                                            : "btn"
                                    }
                                    onClick={() =>
                                        this.showDropmenu("showAvatarMenu")
                                    }
                                >
                                    <i className={"far fa fa-user-circle"}></i>
                                    <span className={"d-none d-lg-inline ml-1"}>
                                        {userInfo.email || "Loading..."}
                                    </span>
                                    <i
                                        className={
                                            "fa fa-fw fa-angle-down ml-1"
                                        }
                                    ></i>
                                </button>
                                <div
                                    className={"dropdown-menu dropdown-menu-right p-0 ".concat(
                                        this.state.showAvatarMenu && "show",
                                    )}
                                >
                                    <div className={"p-2"}>
                                        <a
                                            className={"dropdown-item"}
                                            href={"/#/profile"}
                                        >
                                            <i
                                                className={
                                                    "far fa-fw fa-user mr-1"
                                                }
                                            ></i>{" "}
                                            {formatMessage({
                                                id: "个人中心",
                                            })}
                                        </a>
                                        <a
                                            className={"dropdown-item"}
                                            href={"javascript:void(0);"}
                                            onClick={() => this.logout()}
                                        >
                                            <i
                                                className={
                                                    "far fa-fw fa-arrow-alt-circle-left mr-1"
                                                }
                                            ></i>{" "}
                                            {formatMessage({
                                                id: "登出",
                                            })}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {this.props.search && (
                    <div
                        className={"overlay-header bg-dark ".concat(
                            this.state.showSearchBar ? "show" : "",
                        )}
                    >
                        <div className={"content-header bg-dark"}>
                            <div className={"w-100"}>
                                <div className={"input-group"}>
                                    <div className={"input-group-prepend"}>
                                        <button
                                            type={"button"}
                                            className={"btn btn-dark"}
                                            onClick={() => {
                                                this.setState({
                                                    showSearchBar: !1,
                                                });
                                            }}
                                        >
                                            <i
                                                className={
                                                    "fa fa-fw fa-times-circle"
                                                }
                                            ></i>
                                        </button>
                                    </div>
                                    <input
                                        type={"text"}
                                        className={"form-control border-0"}
                                        placeholder={
                                            this.props.search.placeholder
                                        }
                                        onChange={(e) =>
                                            this.props.search.onChange(
                                                e.target.value,
                                            )
                                        }
                                        defaultValue={
                                            this.props.search.defaultValue
                                        }
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        );
    }
}
export default connect((state) => ({ user: state.user }))(Header);
