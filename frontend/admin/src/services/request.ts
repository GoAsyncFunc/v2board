import notification from 'antd/lib/notification';
import { siteSettings } from '../config/siteSettings';
import { clearToken, getToken } from '../utils/siteHelpers';
import { fetchResponse } from './fetchResponse';

export type FormValue = string | number | boolean | bigint | null | undefined | FormRecord;
export interface FormRecord {
  [key: string]: FormValue;
}

export interface ApiResponse<Data = unknown> {
  code: number;
  data: Data;
  total: number;
  msg?: string;
  [key: string]: unknown;
}

interface ApiPayload {
  message?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

export interface AdminRequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}

export function encodeForm(data?: FormRecord | null): string {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return '';
  const fields: string[] = [];

  function append(key: string, value: FormValue): void {
    if (value === null) {
      fields.push(`${key}=`);
      return;
    }
    if (value === undefined) return;
    if (typeof value === 'object') {
      for (const child in value) append(`${key}[${child}]`, value[child]);
      return;
    }
    fields.push(`${key}=${encodeURIComponent(String(value))}`);
  }

  for (const key in data) append(key, data[key]);
  return fields.join('&');
}

export async function request<Data = unknown>(
  endpoint: string,
  requestOptions: AdminRequestOptions | null = {},
): Promise<ApiResponse<Data>> {
  const options = requestOptions || {};
  options.headers = options.headers || {};
  options.credentials = 'include';
  const token = getToken();
  if (token) options.headers.authorization = token;
  const url = endpoint.includes('http')
    ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?')
    : siteSettings.serviceHost + endpoint;
  const response = await fetchResponse(url, options);
  // Keep exact content-type handling for parity; widening this is a separate behavior change.
  const data: ApiPayload = response.headers.get('content-type') === 'application/json'
    ? await response.json() as ApiPayload
    : { buffer: await response.arrayBuffer() };

  if (response.status === 403) {
    clearToken();
    window.location.href = window.location.origin + window.location.pathname;
    return { code: response.status, msg: data.message } as ApiResponse<Data>;
  }
  if (response.status !== 200) {
    const message = data.errors ? Object.values(data.errors)[0][0] : data.message;
    notification.error({
      message: '请求失败',
      description: message,
      duration: 1.5,
    });
    return { code: response.status, msg: message } as ApiResponse<Data>;
  }
  return Object.assign({ code: response.status }, data) as ApiResponse<Data>;
}

export function post<Data = unknown>(endpoint: string, data?: FormRecord): Promise<ApiResponse<Data>> {
  return request<Data>(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm(data),
  });
}

export function get<Data = unknown>(endpoint: string, data?: FormRecord): Promise<ApiResponse<Data>> {
  const query = encodeForm(data);
  return request<Data>(query ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?') + query : endpoint);
}
