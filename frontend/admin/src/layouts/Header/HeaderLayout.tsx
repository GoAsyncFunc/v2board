import React from 'react';
import { connect } from 'react-redux';
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader';
import { clearToken, getPreference, setPreference } from '@/utils/siteHelpers';
import history from '@/app/history';
import type { AdminDispatch, AdminRootState } from '@/types/storeContracts';
import HeaderAccountMenu from './components/HeaderAccountMenu';
import HeaderSearchOverlay, { type HeaderSearchConfig } from './components/HeaderSearchOverlay';

export type { HeaderSearchConfig } from './components/HeaderSearchOverlay';

interface HeaderOwnProps {
    title?: React.ReactNode;
    search?: HeaderSearchConfig;
}

interface HeaderStateProps {
    user: { userInfo: { email?: string } };
}

interface HeaderDispatchProps {
    dispatch: AdminDispatch;
}

export type HeaderProps = HeaderOwnProps & HeaderStateProps & HeaderDispatchProps;

interface HeaderState {
    showAvatarMenu: boolean;
    showSearchBar: boolean;
    loading?: boolean;
}

const headerTheme = window.settings.theme;

export class Header extends React.Component<HeaderProps, HeaderState> {
    state: HeaderState = { showAvatarMenu: false, showSearchBar: false };

    componentDidMount(): void {
        if (!this.props.user.userInfo.email) this.props.dispatch({ type: 'user/getUserInfo' });
    }

    showAvatarMenu(): void {
        const closeMenu = (): void => {
            if (this.state.showAvatarMenu) this.setState({ showAvatarMenu: false });
            document.onclick = null;
        };
        this.setState({ showAvatarMenu: !this.state.showAvatarMenu }, () => {
            document.onclick = closeMenu;
        });
    }

    logout(): void {
        clearToken();
        history.push('/login');
    }

    darkMode(): void {
        if (getPreference('dark_mode') === '1') {
            disableDarkMode();
            setPreference('dark_mode', 0);
        } else {
            enableDarkMode({ brightness: 100, contrast: 90, sepia: 10 });
            setPreference('dark_mode', 1);
        }
        this.forceUpdate();
    }

    render(): React.ReactNode {
        const { search, title, user } = this.props;
        const { showAvatarMenu, showSearchBar } = this.state;
        const darkHeader = headerTheme.header === 'dark';

        return (
            <header id="page-header">
                <div className="content-header" style={{ maxWidth: 'unset' }}>
                    <div className="sidebar-toggle" style={{ display: search ? 'block' : 'none' }}>
                        <button
                            type="button"
                            className={
                                darkHeader ? 'btn btn-primary mr-1 d-lg-none' : 'btn mr-1 d-lg-none'
                            }
                            onClick={() => this.props.dispatch({ type: 'layout/showNav' })}
                        >
                            <i className="fa fa-fw fa-bars" />
                        </button>
                        {search && (
                            <button
                                type="button"
                                className={darkHeader ? 'btn btn-primary' : 'btn'}
                                onClick={() => this.setState({ showSearchBar: true })}
                            >
                                <i className="fa fa-fw fa-search" />{' '}
                                <span className="ml-1 d-none d-sm-inline-block">搜索</span>
                            </button>
                        )}
                    </div>
                    <div
                        className={
                            darkHeader
                                ? 'v2board-container-title text-white'
                                : 'v2board-container-title text-black'
                        }
                    >
                        {title}
                    </div>
                    <div>
                        <div className="dropdown d-inline-block">
                            <button
                                type="button"
                                className={darkHeader ? 'btn btn-primary mr-1' : 'btn mr-1'}
                                onClick={() => this.darkMode()}
                            >
                                {getPreference('dark_mode') === '1' ? (
                                    <i className="far fa fa-moon" />
                                ) : (
                                    <i className="far fa fa-sun" />
                                )}
                            </button>
                        </div>
                        {this.state.loading ? (
                            <div className="spinner-grow text-primary" />
                        ) : (
                            <HeaderAccountMenu
                                email={user.userInfo.email}
                                darkHeader={darkHeader}
                                expanded={showAvatarMenu}
                                onToggle={() => this.showAvatarMenu()}
                                onLogout={() => this.logout()}
                            />
                        )}
                    </div>
                </div>
                {search && (
                    <HeaderSearchOverlay
                        search={search}
                        visible={showSearchBar}
                        onClose={() => this.setState({ showSearchBar: false })}
                    />
                )}
            </header>
        );
    }
}

export default connect<HeaderStateProps, HeaderDispatchProps, HeaderOwnProps, AdminRootState>(
    (state) => ({ user: state.user }),
)(Header);
