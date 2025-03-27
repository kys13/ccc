const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user || !(await User.verifyPassword(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: '이메일 또는 비밀번호가 일치하지 않습니다.'
            });
        }

        // 로그인 시간 업데이트
        await User.updateLastLogin(user.id);

        // 민감한 정보 제거
        delete user.password;

        const token = generateToken(user);

        res.json({
            success: true,
            token,
            user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: '로그인 처리 중 오류가 발생했습니다.'
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;

        // 이메일 중복 체크
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: '이미 사용중인 이메일입니다.'
            });
        }

        const userId = await User.create({ email, password, name, phone });
        const user = await User.findById(userId);

        // 민감한 정보 제거
        delete user.password;

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: '회원가입 처리 중 오류가 발생했습니다.'
        });
    }
});

module.exports = router; 