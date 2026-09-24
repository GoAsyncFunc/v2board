import React from 'react';
import { connect } from 'react-redux';
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader';
import { getCookie, setCookie } from '../utils/siteHelpers';
import { formatMessage } from '../locales/i18n';
import LanguageSelector from '../components/common/LanguageSelector';
import HeaderSearchOverlay, { type HeaderSearchConfig } from './components/HeaderSearchOverlay';
import type { UserDispatch, UserRootState } from '../types/store';

export type { HeaderSearchConfig } from './components/HeaderSearchOverlay';

interface HeaderOwnProps {
    title?: React.ReactNode;
    search?: HeaderSearchConfig;
}
interface HeaderStateProps {
    user: { userInfo: { email?: string } };
}
interface HeaderDispatchProps {
    dispatch: UserDispatch;
}
type HeaderProps = HeaderOwnProps & HeaderStateProps & HeaderDispatchProps;
type HeaderMenuKey = 'showAvatarMenu' | 'showLangMenu';
interface HeaderState {
    loading: boolean;
    showAvatarMenu: boolean;
    showSearchBar: boolean;
    showLangMenu: boolean;
}

const headerTheme = window.settings.theme;

export class Header extends React.Component<HeaderProps, HeaderState> {
    state: HeaderState = {
        loading: false,
        showAvatarMenu: false,
        showSearchBar: false,
        showLangMenu: false,
    };

    componentDidMount(): void {
        if (!this.props.user.userInfo.email) this.props.dispatch({ type: 'user/getUserInfo' });
    }

    showDropmenu(menuKey: HeaderMenuKey): void {
        this.setState(
            { [menuKey]: !this.state[menuKey] } as Pick<HeaderState, HeaderMenuKey>,
            () => {
                document.onclick = () => {
                    if (this.state[menuKey])
                        this.setState({ showAvatarMenu: false, showLangMenu: false });
                    document.onclick = null;
                };
            },
        );
    }

    logout(): void {
        this.props.dispatch({ type: 'user/logout' });
    }

    darkMode(): void {
        if (getCookie('dark_mode') === '1') {
            disableDarkMode();
            setCookie('dark_mode', 0);
        } else {
            enableDarkMode({ brightness: 100, contrast: 90, sepia: 10 });
            setCookie('dark_mode', 1);
        }
        this.forceUpdate();
    }

    render(): React.ReactNode {
        const { search, title, user } = this.props;
        const darkHeader = headerTheme.header === 'dark';
        return (
            <header id="page-header">
                <div className="content-header">
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
                                <span className="ml-1 d-none d-sm-inline-block">
                                    {formatMessage({ id: '搜索' })}
                                </span>
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
                                {getCookie('dark_mode') === '1' ? (
                                    <i className="far fa fa-moon" />
                                ) : (
                                    <i className="far fa fa-sun" />
                                )}
                            </button>
                        </div>
                        <div className="dropdown d-inline-block">
                            <LanguageSelector>
                                <button
                                    type="button"
                                    className={darkHeader ? 'btn btn-primary mr-1' : 'btn mr-1'}
                                >
                                    <i className="far fa fa-language" />
                                </button>
                            </LanguageSelector>
                        </div>
                        {this.state.loading ? (
                            <div className="spinner-grow text-primary" />
                        ) : (
                            <div className="dropdown d-inline-block">
                                <button
                                    type="button"
                                    className={darkHeader ? 'btn btn-primary' : 'btn'}
                                    onClick={() => this.showDropmenu('showAvatarMenu')}
                                >
                                    <i className="far fa fa-user-circle" />
                                    <span className="d-none d-lg-inline ml-1">
                                        {user.userInfo.email || 'Loading...'}
                                    </span>
                                    <i className="fa fa-fw fa-angle-down ml-1" />
                                </button>
                                <div
                                    className={`dropdown-menu dropdown-menu-right p-0 ${this.state.showAvatarMenu && 'show'}`}
                                >
                                    <div className="p-2">
                                        <a className="dropdown-item" href="/#/profile">
                                            <i className="far fa-fw fa-user mr-1" />{' '}
                                            {formatMessage({ id: '个人中心' })}
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="javascript:void(0);"
                                            onClick={() => this.logout()}
                                        >
                                            <i className="far fa-fw fa-arrow-alt-circle-left mr-1" />{' '}
                                            {formatMessage({ id: '登出' })}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {search && (
                    <HeaderSearchOverlay
                        search={search}
                        visible={this.state.showSearchBar}
                        onClose={() => this.setState({ showSearchBar: false })}
                    />
                )}
            </header>
        );
    }
}

export default connect<HeaderStateProps, HeaderDispatchProps, HeaderOwnProps, UserRootState>(
    (state) => ({ user: state.user }),
)(Header);
