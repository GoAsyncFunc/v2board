export type FormValue =
    string | number | boolean | bigint | null | undefined | FormValue[] | FormRecord;

export interface FormRecord {
    [key: string]: FormValue;
}

export type JsonValue =
    string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface ApiResponse<Data = JsonValue> {
    code: number;
    data?: Data;
    total?: number;
    msg?: string;
    status?: string;
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

export interface AdminRequestOptions extends Omit<RequestInit, 'headers'> {
    headers?: Record<string, string>;
}
