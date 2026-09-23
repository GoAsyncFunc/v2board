import React from 'react';

interface HeaderAccountMenuProps {
    email?: string;
    darkHeader: boolean;
    expanded: boolean;
    onToggle: () => void;
    onLogout: () => void;
}

export function HeaderAccountMenu({
    email,
    darkHeader,
    expanded,
    onToggle,
    onLogout,
}: HeaderAccountMenuProps): React.ReactElement {
    return (
        <div className="dropdown d-inline-block">
            <button
                type="button"
                className={darkHeader ? 'btn btn-primary' : 'btn'}
                id="page-header-user-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={onToggle}
            >
                <i className="far fa fa-user-circle" />
                <span className="d-none d-lg-inline ml-1">{email}</span>
                <i className="fa fa-fw fa-angle-down ml-1" />
            </button>
            <div
                className={`dropdown-menu dropdown-menu-right dropdown-menu-lg p-0 ${expanded && 'show'}`}
                aria-labelledby="page-header-user-dropdown"
            >
                <div className="p-2">
                    <a
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        href="javascript:void(0);"
                        onClick={onLogout}
                    >
                        登出
                        <i className="fa fa-fw fa-sign-out-alt text-danger ml-1" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HeaderAccountMenu;
