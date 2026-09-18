let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
require("../vendor/modules/474e4e74.js");
var r = require("../vendor/modules/antdConfigProvider.js"),
  i = require("../vendor/modules/reactRuntime.js"),
  o = interopDefault(i),
  a = require("../vendor/routerHistory.js"),
  s = interopDefault(a),
  l = require("../vendor/reactRedux.js");
require("../vendor/siteSettings.js");
class c extends o.a.Component {
  constructor(e) {
    super(e), this.state = {
      nav: [{
        title: "仪表盘",
        type: "item",
        href: "/dashboard",
        icon: <i className={"nav-main-link-icon si si-speedometer"}></i>
      }, {
        title: "设置",
        type: "heading"
      }, {
        title: "系统配置",
        type: "item",
        href: "/config/system",
        icon: <i className={"nav-main-link-icon si si-equalizer"}></i>
      }, {
        title: "支付配置",
        type: "item",
        href: "/config/payment",
        icon: <i className={"nav-main-link-icon si si-credit-card"}></i>
      }, {
        title: "主题配置",
        type: "item",
        href: "/config/theme",
        icon: <i className={"nav-main-link-icon si si-magic-wand"}></i>
      }, {
        title: "服务器",
        type: "heading"
      }, {
        title: "节点管理",
        type: "item",
        href: "/server/manage",
        icon: <i className={"nav-main-link-icon si si-layers"}></i>
      }, {
        title: "权限组管理",
        type: "item",
        href: "/server/group",
        icon: <i className={"nav-main-link-icon si si-wrench"}></i>
      }, {
        title: "路由管理",
        type: "item",
        href: "/server/route",
        icon: <i className={"nav-main-link-icon si si-shuffle"}></i>
      }, {
        title: "财务",
        type: "heading"
      }, {
        title: "订阅管理",
        type: "item",
        href: "/plan",
        icon: <i className={"nav-main-link-icon si si-bag"}></i>
      }, {
        title: "订单管理",
        type: "item",
        href: "/order",
        icon: <i className={"nav-main-link-icon si si-list"}></i>
      }, {
        title: "优惠券管理",
        type: "item",
        href: "/coupon",
        icon: <i className={"nav-main-link-icon si si-present"}></i>
      }, {
        title: "礼品卡管理",
        type: "item",
        href: "/giftcard",
        icon: <i className={"nav-main-link-icon si si-star"}></i>
      }, {
        title: "用户",
        type: "heading"
      }, {
        title: "用户管理",
        type: "item",
        href: "/user",
        icon: <i className={"nav-main-link-icon si si-users"}></i>
      }, {
        title: "公告管理",
        type: "item",
        href: "/notice",
        icon: <i className={"nav-main-link-icon si si-speech"}></i>
      }, {
        title: "工单管理",
        type: "item",
        href: "/ticket",
        icon: <i className={"nav-main-link-icon si si-support"}></i>
      }, {
        title: "知识库管理",
        type: "item",
        href: "/knowledge",
        icon: <i className={"nav-main-link-icon si si-bulb"}></i>
      }, {
        title: "指标",
        type: "heading"
      }, {
        title: "队列监控",
        type: "item",
        href: "/queue",
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
      case "href":
        return <li key={Math.random()} className={"nav-main-item"}>
                        <a className={"nav-main-link"} target={"_blank"} href={n} rel={"noreferrer"}>
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
                    <div className={"content-header justify-content-lg-center bg-black-10"}>
                        <a className={"link-fx font-size-lg text-white"} href={"/"}>
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
                    {" v1.7.5"}
                </div>
            </nav>;
  }
}
var u = Object(l["c"])(e => {
    var t = e.layout;
    return {
      layout: t
    };
  })(c),
  h = (require("../services/request.js"), require("../vendor/modules/6e444349.js")),
  f = require("../vendor/siteHelpers.js"),
  d = window.settings.theme;
class p extends o.a.Component {
  constructor(e) {
    super(e), this.state = {
      showAvatarMenu: !1,
      showSearchBar: !1
    };
  }
  componentDidMount() {
    var e = this.props.user.userInfo;
    e.email || this.props.dispatch({
      type: "user/getUserInfo"
    });
  }
  showAvatarMenu() {
    var e = this;
    this.setState({
      showAvatarMenu: !this.state.showAvatarMenu
    }, () => {
      document.onclick = function (t) {
        e.state.showAvatarMenu && e.setState({
          showAvatarMenu: !1
        }), document.onclick = void 0;
      };
    });
  }
  logout() {
    Object(f["g"])(), s.a.push("/login");
  }
  darkMode() {
    "1" === Object(f["d"])("dark_mode") ? (Object(h["disable"])(), Object(f["i"])("dark_mode", 0)) : (Object(h["enable"])({
      brightness: 100,
      contrast: 90,
      sepia: 10
    }), Object(f["i"])("dark_mode", 1)), this.forceUpdate();
  }
  render() {
    var e = this.props.user.userInfo;
    return <header id={"page-header"}>
                <div className={"content-header"} style={{
        maxWidth: "unset"
      }}>
                    <div className={"sidebar-toggle"} style={{
          display: this.props.search ? "block" : "none"
        }}>
                        <button type={"button"} className={"dark" === d.header ? "btn btn-primary mr-1 d-lg-none" : "btn mr-1 d-lg-none"} onClick={() => this.props.dispatch({
            type: "layout/showNav"
          })}>
                            <i className={"fa fa-fw fa-bars"}></i>
                        </button>
                        {this.props.search && <button type={"button"} className={"dark" === d.header ? "btn btn-primary" : "btn"} onClick={() => {
            this.setState({
              showSearchBar: !0
            });
          }}>
                                <i className={"fa fa-fw fa-search"}></i>{" "}
                                <span className={"ml-1 d-none d-sm-inline-block"}>
                                    {"搜索"}
                                </span>
                            </button>}
                    </div>
                    <div className={"dark" === d.header ? "v2board-container-title text-white" : "v2board-container-title text-black"}>
                        {this.props.title}
                    </div>
                    <div>
                        <div className={"dropdown d-inline-block"}>
                            <button type={"button"} className={"dark" === d.header ? "btn btn-primary mr-1" : "btn mr-1"} onClick={() => this.darkMode()}>
                                {"1" === Object(f["d"])("dark_mode") ? <i className={"far fa fa-moon"}></i> : <i className={"far fa fa-sun"}></i>}
                            </button>
                        </div>
                        {this.state.loading ? <div className={"spinner-grow text-primary"}></div> : <div className={"dropdown d-inline-block"}>
                                <button type={"button"} className={"dark" === d.header ? "btn btn-primary" : "btn"} id={"page-header-user-dropdown"} data-toggle={"dropdown"} aria-haspopup={"true"} aria-expanded={"false"} onClick={() => this.showAvatarMenu()}>
                                    <i className={"far fa fa-user-circle"}></i>
                                    <span className={"d-none d-lg-inline ml-1"}>
                                        {e.email}
                                    </span>
                                    <i className={"fa fa-fw fa-angle-down ml-1"}></i>
                                </button>
                                <div className={"dropdown-menu dropdown-menu-right dropdown-menu-lg p-0 ".concat(this.state.showAvatarMenu && "show")} aria-labelledby={"page-header-user-dropdown"}>
                                    <div className={"p-2"}>
                                        <a className={"dropdown-item d-flex justify-content-between align-items-center"} href={"javascript:void(0);"} onClick={() => this.logout()}>
                                            {"登出"}
                                            <i className={"fa fa-fw fa-sign-out-alt text-danger ml-1"}></i>
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
var m = Object(l["c"])(e => {
  var t = e.layout,
    n = e.user;
  return {
    layout: t,
    user: n
  };
})(p);
var g = require("../vendor/modules/antdZhCnLocale.js"),
  v = window.settings.theme;
class y extends o.a.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return o.a.createElement(r["a"], {
      locale: g["a"]
    }, <div id={"page-container"} className={"sidebar-o ".concat("dark" === v.sidebar ? "sidebar-dark" : "", " ").concat("dark" === v.header ? "page-header-dark" : "", " side-scroll page-header-fixed main-content-boxed side-trans-enabled ").concat(this.props.layout.showNav && "sidebar-o-xs")}>
                <div onClick={() => this.props.dispatch({
        type: "layout/showNav"
      })} className={"v2board-nav-mask"} style={{
        display: this.props.layout.showNav ? "block" : "none"
      }}></div>
                {o.a.createElement(u, this.props)}
                {o.a.createElement(m, {
        search: this.props.search,
        title: this.props.title
      })}
                {this.props.loading ? <main id={"main-container"}>
                        <div className={"content content-full text-center pt-5"}>
                            <div className={"spinner-grow text-primary"} role={"status"}>
                                <span className={"sr-only"}>
                                    {"Loading..."}
                                </span>
                            </div>
                        </div>
                    </main> : <main id={"main-container"}>
                        <div className={"p-0 p-lg-4"}>
                            {this.props.children}
                        </div>
                    </main>}
            </div>);
  }
}
legacyExports["a"] = Object(l["c"])(e => {
  var t = e.layout;
  return {
    layout: t
  };
})(y);
