const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Bookmark = require('../models/Bookmark');
const Applicant = require('../models/Applicant');
const { authMiddleware } = require('../middlewares/auth');

// 캠페인 목록 조회
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 12, category, status } = req.query;
        const campaigns = await Campaign.findAll({ page, limit, category, status });
        
        res.json({
            success: true,
            campaigns: campaigns.rows,
            total: campaigns.total
        });
    } catch (error) {
        console.error('Campaign list error:', error);
        res.status(500).json({
            success: false,
            message: '캠페인 목록을 불러오는데 실패했습니다.'
        });
    }
});

// 캠페인 상세 조회
router.get('/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: '캠페인을 찾을 수 없습니다.'
            });
        }

        // 로그인한 사용자의 북마크 여부 확인
        if (req.user) {
            campaign.isBookmarked = await Bookmark.isBookmarked(req.user.id, campaign.id);
        }

        res.json({
            success: true,
            campaign
        });
    } catch (error) {
        console.error('Campaign detail error:', error);
        res.status(500).json({
            success: false,
            message: '캠페인 정보를 불러오는데 실패했습니다.'
        });
    }
});

// 캠페인 신청
router.post('/:id/apply', authMiddleware, async (req, res) => {
    try {
        const { message, instagramUrl, blogUrl, youtubeUrl } = req.body;
        const campaignId = req.params.id;
        const userId = req.user.id;

        const applicantId = await Applicant.create({
            campaignId,
            userId,
            message,
            instagramUrl,
            blogUrl,
            youtubeUrl
        });

        res.json({
            success: true,
            message: '캠페인 신청이 완료되었습니다.',
            applicantId
        });
    } catch (error) {
        console.error('Campaign apply error:', error);
        res.status(500).json({
            success: false,
            message: '캠페인 신청 중 오류가 발생했습니다.'
        });
    }
});

// 북마크 토글
router.post('/:id/bookmark', authMiddleware, async (req, res) => {
    try {
        const result = await Bookmark.toggle(req.user.id, req.params.id);
        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        console.error('Bookmark toggle error:', error);
        res.status(500).json({
            success: false,
            message: '북마크 처리 중 오류가 발생했습니다.'
        });
    }
});

module.exports = router; 