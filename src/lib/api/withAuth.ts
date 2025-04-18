/**
 * API 요청에 인증 정보를 포함시키는 함수
 * 모든 API 요청에서 이 함수를 사용하여 일관된 인증 처리를 보장합니다.
 */
export const withAuth = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  // 기본 옵션과 사용자 지정 옵션 병합
  const fetchOptions: RequestInit = {
    ...options,
    credentials: 'include', // 항상 쿠키 포함
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    // 응답이 성공적이지 않은 경우
    if (!response.ok) {
      // 401 오류: 인증되지 않음
      if (response.status === 401) {
        console.error('인증이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/admin/login?returnTo=' + encodeURIComponent(window.location.pathname);
        throw new Error('인증이 필요합니다.');
      }

      // 403 오류: 권한 없음
      if (response.status === 403) {
        console.error('해당 작업에 대한 권한이 없습니다.');
        throw new Error('관리자 권한이 필요합니다.');
      }

      // 기타 오류
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '요청 처리 중 오류가 발생했습니다.');
    }

    // 응답 JSON 파싱
    return await response.json() as T;
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
};

/**
 * GET 요청을 보내는 유틸리티 함수
 */
export const getWithAuth = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  return withAuth<T>(url, { ...options, method: 'GET' });
};

/**
 * POST 요청을 보내는 유틸리티 함수
 */
export const postWithAuth = <T>(url: string, data: any, options: RequestInit = {}): Promise<T> => {
  return withAuth<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT 요청을 보내는 유틸리티 함수
 */
export const putWithAuth = <T>(url: string, data: any, options: RequestInit = {}): Promise<T> => {
  return withAuth<T>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * PATCH 요청을 보내는 유틸리티 함수
 */
export const patchWithAuth = <T>(url: string, data: any, options: RequestInit = {}): Promise<T> => {
  return withAuth<T>(url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE 요청을 보내는 유틸리티 함수
 */
export const deleteWithAuth = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  return withAuth<T>(url, { ...options, method: 'DELETE' });
}; 