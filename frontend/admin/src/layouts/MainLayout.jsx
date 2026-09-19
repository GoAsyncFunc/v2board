import React from "react";
import { c as connect } from "../vendor/reactRedux.js";
import ConnectedSidebar from "./Sidebar.jsx";
import ConnectedHeader from "./Header.jsx";
import { ConfigProvider } from "../vendor/ui.js";
import { chineseLocale } from "../vendor/content.js";

import "../vendor/componentStyles.js";
const layoutTheme = window.settings.theme;

export class MainLayout extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <ConfigProvider
                {...{
                    locale: chineseLocale,
                }}
            >
                <div
                    id={"page-container"}
                    className={"sidebar-o "
                        .concat(
                            "dark" === layoutTheme.sidebar
                                ? "sidebar-dark"
                                : "",
                            " ",
                        )
                        .concat(
                            "dark" === layoutTheme.header
                                ? "page-header-dark"
                                : "",
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
                            display: this.props.layout.showNav
                                ? "block"
                                : "none",
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
                            <div
                                className={
                                    "content content-full text-center pt-5"
                                }
                            >
                                <div
                                    className={"spinner-grow text-primary"}
                                    role={"status"}
                                >
                                    <span className={"sr-only"}>
                                        {"Loading..."}
                                    </span>
                                </div>
                            </div>
                        </main>
                    ) : (
                        <main id={"main-container"}>
                            <div className={"p-0 p-lg-4"}>
                                {this.props.children}
                            </div>
                        </main>
                    )}
                </div>
            </ConfigProvider>
        );
    }
}
const ConnectedLayout = connect((state) => ({ layout: state.layout }))(
    MainLayout,
);
export { ConnectedLayout as a };
export default ConnectedLayout;
