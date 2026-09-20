import { siteSettings } from '../config/siteSettings';
import type {
  AdminRequestOptions,
  ApiResponse,
  FormRecord,
  FormValue,
  JsonValue,
} from '../types/api';
import { clearToken, getToken } from '../utils/siteHelpers';
import { fetchResponse } from './fetchResponse';

interface ApiPayload<Data = JsonValue> {
  data?: Data;
  total?: number;
  status?: string;
  message?: string;
  errors?: Record<string, string[]>;
  buffer?: ArrayBuffer;
  [key: string]: Data | JsonValue | ArrayBuffer | undefined;
}

export interface RequestFailurePresentation {
  title: string;
  description?: string;
  durationSeconds: number;
}

export type RequestFailurePresenter = (failure: RequestFailurePresentation) => void;

let presentRequestFailure: RequestFailurePresenter = () => {};

export function setRequestFailurePresenter(presenter: RequestFailurePresenter): void {
  presentRequestFailure = presenter;
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
      if (Array.isArray(value)) {
        value.forEach((childValue, index) => append(`${key}[${index}]`, childValue));
      } else {
        for (const child in value) append(`${key}[${child}]`, value[child]);
      }
      return;
    }
    fields.push(`${key}=${encodeURIComponent(String(value))}`);
  }

  for (const key in data) append(key, data[key]);
  return fields.join('&');
}

export async function request<Data = JsonValue>(
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
  const data: ApiPayload<Data> = response.headers.get('content-type') === 'application/json'
    ? await response.json() as ApiPayload<Data>
    : { buffer: await response.arrayBuffer() };

  if (response.status === 403) {
    clearToken();
    window.location.href = window.location.origin + window.location.pathname;
    return { code: response.status, msg: data.message } as ApiResponse<Data>;
  }
  if (response.status !== 200) {
    const message = data.errors ? Object.values(data.errors)[0][0] : data.message;
    presentRequestFailure({
      title: '请求失败',
      description: message,
      durationSeconds: 1.5,
    });
    return { code: response.status, msg: message } as ApiResponse<Data>;
  }
  return Object.assign({ code: response.status }, data) as ApiResponse<Data>;
}

export function post<Data = JsonValue>(endpoint: string, data?: FormRecord): Promise<ApiResponse<Data>> {
  return request<Data>(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm(data),
  });
}

export function get<Data = JsonValue>(endpoint: string, data?: FormRecord): Promise<ApiResponse<Data>> {
  const query = encodeForm(data);
  return request<Data>(query ? endpoint + (endpoint.indexOf('?') > 0 ? '&' : '?') + query : endpoint);
}
