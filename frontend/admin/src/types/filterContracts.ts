import type React from 'react';

export type FilterValue = string | number | null | undefined;

export interface FilterItem {
    key: string;
    condition: string;
    value: FilterValue;
    [key: string]: FilterValue;
}

export interface FilterOption {
    key: string | number;
    value: string | number | null;
}

export interface FilterField {
    key: string;
    title: React.ReactNode;
    condition: string[];
    type?: 'select' | 'date' | string;
    options?: FilterOption[];
}
