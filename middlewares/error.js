const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // JWT 인증 에러 처리
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: '유효하지 않은 토큰입니다.'
        });
    }

    // 토큰 만료 에러 처리
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: '토큰이 만료되었습니다.'
        });
    }

    // 기본 에러 응답
    res.status(500).json({
        success: false,
        message: '서버 오류가 발생했습니다.'
    });
};

module.exports = errorHandler; 