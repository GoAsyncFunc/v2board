import React from "react";
import { c as connect } from "../vendor/reactRedux.js";
import ConnectedSidebar from "./Sidebar.jsx";
import ConnectedHeader from "./Header.jsx";
import { a as Icon } from "../vendor/Icon.js";
import "../vendor/iconStyles.js";
import withLocale from "../vendor/modules/624b656c.js";
const layoutTheme = window.settings.theme;

export class MainLayout extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div
                id={"page-container"}
                className={""
                    .concat(
                        window.localStorage.getItem("umi_locale"),
                        " sidebar-o ",
                    )
                    .concat(
                        "dark" === layoutTheme.sidebar ? "sidebar-dark" : "",
                        " ",
                    )
                    .concat(
                        "dark" === layoutTheme.header ? "page-header-dark" : "",
                        " side-scroll page-header-fixed main-content-boxed side-trans-enabled ",
                    )
                    .concat(this.props.layout.showNav && "sidebar-o-xs")}
            >
                <div
                    onClick={() =>
                        this.props.dispatch({
                            type: "layout/showNav",
                        })
                    }
                    className={"v2board-nav-mask"}
                    style={{
                        display: this.props.layout.showNav ? "block" : "none",
                    }}
                ></div>
                {<ConnectedSidebar {...this.props}></ConnectedSidebar>}
                {
                    <ConnectedHeader
                        {...{
                            search: this.props.search,
                            title: this.props.title,
                        }}
                    ></ConnectedHeader>
                }
                {this.props.loading ? (
                    <main id={"main-container"}>
                        <div className={"content content-full font-size-h1"}>
                            <div className={"p-md-0 p-3"}>
                                {
                                    <Icon
                                        {...{
                                            type: "loading",
                                        }}
                                    ></Icon>
                                }
                            </div>
                        </div>
                    </main>
                ) : (
                    this.props.children
                )}
            </div>
        );
    }
}
const ConnectedLayout = withLocale(
    connect((state) => ({ layout: state.layout }))(MainLayout),
);
export { ConnectedLayout as a };
export default ConnectedLayout;
