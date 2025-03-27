export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface ErrorResponse {
  message: string;
  code?: string;
}

export function handleAPIError(error: unknown): never {
  if (error instanceof APIError) {
    throw error;
  }

  if (error instanceof Response) {
    throw new APIError(
      '서버 오류가 발생했습니다.',
      error.status
    );
  }

  if (error instanceof Error) {
    throw new APIError(
      error.message,
      500
    );
  }

  throw new APIError(
    '알 수 없는 오류가 발생했습니다.',
    500
  );
}

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ErrorResponse = await response.json().catch(() => ({
      message: '서버 오류가 발생했습니다.',
    }));

    throw new APIError(
      error.message,
      response.status,
      error.code
    );
  }

  return response.json();
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
}

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: '잘못된 요청입니다.',
  [HTTP_STATUS.UNAUTHORIZED]: '로그인이 필요합니다.',
  [HTTP_STATUS.FORBIDDEN]: '접근 권한이 없습니다.',
  [HTTP_STATUS.NOT_FOUND]: '찾을 수 없는 리소스입니다.',
  [HTTP_STATUS.CONFLICT]: '리소스가 이미 존재합니다.',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: '서버 오류가 발생했습니다.',
} as const; 