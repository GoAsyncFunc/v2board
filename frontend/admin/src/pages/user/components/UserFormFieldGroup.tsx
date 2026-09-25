import React from 'react';

export interface UserFormFieldGroupProps {
    label: React.ReactNode;
    children: React.ReactNode;
}

export function UserFormFieldGroup({
    label,
    children,
}: UserFormFieldGroupProps): React.ReactElement {
    return (
        <div className="form-group">
            <label>{label}</label>
            {children}
        </div>
    );
}
