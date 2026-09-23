import React from 'react';
import type { NavigationItem } from '../../../config/navigation';

interface SidebarNavigationProps {
    items: NavigationItem[];
    pathname: string;
    onNavigate: (href: string) => void;
}

export function SidebarNavigation({
    items,
    pathname,
    onNavigate,
}: SidebarNavigationProps): React.ReactElement {
    return (
        <ul className="nav-main">
            {items.map((item) => {
                if (item.type === 'heading') {
                    return (
                        <li key={`heading:${item.title}`} className="nav-main-heading">
                            {item.title}
                        </li>
                    );
                }

                if (item.type === 'href') {
                    return (
                        <li key={`href:${item.href}`} className="nav-main-item">
                            <a
                                className="nav-main-link"
                                target="_blank"
                                href={item.href}
                                rel="noreferrer"
                            >
                                {item.icon}
                                <span className="nav-main-link-name">{item.title}</span>
                            </a>
                        </li>
                    );
                }

                const activeClassName = pathname === item.href && 'active';
                return (
                    <li key={`item:${item.href}`} className="nav-main-item">
                        <a
                            className={`nav-main-link ${activeClassName}`}
                            onClick={() => onNavigate(item.href)}
                        >
                            {item.icon}
                            <span className="nav-main-link-name">{item.title}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default SidebarNavigation;
