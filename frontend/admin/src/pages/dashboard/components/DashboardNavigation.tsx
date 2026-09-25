import React from 'react';
import history from '../../../app/navigationService';

interface QuickLinkProps {
    icon: string;
    label: string;
    path: string;
}

export default function DashboardNavigation() {
    const links: QuickLinkProps[] = [
        { icon: 'si-equalizer', label: '系统设置', path: '/config/system' },
        { icon: 'si-list', label: '订单管理', path: '/order' },
        { icon: 'si-bag', label: '订阅管理', path: '/plan' },
        { icon: 'si-users', label: '用户管理', path: '/user' },
    ];
    return (
        <div className="mb-0 block border-bottom js-classic-nav d-none d-sm-block">
            <div className="block-content block-content-full">
                <div className="row no-gutters border">
                    {links.map(({ icon, label, path }) => (
                        <div
                            className="col-sm-6 col-xl-3 js-appear-enabled animated"
                            data-toggle="appear"
                            key={path}
                        >
                            <a
                                className="block block-bordered block-link-pop text-center mb-0"
                                onClick={() => history.push(path)}
                            >
                                <div className="block-content block-content-full text-center">
                                    <i
                                        className={`fa-2x si ${icon} text-primary d-none d-sm-inline-block mb-3`}
                                    />
                                    <div className="font-w600 text-uppercase">{label}</div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
