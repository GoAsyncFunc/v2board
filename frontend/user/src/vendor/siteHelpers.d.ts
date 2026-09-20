export function getCookie(name: string): string;
export function getToken(): string | undefined;
export function clearToken(): void;
export function setCookie(name: string, value: unknown, minutes?: number, path?: string, domain?: string): void;
export function notify(type: string, title: string, message: string): void;
export function formatBytes(value: number): string;
export function calculateUsage(used: number, total: number): number;
export function isMobile(): boolean;
// Callers supply the expected JSON schema; invalid JSON is returned as text.
export function parseJson<T>(value: string): T | string;
export function copyToClipboard(text: string | undefined): void;
export function isAndroid(): boolean;
export function isAppleMobile(): boolean;
export function isIPadDesktopMode(): boolean | number | null;
export function isMac(): boolean;
export function isWindows(): boolean;
export function isExpired(timestamp: number | null | undefined): boolean;
export function canRenew(subscription: import('../types/subscription').UserSubscription): boolean;
