import React from 'react';
import Switch from 'antd/lib/switch';
import ConfigRow from './ConfigRow';
import type { ConfigValue } from '../../../../types/config';

export interface TextSettingProps {
    title: string;
    description: string;
    placeholder: string;
    value?: Exclude<ConfigValue, null>;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    multiline?: boolean;
    rows?: number;
}

export function TextSetting({
    title,
    description,
    placeholder,
    value,
    onChange,
    multiline = false,
    rows = 4,
}: TextSettingProps): React.ReactElement {
    const field = multiline ? (
        <textarea
            rows={rows}
            className="form-control"
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
        />
    ) : (
        <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
        />
    );
    return (
        <ConfigRow title={title} description={description}>
            {field}
        </ConfigRow>
    );
}

export interface ToggleSettingProps {
    title: string;
    description: string;
    value?: string | number;
    onChange: (value: number) => void;
}

export function ToggleSetting({
    title,
    description,
    value,
    onChange,
}: ToggleSettingProps): React.ReactElement {
    return (
        <ConfigRow title={title} description={description}>
            <Switch
                checked={Boolean(parseInt(String(value), 10))}
                onChange={(enabled) => onChange(enabled ? 1 : 0)}
            />
        </ConfigRow>
    );
}
