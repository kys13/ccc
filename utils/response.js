class ApiResponse {
    static success(data = null, message = '성공적으로 처리되었습니다.') {
        return {
            success: true,
            message,
            data
        };
    }

    static error(message = '오류가 발생했습니다.', statusCode = 500) {
        return {
            success: false,
            message,
            statusCode
        };
    }

    static list(items, total, page = 1, limit = 10) {
        return {
            success: true,
            data: {
                items,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / limit)
                }
            }
        };
    }
}

module.exports = ApiResponse; 