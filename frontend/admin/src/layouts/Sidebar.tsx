import React from 'react';
import { connect } from 'react-redux';
import { createNavigation } from '../config/navigation';
import type { NavigationItem } from '../config/navigation';
import history from '../app/history';
import type { AdminDispatch } from '../types/store';
import '../config/siteSettings';

interface SidebarOwnProps {
  location: { pathname: string };
}

interface SidebarDispatchProps {
  dispatch: AdminDispatch;
}

type SidebarProps = SidebarOwnProps & SidebarDispatchProps;
interface SidebarState { navigation: NavigationItem[]; }

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  state: SidebarState = { navigation: createNavigation() };

  renderMenu(item: NavigationItem): React.ReactElement {
    if (item.type === 'heading') {
      return <li key={`heading:${item.title}`} className="nav-main-heading">{item.title}</li>;
    }

    if (item.type === 'href') {
      return (
        <li key={`href:${item.href}`} className="nav-main-item">
          <a className="nav-main-link" target="_blank" href={item.href} rel="noreferrer">
            {item.icon}
            <span className="nav-main-link-name">{item.title}</span>
          </a>
        </li>
      );
    }

    const activeClassName = this.props.location.pathname === item.href && 'active';
    return (
      <li key={`item:${item.href}`} className="nav-main-item">
        <a
          className={`nav-main-link ${activeClassName}`}
          onClick={() => {
            history.push(item.href);
            this.props.dispatch({ type: 'layout/showNav', show: false });
          }}
        >
          {item.icon}
          <span className="nav-main-link-name">{item.title}</span>
        </a>
      </li>
    );
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
          <ul className="nav-main">{this.state.navigation.map(item => this.renderMenu(item))}</ul>
        </div>
        <div className="v2board-copyright">{siteTitle} v1.7.5</div>
      </nav>
    );
  }
}

export default connect(
  null,
  dispatch => ({ dispatch: dispatch as AdminDispatch }),
)(Sidebar);
