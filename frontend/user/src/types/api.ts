export type FormValue = string | number | boolean | null | undefined | FormValue[] | { [key: string]: FormValue };
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface ApiResponse<Data = JsonValue> {
  code: number;
  data?: Data;
  total?: number;
  msg?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface SuccessfulApiResponse<Data = JsonValue> extends ApiResponse<Data> {
  code: 200;
  data: Data;
}

export function isSuccessfulResponse<Response extends ApiResponse<unknown>>(
  response: Response,
): response is Response & SuccessfulApiResponse<Exclude<Response['data'], undefined>> {
  return response.code === 200;
}

export interface RequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}
