const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bookmark = require('../models/Bookmark');
const Notification = require('../models/Notification');
const { authMiddleware } = require('../middlewares/auth');

// 모든 user 라우트에 인증 미들웨어 적용
router.use(authMiddleware);

// 내 정보 조회
router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        delete user.password;
        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get user info error:', error);
        res.status(500).json({
            success: false,
            message: '사용자 정보를 불러오는데 실패했습니다.'
        });
    }
});

// 내 정보 수정
router.put('/me', async (req, res) => {
    try {
        const { name, phone } = req.body;
        await User.update(req.user.id, { name, phone });
        res.json({
            success: true,
            message: '정보가 수정되었습니다.'
        });
    } catch (error) {
        console.error('Update user info error:', error);
        res.status(500).json({
            success: false,
            message: '정보 수정에 실패했습니다.'
        });
    }
});

// 북마크 목록 조회
router.get('/bookmarks', async (req, res) => {
    try {
        const bookmarks = await Bookmark.getByUserId(req.user.id);
        res.json({
            success: true,
            bookmarks
        });
    } catch (error) {
        console.error('Get bookmarks error:', error);
        res.status(500).json({
            success: false,
            message: '북마크 목록을 불러오는데 실패했습니다.'
        });
    }
});

// 알림 목록 조회
router.get('/notifications', async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const notifications = await Notification.getByUserId(req.user.id, { page, limit });
        res.json({
            success: true,
            notifications
        });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({
            success: false,
            message: '알림 목록을 불러오는데 실패했습니다.'
        });
    }
});

// 알림 읽음 처리
router.put('/notifications/:id/read', async (req, res) => {
    try {
        await Notification.markAsRead(req.params.id);
        res.json({
            success: true,
            message: '알림이 읽음 처리되었습니다.'
        });
    } catch (error) {
        console.error('Mark notification as read error:', error);
        res.status(500).json({
            success: false,
            message: '알림 읽음 처리에 실패했습니다.'
        });
    }
});

module.exports = router; 