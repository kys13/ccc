const db = require('../config/database');

const admin = async (req, res, next) => {
    try {
        // 사용자 정보가 없는 경우 (auth 미들웨어를 거치지 않은 경우)
        if (!req.user) {
            return res.status(401).json({ message: '인증이 필요합니다.' });
        }

        // 사용자의 role 확인
        const result = await db.query(
            'SELECT role FROM users WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        if (result.rows[0].role !== 'admin') {
            return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
        }

        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

module.exports = admin; 