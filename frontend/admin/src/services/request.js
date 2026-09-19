import { fetchResponse } from "../vendor/dva.js";
import { notification } from "../vendor/notification.js";
import { siteSettings } from "../vendor/siteSettings.js";
import { getToken, clearToken } from "../vendor/siteHelpers.js";

import '../vendor/componentStyles.js';
export function encodeForm(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return '';
  const fields = [];
  function append(key, value) {
    if (value === null) {
      fields.push(`${key}=`);
      return;
    }
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
  options.credentials = 'include';
  const token = getToken();
  if (token) options.headers.authorization = token;
  const url = endpoint.includes('http') ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?') : siteSettings.serviceHost + endpoint;
  const response = await fetchResponse(url, options);
  // Keep exact content-type handling for parity; widening this is a separate behavior change.
  const data = response.headers.get('content-type') === 'application/json' ? await response.json() : {
    buffer: await response.arrayBuffer()
  };
  if (response.status === 403) {
    clearToken();
    window.location.href = window.location.origin + window.location.pathname;
    return {
      code: response.status,
      msg: data.message
    };
  }
  if (response.status !== 200) {
    const message = data.errors ? Object.values(data.errors)[0][0] : data.message;
    notification.error({
      message: '请求失败',
      description: message,
      duration: 1.5
    });
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
export { get as a, post as b };
