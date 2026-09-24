import React from 'react';
import { connect } from 'react-redux';
import ConfigProvider from 'antd/lib/config-provider';
import chineseLocale from 'antd/lib/locale-provider/zh_CN';
import ConnectedSidebar from '../Sidebar/SidebarLayout';
import ConnectedHeader from '../Header/HeaderLayout';
import type { HeaderSearchConfig } from '../Header/HeaderLayout';
import history from '../../app/history';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { LayoutState } from '../../types/session';

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
    dispatch: AdminDispatch;
}
type MainLayoutProps = MainLayoutOwnProps & MainLayoutStateProps & MainLayoutDispatchProps;

const layoutTheme = window.settings.theme;

export class MainLayout extends React.Component<MainLayoutProps> {
    componentDidMount(): void {
        window.scrollTo(0, 0);
    }

    render(): React.ReactNode {
        const { children, dispatch, layout, loading, location, search, title } = this.props;
        const sidebarThemeClass = layoutTheme.sidebar === 'dark' ? 'sidebar-dark' : '';
        const headerThemeClass = layoutTheme.header === 'dark' ? 'page-header-dark' : '';
        const mobileSidebarClass = layout.showNav && 'sidebar-o-xs';
        const containerClassName = `sidebar-o ${sidebarThemeClass} ${headerThemeClass} side-scroll page-header-fixed main-content-boxed side-trans-enabled ${mobileSidebarClass}`;

        return (
            <ConfigProvider locale={chineseLocale}>
                <div id="page-container" className={containerClassName}>
                    <div
                        onClick={() => dispatch({ type: 'layout/showNav' })}
                        className="v2board-nav-mask"
                        style={{ display: layout.showNav ? 'block' : 'none' }}
                    />
                    <ConnectedSidebar {...this.props} location={location || history.location} />
                    <ConnectedHeader search={search} title={title} />
                    <main id="main-container">
                        {loading ? (
                            <div className="content content-full text-center pt-5">
                                <div className="spinner-grow text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-0 p-lg-4">{children}</div>
                        )}
                    </main>
                </div>
            </ConfigProvider>
        );
    }
}

export default connect<
    MainLayoutStateProps,
    MainLayoutDispatchProps,
    MainLayoutOwnProps,
    AdminRootState
>((state) => ({ layout: state.layout }))(MainLayout);
