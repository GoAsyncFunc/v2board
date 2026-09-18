import copyText from './clipboard.js';
import { formatMessage } from './i18n.js';
import { message } from './ui.js';
import { a as desktopNotification } from './notification.js';
import './componentStyles.js';

export function getCookie(name) {
  return document.cookie.split('; ').reduce((value, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    return cookieName === name ? decodeURIComponent(cookieValue) : value;
  }, '');
}

export function calculateUsage(used, total) {
  return (used / total) * 100;
}

export function isAppleMobile() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes('iphone') || userAgent.includes('ipad');
}

export function isIPadDesktopMode() {
  return navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2;
}

export function isAndroid() {
  return window.navigator.userAgent.toLowerCase().includes('android');
}

export function isMac() {
  return window.navigator.userAgent.toLowerCase().includes('macintosh');
}

export function isWindows() {
  return window.navigator.userAgent.toLowerCase().includes('windows');
}

export function isMobile() {
  return window.navigator.userAgent.toLowerCase().includes('mobile');
}

export function setCookie(name, value, minutes = 525600, path = '/', domain) {
  const expires = new Date(Date.now() + 60000 * minutes).toGMTString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}${domain ? `;domain=${domain}` : ''}`;
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

export function isExpired(timestamp) {
  return timestamp !== null && timestamp < new Date().getTime() / 1000;
}

export function canRenew(userInfo) {
  return Boolean(userInfo.plan?.renew && (userInfo.plan?.show || !isExpired(userInfo.expired_at)));
}

export function notify(type = 'success', title = '', description) {
  if (isMobile()) {
    message[type](description);
    return;
  }
  desktopNotification[type]({ message: title, description, duration: 1.5 });
}

export function copyToClipboard(value) {
  copyText(value);
  message.success(formatMessage({ id: '复制成功' }));
}

export function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
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

export {
  copyToClipboard as a,
  formatBytes as b,
  parseJson as c,
  getToken as d,
  getCookie as e,
  calculateUsage as f,
  isAndroid as g,
  isExpired as h,
  isAppleMobile as i,
  isIPadDesktopMode as j,
  isMac as k,
  isMobile as l,
  canRenew as m,
  isWindows as n,
  clearToken as o,
  setToken as p,
  setCookie as q,
  notify as r,
};
