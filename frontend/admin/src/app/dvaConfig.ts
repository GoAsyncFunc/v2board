import { enable } from 'darkreader';
import moment from 'moment';
import { getPreference } from '@/utils/siteHelpers';

const { host, theme } = window.settings;
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = host ? `./theme/${theme.color}.css` : `/assets/admin/theme/${theme.color}.css`;
document.head.appendChild(stylesheet);

moment.locale('zh-cn');

if (getPreference('dark_mode') === '1') {
    enable({ brightness: 100, contrast: 90, sepia: 10 });
}

export default {
    config: {
        onError(error: { preventDefault(): void }): void {
            error.preventDefault();
        },
    },
};
