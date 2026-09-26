import copyText from 'copy-to-clipboard';
import type { NumericValue } from '@/types/commerceContracts';
import type { UserSubscription } from '@/types/subscriptionContracts';

export type CookieValue = string | number | boolean;

export function getCookie(name: string): string {
    return document.cookie.split('; ').reduce((value, cookie) => {
        const [cookieName, cookieValue] = cookie.split('=');
        return cookieName === name ? decodeURIComponent(cookieValue) : value;
    }, '');
}

export function calculateUsage(used: number, total: number): number {
    return (used / total) * 100;
}

export function isAppleMobile(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.includes('iphone') || userAgent.includes('ipad');
}

export function isIPadDesktopMode(): boolean {
    return navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 2;
}

export function isAndroid(): boolean {
    return window.navigator.userAgent.toLowerCase().includes('android');
}

export function isMac(): boolean {
    return window.navigator.userAgent.toLowerCase().includes('macintosh');
}

export function isWindows(): boolean {
    return window.navigator.userAgent.toLowerCase().includes('windows');
}

export function isMobile(): boolean {
    return window.navigator.userAgent.toLowerCase().includes('mobile');
}

export function setCookie(
    name: string,
    value: CookieValue,
    minutes = 525600,
    path = '/',
    domain?: string,
): void {
    const expires = new Date(Date.now() + 60000 * minutes).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}${domain ? `;domain=${domain}` : ''}`;
}

export function formatBytes(value: NumericValue = 0): string | number {
    const bytes = parseInt(String(value), 10);
    const kilobyte = 1024;
    const megabyte = 1048576;
    const gigabyte = 1073741824;
    if (bytes > gigabyte) return `${(bytes / gigabyte).toFixed(2)} GB`;
    if (bytes > megabyte) return `${(bytes / megabyte).toFixed(2)} MB`;
    if (bytes > kilobyte) return `${(bytes / kilobyte).toFixed(2)} KB`;
    return bytes < 0 ? 0 : `${bytes.toFixed(2)} B`;
}

export function isExpired(timestamp: number | null | undefined): boolean {
    return timestamp !== null && timestamp !== undefined && timestamp < Date.now() / 1000;
}

export function canRenew(subscription: Partial<UserSubscription>): boolean {
    return Boolean(
        subscription.plan?.renew &&
        (subscription.plan?.show || !isExpired(subscription.expired_at)),
    );
}

export function copyToClipboard(value: string): boolean {
    return copyText(value);
}

export function parseJson<T>(value: string): T | string {
    try {
        return JSON.parse(value) as T;
    } catch {
        return value;
    }
}

export function setToken(token: string): void {
    window.localStorage.setItem('authorization', token);
}

export function clearToken(): void {
    window.localStorage.removeItem('authorization');
}

export function getToken(): string | null {
    return window.localStorage.getItem('authorization');
}
