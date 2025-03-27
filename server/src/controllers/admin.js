const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 관리자 로그인
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 이메일로 사용자 조회
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1 AND role = $2',
            [email, 'admin']
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        const user = result.rows[0];

        // 비밀번호 확인
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        // JWT 토큰 생성
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
    }
};

// 관리자 목록 조회
const getAdmins = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, email, name, created_at FROM users WHERE role = $1',
            ['admin']
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Get admins error:', error);
        res.status(500).json({ message: '관리자 목록 조회 중 오류가 발생했습니다.' });
    }
};

// 관리자 추가
const addAdmin = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // 이메일 중복 확인
        const existingUser = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
        }

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 관리자 추가
        const result = await db.query(
            `INSERT INTO users (email, password, name, role)
             VALUES ($1, $2, $3, $4)
             RETURNING id, email, name, role`,
            [email, hashedPassword, name, 'admin']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Add admin error:', error);
        res.status(500).json({ message: '관리자 추가 중 오류가 발생했습니다.' });
    }
};

// 관리자 삭제
const removeAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        // 자기 자신은 삭제할 수 없음
        if (req.user.id === parseInt(id)) {
            return res.status(400).json({ message: '자기 자신은 삭제할 수 없습니다.' });
        }

        const result = await db.query(
            'DELETE FROM users WHERE id = $1 AND role = $2 RETURNING id',
            [id, 'admin']
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: '관리자를 찾을 수 없습니다.' });
        }

        res.json({ message: '관리자가 삭제되었습니다.' });
    } catch (error) {
        console.error('Remove admin error:', error);
        res.status(500).json({ message: '관리자 삭제 중 오류가 발생했습니다.' });
    }
};

// 관리자 비밀번호 변경
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // 현재 비밀번호 확인
        const user = await db.query(
            'SELECT * FROM users WHERE id = $1',
            [req.user.id]
        );

        const isValidPassword = await bcrypt.compare(currentPassword, user.rows[0].password);
        if (!isValidPassword) {
            return res.status(401).json({ message: '현재 비밀번호가 올바르지 않습니다.' });
        }

        // 새 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 비밀번호 업데이트
        await db.query(
            'UPDATE users SET password = $1 WHERE id = $2',
            [hashedPassword, req.user.id]
        );

        res.json({ message: '비밀번호가 변경되었습니다.' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: '비밀번호 변경 중 오류가 발생했습니다.' });
    }
};

module.exports = {
    adminLogin,
    getAdmins,
    addAdmin,
    removeAdmin,
    changePassword
}; 