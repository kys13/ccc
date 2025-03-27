const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

// 인증 미들웨어
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: '인증이 필요합니다.'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: '유효하지 않은 토큰입니다.'
            });
        }

        // 사용자 정보 조회 및 검증
        const user = await User.findById(decoded.id);
        if (!user || user.status !== 'active') {
            return res.status(401).json({
                success: false,
                message: '접근이 거부되었습니다.'
            });
        }

        // 요청 객체에 사용자 정보 추가
        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: '인증 처리 중 오류가 발생했습니다.'
        });
    }
};

// 관리자 권한 체크 미들웨어
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: '관리자 권한이 필요합니다.'
        });
    }
    next();
};

// 선택적 인증 미들웨어 (로그인 선택)
const optionalAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return next();
        }

        const user = await User.findById(decoded.id);
        if (user && user.status === 'active') {
            req.user = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            };
        }

        next();
    } catch (error) {
        console.error('Optional auth middleware error:', error);
        next();
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    optionalAuthMiddleware
}; 