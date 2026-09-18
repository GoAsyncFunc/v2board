let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
require("../vendor/iconStyles.js");
var r = require("../vendor/Icon.js"),
  o = require("../vendor/modules/reactRuntime.js"),
  i = interopDefault(o),
  a = require("../vendor/routerHistory.js"),
  s = interopDefault(a),
  c = require("../vendor/reactRedux.js"),
  u = require("../vendor/i18n.js");
class l extends i.a.Component {
  constructor() {
    super(...arguments), this.state = {
      nav: [{
        title: Object(u["formatMessage"])({
          id: "仪表盘"
        }),
        type: "item",
        href: "/dashboard",
        icon: <i className={"nav-main-link-icon si si-speedometer"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "使用文档"
        }),
        type: "item",
        href: "/knowledge",
        icon: <i className={"nav-main-link-icon si si-book-open"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "订阅"
        }),
        type: "heading"
      }, {
        title: Object(u["formatMessage"])({
          id: "购买订阅"
        }),
        type: "item",
        href: "/plan",
        icon: <i className={"nav-main-link-icon si si-bag"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "节点状态"
        }),
        type: "item",
        href: "/node",
        icon: <i className={"nav-main-link-icon si si-check"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "财务"
        }),
        type: "heading"
      }, {
        title: Object(u["formatMessage"])({
          id: "我的订单"
        }),
        type: "item",
        href: "/order",
        icon: <i className={"nav-main-link-icon si si-list"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "我的邀请"
        }),
        type: "item",
        href: "/invite",
        icon: <i className={"nav-main-link-icon si si-users"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "用户"
        }),
        type: "heading"
      }, {
        title: Object(u["formatMessage"])({
          id: "个人中心"
        }),
        type: "item",
        href: "/profile",
        icon: <i className={"nav-main-link-icon si si-user"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "我的工单"
        }),
        type: "item",
        href: "/ticket",
        icon: <i className={"nav-main-link-icon si si-support"}></i>
      }, {
        title: Object(u["formatMessage"])({
          id: "流量明细"
        }),
        type: "item",
        href: "/traffic",
        icon: <i className={"nav-main-link-icon si si-bar-chart"}></i>
      }]
    };
  }
  componentDidMount() {}
  renderMenu(e, t, n, r) {
    switch (e) {
      case "heading":
        return <li key={Math.random()} className={"nav-main-heading"}>
                        {t}
                    </li>;
      case "item":
        return <li key={Math.random()} className={"nav-main-item"}>
                        <a className={"nav-main-link ".concat(this.props.location.pathname === n && "active")} onClick={() => {
            s.a.push(n), this.props.dispatch({
              type: "layout/showNav",
              show: !1
            });
          }}>
                            {r && r}
                            <span className={"nav-main-link-name"}>{t}</span>
                        </a>
                    </li>;
    }
  }
  isAdmin() {
    return -1 !== this.props.location.pathname.indexOf("admin");
  }
  render() {
    return <nav id={"sidebar"}>
                <div className={"smini-hidden bg-header-dark"}>
                    <div className={"content-header justify-content-lg-center bg-white-10"}>
                        <a className={"font-size-lg text-white"} href={"/"}>
                            <span className={"text-white-75"}>
                                {window.settings.title ? window.settings.title : "V2Board"}
                            </span>
                        </a>
                        <div className={"d-lg-none"}>
                            <a className={"text-white ml-2"} data-toggle={"layout"} data-action={"sidebar_close"} href={"javascript:void(0);"} onClick={() => this.props.dispatch({
              type: "layout/showNav"
            })}>
                                <i className={"fa fa-times-circle"}></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={"content-side content-side-full"}>
                    <ul className={"nav-main"}>
                        {this.state.nav.map(e => {
            return this.renderMenu(e.type, e.title, e.href, e.icon);
          })}
                    </ul>
                </div>
                <div className={"v2board-copyright"}>
                    {window.settings.title ? window.settings.title : "V2Board"}
                    {" v1.7.4"}
                </div>
            </nav>;
  }
}
var f = Object(c["c"])(e => {
    var t = e.header;
    return {
      header: t
    };
  })(l),
  p = require("../components/LanguageSelector.jsx"),
  d = require("../vendor/modules/6e444349.js"),
  h = require("../vendor/siteHelpers.js"),
  m = window.settings.theme;
class v extends i.a.Component {
  constructor(e) {
    super(e), this.state = {
      loading: !1,
      showAvatarMenu: !1,
      showSearchBar: !1,
      showLangMenu: !1
    };
  }
  componentDidMount() {
    var e = this.props.user.userInfo;
    e.email || this.props.dispatch({
      type: "user/getUserInfo"
    });
  }
  showDropmenu(e) {
    var t = this;
    this.setState({
      [e]: !this.state[e]
    }, () => {
      document.onclick = function (n) {
        t.state[e] && t.setState({
          showAvatarMenu: !1,
          showLangMenu: !1
        }), document.onclick = void 0;
      };
    });
  }
  logout() {
    this.props.dispatch({
      type: "user/logout"
    });
  }
  darkMode() {
    "1" === Object(h["e"])("dark_mode") ? (Object(d["disable"])(), Object(h["q"])("dark_mode", 0)) : (Object(d["enable"])({
      brightness: 100,
      contrast: 90,
      sepia: 10
    }), Object(h["q"])("dark_mode", 1)), this.forceUpdate();
  }
  render() {
    var e = this.props.user.userInfo;
    return <header id={"page-header"}>
                <div className={"content-header"}>
                    <div className={"sidebar-toggle"} style={{
          display: this.props.search ? "block" : "none"
        }}>
                        <button type={"button"} className={"dark" === m.header ? "btn btn-primary mr-1 d-lg-none" : "btn mr-1 d-lg-none"} onClick={() => this.props.dispatch({
            type: "layout/showNav"
          })}>
                            <i className={"fa fa-fw fa-bars"}></i>
                        </button>
                        {this.props.search && <button type={"button"} className={"dark" === m.header ? "btn btn-primary" : "btn"} onClick={() => {
            this.setState({
              showSearchBar: !0
            });
          }}>
                                <i className={"fa fa-fw fa-search"}></i>{" "}
                                <span className={"ml-1 d-none d-sm-inline-block"}>
                                    {Object(u["formatMessage"])({
                id: "搜索"
              })}
                                </span>
                            </button>}
                    </div>
                    <div className={"dark" === m.header ? "v2board-container-title text-white" : "v2board-container-title text-black"}>
                        {this.props.title}
                    </div>
                    <div>
                        <div className={"dropdown d-inline-block"}>
                            <button type={"button"} className={"dark" === m.header ? "btn btn-primary mr-1" : "btn mr-1"} onClick={() => this.darkMode()}>
                                {"1" === Object(h["e"])("dark_mode") ? <i className={"far fa fa-moon"}></i> : <i className={"far fa fa-sun"}></i>}
                            </button>
                        </div>
                        <div className={"dropdown d-inline-block"}>
                            {i.a.createElement(p["a"], null, <button type={"button"} className={"dark" === m.header ? "btn btn-primary mr-1" : "btn mr-1"}>
                                    <i className={"far fa fa-language"}></i>
                                </button>)}
                        </div>
                        {this.state.loading ? <div className={"spinner-grow text-primary"}></div> : <div className={"dropdown d-inline-block"}>
                                <button type={"button"} className={"dark" === m.header ? "btn btn-primary" : "btn"} onClick={() => this.showDropmenu("showAvatarMenu")}>
                                    <i className={"far fa fa-user-circle"}></i>
                                    <span className={"d-none d-lg-inline ml-1"}>
                                        {e.email || "Loading..."}
                                    </span>
                                    <i className={"fa fa-fw fa-angle-down ml-1"}></i>
                                </button>
                                <div className={"dropdown-menu dropdown-menu-right p-0 ".concat(this.state.showAvatarMenu && "show")}>
                                    <div className={"p-2"}>
                                        <a className={"dropdown-item"} href={"/#/profile"}>
                                            <i className={"far fa-fw fa-user mr-1"}></i>{" "}
                                            {Object(u["formatMessage"])({
                    id: "个人中心"
                  })}
                                        </a>
                                        <a className={"dropdown-item"} href={"javascript:void(0);"} onClick={() => this.logout()}>
                                            <i className={"far fa-fw fa-arrow-alt-circle-left mr-1"}></i>{" "}
                                            {Object(u["formatMessage"])({
                    id: "登出"
                  })}
                                        </a>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
                {this.props.search && <div className={"overlay-header bg-dark ".concat(this.state.showSearchBar ? "show" : "")}>
                        <div className={"content-header bg-dark"}>
                            <div className={"w-100"}>
                                <div className={"input-group"}>
                                    <div className={"input-group-prepend"}>
                                        <button type={"button"} className={"btn btn-dark"} onClick={() => {
                  this.setState({
                    showSearchBar: !1
                  });
                }}>
                                            <i className={"fa fa-fw fa-times-circle"}></i>
                                        </button>
                                    </div>
                                    <input type={"text"} className={"form-control border-0"} placeholder={this.props.search.placeholder} onChange={e => this.props.search.onChange(e.target.value)} defaultValue={this.props.search.defaultValue}></input>
                                </div>
                            </div>
                        </div>
                    </div>}
            </header>;
  }
}
var y = Object(c["c"])(e => {
  var t = e.user;
  return {
    user: t
  };
})(v);
var g = require("../vendor/modules/withLocaleRuntime.js"),
  b = interopDefault(g),
  w = window.settings.theme;
class x extends i.a.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return <div id={"page-container"} className={"".concat(window.localStorage.getItem("umi_locale"), " sidebar-o ").concat("dark" === w.sidebar ? "sidebar-dark" : "", " ").concat("dark" === w.header ? "page-header-dark" : "", " side-scroll page-header-fixed main-content-boxed side-trans-enabled ").concat(this.props.layout.showNav && "sidebar-o-xs")}>
                <div onClick={() => this.props.dispatch({
        type: "layout/showNav"
      })} className={"v2board-nav-mask"} style={{
        display: this.props.layout.showNav ? "block" : "none"
      }}></div>
                {i.a.createElement(f, this.props)}
                {i.a.createElement(y, {
        search: this.props.search,
        title: this.props.title
      })}
                {this.props.loading ? <main id={"main-container"}>
                        <div className={"content content-full font-size-h1"}>
                            <div className={"p-md-0 p-3"}>
                                {i.a.createElement(r["a"], {
              type: "loading"
            })}
                            </div>
                        </div>
                    </main> : this.props.children}
            </div>;
  }
}
legacyExports["a"] = b()(Object(c["c"])(e => {
  var t = e.layout;
  return {
    layout: t
  };
})(x));
