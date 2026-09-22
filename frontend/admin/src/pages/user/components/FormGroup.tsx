import React from 'react';

export interface FormGroupProps {
    label: React.ReactNode;
    children: React.ReactNode;
}

export function FormGroup({ label, children }: FormGroupProps): React.ReactElement {
    return (
        <div className="form-group">
            <label>{label}</label>
            {children}
        </div>
    );
}
