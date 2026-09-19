import copyText from './clipboard.js';
import { message } from './ui.js';

export function getCookie(name) {
  return document.cookie.split('; ').reduce((value, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    return cookieName === name ? decodeURIComponent(cookieValue) : value;
  }, '');
}

export function isMobile() {
  return window.navigator.userAgent.toLowerCase().includes('mobile');
}

export function setCookie(name, value, minutes = 525600, path = '/', domain) {
  const expires = new Date(Date.now() + 60000 * minutes).toGMTString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}${domain ? `;domain=${domain}` : ''}`;
}

export function setPreference(name, value) {
  try {
    if (localStorage.getItem('habit')) {
      const preferences = localStorage.getItem('habit');
      preferences[name] = value;
      localStorage.setItem('habit', JSON.stringify(preferences));
      return;
    }
  } catch (error) {
    // Preserve the original fallback when stored preferences are malformed.
  }
  localStorage.setItem('habit', JSON.stringify({ [name]: value }));
}

export function getPreference(name) {
  try {
    if (!localStorage.getItem('habit')) return false;
    return JSON.parse(localStorage.getItem('habit'))[name];
  } catch (error) {
    return false;
  }
}

export function formatBytes(value = 0) {
  const bytes = parseInt(value);
  const kilobyte = 1024;
  const megabyte = 1048576;
  const gigabyte = 1073741824;
  if (bytes > gigabyte) return `${(bytes / gigabyte).toFixed(2)} GB`;
  if (bytes > megabyte) return `${(bytes / megabyte).toFixed(2)} MB`;
  if (bytes > kilobyte) return `${(bytes / kilobyte).toFixed(2)} KB`;
  return bytes < 0 ? 0 : `${bytes.toFixed(2)} B`;
}

export function copyToClipboard(value) {
  copyText(value);
  message.success('复制成功');
}

export function setToken(token) {
  return window.localStorage.setItem('authorization', token);
}

export function clearToken() {
  return window.localStorage.removeItem('authorization');
}

export function getToken() {
  return window.localStorage.getItem('authorization');
}
