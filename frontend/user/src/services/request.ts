import { fetchResponse } from './fetchResponse';
import { getLocale, formatMessage } from '../locales/i18n';
import { getToken, clearToken, notify } from '../utils/siteHelpers';
import type { ApiResponse, FormValue, JsonValue, RequestOptions } from '../types/api';
const serviceHost = (window.settings.host || new URL(window.location.href).origin) + '/api/v1';
document.title = window.settings.title!;
export function encodeForm(data?: FormValue): string {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return '';
  const fields: string[] = [];
  function append(key: string, value: FormValue): void {
    if (value === undefined) return;
    if (typeof value === 'object') {
      if (value === null) return;
      const nested = value as Record<string, FormValue>;
      for (const child in nested) append(`${key}[${child}]`, nested[child]);
    } else fields.push(`${key}=${encodeURIComponent(value)}`);
  }
  for (const key in data) append(key, data[key]);
  return fields.join('&');
}
export async function request<Data = JsonValue>(endpoint: string, options: RequestOptions | null = {}): Promise<ApiResponse<Data>> {
  options = options || {};
  options.headers = options.headers || {};
  const token = getToken();
  if (token) options.headers.authorization = token;
  options.credentials = 'include';
  options.headers['Content-Language'] = getLocale();
  // Retain original URL and response behavior during migration.
  const url = endpoint.includes('http') ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?') : serviceHost + endpoint;
  const response: Response = await fetchResponse(url, options);
  const data: ApiResponse<Data> = await response.json();
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
    }), message!);
    return {
      code: response.status,
      msg: message
    };
  }
  return Object.assign({
    code: response.status
  }, data);
}
export function post<Data = JsonValue>(endpoint: string, data?: FormValue): Promise<ApiResponse<Data>> {
  return request<Data>(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encodeForm(data)
  });
}
export function get<Data = JsonValue>(endpoint: string, data?: FormValue): Promise<ApiResponse<Data>> {
  const query = encodeForm(data);
  return request<Data>(query ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?') + query : endpoint);
}
