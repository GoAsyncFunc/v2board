import React from 'react';

export interface AuthBrandProps {
    logo?: string;
    title?: string;
    description?: string;
}

export default function AuthBrand({
    logo,
    title,
    description,
}: AuthBrandProps): React.ReactElement {
    return (
        <div className="mb-3 text-center">
            <a className="font-size-h1" href="javascript:void(0);">
                {logo ? (
                    <img className="v2board-logo mb-3" src={logo} />
                ) : (
                    <span className="text-dark">{title || 'V2Board'}</span>
                )}
            </a>
            {description && <p className="font-size-sm text-muted mb-3">{description}</p>}
        </div>
    );
}
