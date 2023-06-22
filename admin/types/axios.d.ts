export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
    apiUrl?: string
    errorMessageMode?: ErrorMessageMode;
    withToken?: boolean;
    ignoreCancelToken?: boolean;
}

export interface Result<T = any> {
    code: number;
    message: string;
    error: string;
    data: T;
    detail: string | null;
    success: boolean;
    pageCount?: number;
    count?: string;
}