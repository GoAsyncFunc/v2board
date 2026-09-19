import { createNavigation } from "../config/navigation.jsx";
import React from "react";
import { connect } from "../vendor/reactRedux.js";
import history from "../vendor/routerHistory.js";
import "../vendor/siteSettings.js";
export class Sidebar extends React.Component {
  constructor(e) {
    super(e), this.state = {
      nav: createNavigation()
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
            history.push(n), this.props.dispatch({
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
export default connect(state => ({
  layout: state.layout
}))(Sidebar);
