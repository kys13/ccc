const express = require('express');
const router = express.Router();
const { upload, optimizeImage } = require('../middlewares/upload');
const { authMiddleware } = require('../middlewares/auth');

// 단일 이미지 업로드
router.post('/single', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: '이미지를 선택해주세요.'
            });
        }

        const optimizedImages = await optimizeImage(req.file);

        res.json({
            success: true,
            images: optimizedImages
        });
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({
            success: false,
            message: '이미지 업로드 중 오류가 발생했습니다.'
        });
    }
});

// 다중 이미지 업로드
router.post('/multiple', authMiddleware, upload.array('images', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: '이미지를 선택해주세요.'
            });
        }

        const results = await Promise.all(
            req.files.map(file => optimizeImage(file))
        );

        res.json({
            success: true,
            images: results
        });
    } catch (error) {
        console.error('Multiple image upload error:', error);
        res.status(500).json({
            success: false,
            message: '이미지 업로드 중 오류가 발생했습니다.'
        });
    }
});

module.exports = router; 