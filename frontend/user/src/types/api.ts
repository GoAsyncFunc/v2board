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

export interface RequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}
