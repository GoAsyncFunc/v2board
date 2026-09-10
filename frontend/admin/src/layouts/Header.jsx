import React from "react";
import { c as connect } from "../vendor/reactRedux.js";
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from "../vendor/modules/6e444349.js";
import {
    d as getPreference,
    i as setPreference,
    g as clearToken,
} from "../vendor/siteHelpers.js";
import history from "../vendor/routerHistory.js";
import "../services/request.js";
const headerTheme = window.settings.theme;

export class Header extends React.Component {
    constructor(e) {
        (super(e),
            (this.state = {
                showAvatarMenu: !1,
                showSearchBar: !1,
            }));
    }
    componentDidMount() {
        var e = this.props.user.userInfo;
        e.email ||
            this.props.dispatch({
                type: "user/getUserInfo",
            });
    }
    showAvatarMenu() {
        var e = this;
        this.setState(
            {
                showAvatarMenu: !this.state.showAvatarMenu,
            },
            () => {
                document.onclick = function (t) {
                    (e.state.showAvatarMenu &&
                        e.setState({
                            showAvatarMenu: !1,
                        }),
                        (document.onclick = void 0));
                };
            },
        );
    }
    logout() {
        (clearToken(), history.push("/login"));
    }
    darkMode() {
        ("1" === getPreference("dark_mode")
            ? (disableDarkMode(), setPreference("dark_mode", 0))
            : (enableDarkMode({
                  brightness: 100,
                  contrast: 90,
                  sepia: 10,
              }),
              setPreference("dark_mode", 1)),
            this.forceUpdate());
    }
    render() {
        var e = this.props.user.userInfo;
        return (
            <header id={"page-header"}>
                <div
                    className={"content-header"}
                    style={{
                        maxWidth: "unset",
                    }}
                >
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
                                    {"搜索"}
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
                                {"1" === getPreference("dark_mode") ? (
                                    <i className={"far fa fa-moon"}></i>
                                ) : (
                                    <i className={"far fa fa-sun"}></i>
                                )}
                            </button>
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
                                    id={"page-header-user-dropdown"}
                                    data-toggle={"dropdown"}
                                    aria-haspopup={"true"}
                                    aria-expanded={"false"}
                                    onClick={() => this.showAvatarMenu()}
                                >
                                    <i className={"far fa fa-user-circle"}></i>
                                    <span className={"d-none d-lg-inline ml-1"}>
                                        {e.email}
                                    </span>
                                    <i
                                        className={
                                            "fa fa-fw fa-angle-down ml-1"
                                        }
                                    ></i>
                                </button>
                                <div
                                    className={"dropdown-menu dropdown-menu-right dropdown-menu-lg p-0 ".concat(
                                        this.state.showAvatarMenu && "show",
                                    )}
                                    aria-labelledby={
                                        "page-header-user-dropdown"
                                    }
                                >
                                    <div className={"p-2"}>
                                        <a
                                            className={
                                                "dropdown-item d-flex justify-content-between align-items-center"
                                            }
                                            href={"javascript:void(0);"}
                                            onClick={() => this.logout()}
                                        >
                                            {"登出"}
                                            <i
                                                className={
                                                    "fa fa-fw fa-sign-out-alt text-danger ml-1"
                                                }
                                            ></i>
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
export default connect((state) => ({ user: state.user, layout: state.layout }))(
    Header,
);
