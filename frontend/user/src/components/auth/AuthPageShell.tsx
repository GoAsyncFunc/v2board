import React from 'react';
import AuthBrand from './AuthBrand';

export interface AuthPageShellProps {
    backgroundUrl?: string;
    logo?: string;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer: React.ReactNode;
}

export default function AuthPageShell({
    backgroundUrl,
    logo,
    title,
    description,
    children,
    footer,
}: AuthPageShellProps): React.ReactElement {
    return (
        <div id="page-container">
            <main id="main-container">
                <div
                    className="v2board-background"
                    style={{ backgroundImage: backgroundUrl && `url(${backgroundUrl})` }}
                />
                <div className="no-gutters v2board-auth-box">
                    <div style={{ maxWidth: 450, width: '100%', margin: 'auto' }}>
                        <div className="mx-2 mx-sm-0">
                            <div
                                className="block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image"
                                style={{ boxShadow: '0 0.5rem 2rem #0000000d' }}
                            >
                                <div className="row no-gutters">
                                    <div className="col-md-12 order-md-1 bg-white">
                                        <div className="block-content block-content-full px-lg-4 py-md-4 py-lg-4">
                                            <AuthBrand
                                                logo={logo}
                                                title={title}
                                                description={description}
                                            />
                                            {children}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left bg-gray-lighter p-3 px-4">{footer}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
