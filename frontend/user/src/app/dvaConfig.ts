import message from 'antd/lib/message';
import { enable } from 'darkreader';
import { setLocale } from '../locales/i18n';
import { getCookie } from '../utils/siteHelpers';

message.config({ maxCount: 1 });

const { host, theme } = window.settings;
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = host
    ? `./theme/${theme.color}.css`
    : `/theme/default/assets/theme/${theme.color}.css`;
document.head.appendChild(stylesheet);

const savedLocale = getCookie('i18n');
if (savedLocale) {
    setLocale(savedLocale);
} else {
    const browserLocales: Record<string, string> = {
        en: 'en-US',
        ja: 'ja-JP',
        ko: 'ko-KR',
        vi: 'vi-VN',
        zh: 'zh-CN',
    };
    const browserLocale = browserLocales[navigator.language.split('-')[0]];
    if (browserLocale) setLocale(browserLocale);
}

if (getCookie('dark_mode') === '1') {
    enable({ brightness: 100, contrast: 90, sepia: 10 });
}

export default {
    config: {
        onError(error: { preventDefault(): void }): void {
            error.preventDefault();
        },
    },
};
