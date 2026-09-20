import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';
import Icon from 'antd/lib/icon';
import ConnectedSidebar from './Sidebar';
import ConnectedHeader from './Header';
import type { HeaderSearchConfig } from './Header';
import history from '../app/history';
import type { LayoutState } from '../types/contentModels';
import type { UserDispatch, UserRootState } from '../types/store';

interface MainLayoutOwnProps {
    children?: React.ReactNode;
    loading?: boolean;
    location?: { pathname: string };
    search?: HeaderSearchConfig;
    title?: React.ReactNode;
}
interface MainLayoutStateProps {
    layout: LayoutState;
}
interface MainLayoutDispatchProps {
    dispatch: UserDispatch;
}
type MainLayoutProps = MainLayoutOwnProps & MainLayoutStateProps & MainLayoutDispatchProps;

const layoutTheme = window.settings.theme;

export class MainLayout extends React.Component<MainLayoutProps> {
    componentDidMount(): void {
        window.scrollTo(0, 0);
    }

    render(): React.ReactNode {
        const { children, dispatch, layout, loading, location, search, title } = this.props;
        const localeClass = window.localStorage.getItem('umi_locale');
        const sidebarThemeClass = layoutTheme.sidebar === 'dark' ? 'sidebar-dark' : '';
        const headerThemeClass = layoutTheme.header === 'dark' ? 'page-header-dark' : '';
        const mobileSidebarClass = layout.showNav && 'sidebar-o-xs';
        const containerClassName = `${localeClass} sidebar-o ${sidebarThemeClass} ${headerThemeClass} side-scroll page-header-fixed main-content-boxed side-trans-enabled ${mobileSidebarClass}`;
        return (
            <div id="page-container" className={containerClassName}>
                <div
                    onClick={() => dispatch({ type: 'layout/showNav' })}
                    className="v2board-nav-mask"
                    style={{ display: layout.showNav ? 'block' : 'none' }}
                />
                <ConnectedSidebar {...this.props} location={location || history.location} />
                <ConnectedHeader search={search} title={title} />
                {loading ? (
                    <main id="main-container">
                        <div className="content content-full font-size-h1">
                            <div className="p-md-0 p-3">
                                <Icon type="loading" />
                            </div>
                        </div>
                    </main>
                ) : (
                    children
                )}
            </div>
        );
    }
}

const ConnectedLayout = connect<
    MainLayoutStateProps,
    MainLayoutDispatchProps,
    MainLayoutOwnProps,
    UserRootState
>((state) => ({ layout: state.layout }))(MainLayout);

export default withRouter<MainLayoutOwnProps & RouteComponentProps, typeof ConnectedLayout>(
    ConnectedLayout,
);
