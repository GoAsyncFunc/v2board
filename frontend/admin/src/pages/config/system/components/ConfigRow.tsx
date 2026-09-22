import React from 'react';

export interface ConfigRowProps {
    title: React.ReactNode;
    description?: React.ReactNode;
    isChildren?: boolean;
    children?: React.ReactNode;
}

export default function ConfigRow({
    title,
    description,
    isChildren = false,
    children,
}: ConfigRowProps) {
    return (
        <div
            className={`row ${isChildren ? 'v2board-config-children' : ''}`}
            style={{ padding: '20px', borderBottom: '1px solid #eee' }}
        >
            <div className="col-lg-6">
                <div style={{ fontWeight: 'bold', marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 12, marginBottom: 5, color: '#666' }}>{description}</div>
            </div>
            <div className="col-lg-6 text-right">{children}</div>
        </div>
    );
}
