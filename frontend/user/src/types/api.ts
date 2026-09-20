export type FormValue = string | number | boolean | null | undefined | FormValue[] | { [key: string]: FormValue };

export interface ApiResponse<Data = unknown> {
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
