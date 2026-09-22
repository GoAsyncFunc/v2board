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

type ResponseData<Response> = Response extends { data?: infer Data } ? NonNullable<Data> : never;

export type SuccessfulResponse<Response extends { code: number }> = Response & {
    code: 200;
    data: ResponseData<Response>;
};

export function isSuccessfulResponse<Response extends { code: number }>(
    response: Response,
): response is SuccessfulResponse<Response> {
    return response.code === 200;
}

export interface AdminRequestOptions extends Omit<RequestInit, 'headers'> {
    headers?: Record<string, string>;
}
