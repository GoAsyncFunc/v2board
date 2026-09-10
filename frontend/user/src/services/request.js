import { b as fetchResponse } from "../vendor/dva.js";
import { getLocale, formatMessage } from "../vendor/i18n.js";
import { d as getToken, o as clearToken, r as notify } from "../vendor/siteHelpers.js";
const serviceHost = (window.settings.host || new URL(window.location.href).origin) + '/api/v1';
document.title = window.settings.title;
export function encodeForm(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return '';
  const fields = [];
  function append(key, value) {
    if (value === undefined) return;
    if (typeof value === 'object') {
      for (const child in value) append(`${key}[${child}]`, value[child]);
    } else fields.push(`${key}=${encodeURIComponent(value)}`);
  }
  for (const key in data) append(key, data[key]);
  return fields.join('&');
}
export async function request(endpoint, options = {}) {
  options = options || {};
  options.headers = options.headers || {};
  const token = getToken();
  if (token) options.headers.authorization = token;
  options.credentials = 'include';
  options.headers['Content-Language'] = getLocale();
  // Retain original URL and response behavior during migration.
  const url = endpoint.includes('http') ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?') : serviceHost + endpoint;
  const response = await fetchResponse(url, options);
  const data = await response.json();
  if (response.status === 403) {
    clearToken();
    window.location.href = '/';
    return {
      code: response.status,
      msg: data.message
    };
  }
  if (response.status !== 200) {
    const message = data.errors ? Object.values(data.errors)[0][0] : data.message;
    notify('error', formatMessage({
      id: '请求失败'
    }), message);
    return {
      code: response.status,
      msg: message
    };
  }
  return Object.assign({
    code: response.status
  }, data);
}
export function post(endpoint, data) {
  return request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encodeForm(data)
  });
}
export function get(endpoint, data) {
  const query = encodeForm(data);
  return request(query ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?') + query : endpoint);
}
// Existing models retain these names until their imports are normalized.
export { get as a, post as b };
