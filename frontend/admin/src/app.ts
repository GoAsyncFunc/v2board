// umi 3 runtime config: replaces the deleted src/app/bootstrap.tsx and
// src/app/dvaConfig.ts. Module-scope side effects run before render.
import { enable } from 'darkreader';
import moment from 'moment';
import { getPreference } from '@/utils/siteHelpers';
import { configureRequestPresentation } from '@/app/requestPresentation';

configureRequestPresentation();

const { host, theme } = window.settings;
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = host ? `./theme/${theme.color}.css` : `/assets/admin/theme/${theme.color}.css`;
document.head.appendChild(stylesheet);

moment.locale('zh-cn');

if (getPreference('dark_mode') === '1') {
    enable({ brightness: 100, contrast: 90, sepia: 10 });
}

export const dva = {
    config: {
        onError(error: { preventDefault(): void }): void {
            error.preventDefault();
        },
    },
};
