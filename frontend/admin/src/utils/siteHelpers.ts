import copyText from 'copy-to-clipboard';
import message from 'antd/lib/message';

export type PreferenceValue = string | number | boolean | null | undefined;

export function getCookie(name: string): string {
  return document.cookie.split('; ').reduce((value, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    return cookieName === name ? decodeURIComponent(cookieValue) : value;
  }, '');
}

export function isMobile(): boolean {
  return window.navigator.userAgent.toLowerCase().includes('mobile');
}

export function setCookie(
  name: string,
  value: string,
  minutes = 525600,
  path = '/',
  domain?: string,
): void {
  const expires = new Date(Date.now() + 60000 * minutes).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}${domain ? `;domain=${domain}` : ''}`;
}

export function setPreference(name: string, value: PreferenceValue): void {
  try {
    if (localStorage.getItem('habit')) {
      // The recovered runtime mutates the stored string before serializing it.
      // Keep that behavior until preference persistence is fixed separately.
      const preferences = localStorage.getItem('habit') as string & Record<string, PreferenceValue>;
      preferences[name] = value;
      localStorage.setItem('habit', JSON.stringify(preferences));
      return;
    }
  } catch (error) {
    // Preserve the original fallback when stored preferences are malformed.
  }
  localStorage.setItem('habit', JSON.stringify({ [name]: value }));
}

export function getPreference(name: string): PreferenceValue | false {
  try {
    const storedPreferences = localStorage.getItem('habit');
    if (!storedPreferences) return false;
    const preferences = JSON.parse(storedPreferences) as Record<string, PreferenceValue>;
    return preferences[name];
  } catch (error) {
    return false;
  }
}

export function formatBytes(value: string | number = 0): string | number {
  const bytes = Number.parseInt(String(value), 10);
  const kilobyte = 1024;
  const megabyte = 1048576;
  const gigabyte = 1073741824;
  if (bytes > gigabyte) return `${(bytes / gigabyte).toFixed(2)} GB`;
  if (bytes > megabyte) return `${(bytes / megabyte).toFixed(2)} MB`;
  if (bytes > kilobyte) return `${(bytes / kilobyte).toFixed(2)} KB`;
  return bytes < 0 ? 0 : `${bytes.toFixed(2)} B`;
}

export function copyToClipboard(value?: string): boolean {
  const copied = copyText(value);
  message.success('复制成功');
  return copied;
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
