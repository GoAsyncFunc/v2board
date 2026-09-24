import React from 'react';

export interface HeaderSearchConfig {
    placeholder: string;
    defaultValue?: string;
    onChange: (value: string) => void;
}

interface HeaderSearchOverlayProps {
    search: HeaderSearchConfig;
    visible: boolean;
    onClose: () => void;
}

export default function HeaderSearchOverlay({
    search,
    visible,
    onClose,
}: HeaderSearchOverlayProps): React.ReactElement {
    return (
        <div className={`overlay-header bg-dark ${visible ? 'show' : ''}`}>
            <div className="content-header bg-dark">
                <div className="w-100">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button type="button" className="btn btn-dark" onClick={onClose}>
                                <i className="fa fa-fw fa-times-circle" />
                            </button>
                        </div>
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder={search.placeholder}
                            onChange={(event) => search.onChange(event.target.value)}
                            defaultValue={search.defaultValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
