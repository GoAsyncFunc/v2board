import React from 'react';
import { connect } from 'react-redux';
import { createNavigation } from '../../config/navigation';
import type { NavigationItem } from '../../config/navigation';
import history from '../../app/history';
import type { AdminDispatch } from '../../types/store';
import '../../config/siteSettings';
import SidebarNavigation from './components/SidebarNavigation';

interface SidebarOwnProps {
    location: { pathname: string };
}

interface SidebarDispatchProps {
    dispatch: AdminDispatch;
}

type SidebarProps = SidebarOwnProps & SidebarDispatchProps;
interface SidebarState {
    navigation: NavigationItem[];
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
    state: SidebarState = { navigation: createNavigation() };

    navigateTo(href: string): void {
        history.push(href);
        this.props.dispatch({ type: 'layout/showNav', show: false });
    }

    render(): React.ReactNode {
        const siteTitle = window.settings.title || 'V2Board';
        return (
            <nav id="sidebar">
                <div className="smini-hidden bg-header-dark">
                    <div className="content-header justify-content-lg-center bg-black-10">
                        <a className="link-fx font-size-lg text-white" href="/">
                            <span className="text-white-75">{siteTitle}</span>
                        </a>
                        <div className="d-lg-none">
                            <a
                                className="text-white ml-2"
                                data-toggle="layout"
                                data-action="sidebar_close"
                                href="javascript:void(0);"
                                onClick={() => this.props.dispatch({ type: 'layout/showNav' })}
                            >
                                <i className="fa fa-times-circle" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="content-side content-side-full">
                    <SidebarNavigation
                        items={this.state.navigation}
                        pathname={this.props.location.pathname}
                        onNavigate={(href) => this.navigateTo(href)}
                    />
                </div>
                <div className="v2board-copyright">{siteTitle} v1.7.5</div>
            </nav>
        );
    }
}

export default connect(null, (dispatch) => ({ dispatch: dispatch as AdminDispatch }))(Sidebar);
