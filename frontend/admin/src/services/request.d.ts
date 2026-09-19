export interface ApiResponse<Data = unknown> {
  code: number;
  data: Data;
  total: number;
  msg?: string;
  [key: string]: unknown;
}

export function get<Data = unknown>(endpoint: string, data?: Record<string, unknown>): Promise<ApiResponse<Data>>;
export function post<Data = unknown>(endpoint: string, data?: Record<string, unknown>): Promise<ApiResponse<Data>>;
