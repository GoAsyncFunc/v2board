export type ThemeConfigValue = string | number | boolean | null | undefined;
export type ThemeConfigParams = Record<string, ThemeConfigValue>;

export interface ThemeField {
    field_name: string;
    field_type: 'select' | 'input' | 'textarea' | string;
    label: string;
    placeholder?: string;
    select_options?: Record<string, string>;
}

export interface ThemeDefinition {
    name: string;
    description?: string;
    configs?: ThemeField[];
}

export interface ThemeState {
    // The bundle initialises the theme list as an array (module 4f386f71).
    themes: ThemeDefinition[] | Record<string, ThemeDefinition>;
    active?: string;
    getThemesLoading?: boolean;
    getThemeConfigLoading?: boolean;
    saveThemeConfigLoading?: boolean;
}

export interface ThemeListResponse {
    // The bundle initialises the theme list as an array (module 4f386f71).
    themes: ThemeDefinition[] | Record<string, ThemeDefinition>;
    active?: string;
}
