const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Applicant = require('../models/Applicant');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

// 모든 admin 라우트에 인증 및 관리자 권한 체크 미들웨어 적용
router.use(authMiddleware, adminMiddleware);

// 대시보드 통계
router.get('/dashboard', async (req, res) => {
    try {
        const stats = await Campaign.getDashboardStats();
        res.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: '대시보드 데이터를 불러오는데 실패했습니다.'
        });
    }
});

// 캠페인 관리
router.get('/campaigns', async (req, res) => {
    try {
        const { page = 1, limit = 10, search, status } = req.query;
        const campaigns = await Campaign.findAllForAdmin({ page, limit, search, status });
        res.json({
            success: true,
            campaigns: campaigns.rows,
            total: campaigns.total
        });
    } catch (error) {
        console.error('Admin campaigns list error:', error);
        res.status(500).json({
            success: false,
            message: '캠페인 목록을 불러오는데 실패했습니다.'
        });
    }
});

// 캠페인 생성
router.post('/campaigns', async (req, res) => {
    try {
        const campaignData = {
            ...req.body,
            createdBy: req.user.id
        };
        const campaignId = await Campaign.create(campaignData);
        res.status(201).json({
            success: true,
            campaignId
        });
    } catch (error) {
        console.error('Campaign create error:', error);
        res.status(500).json({
            success: false,
            message: '캠페인 생성에 실패했습니다.'
        });
    }
});

// 캠페인 수정
router.put('/campaigns/:id', async (req, res) => {
    try {
        await Campaign.update(req.params.id, req.body);
        res.json({
            success: true,
            message: '캠페인이 수정되었습니다.'
        });
    } catch (error) {
        console.error('Campaign update error:', error);
        res.status(500).json({
            success: false,
            message: '캠페인 수정에 실패했습니다.'
        });
    }
});

// 캠페인 삭제
router.delete('/campaigns/:id', async (req, res) => {
    try {
        await Campaign.delete(req.params.id);
        res.json({
            success: true,
            message: '캠페인이 삭제되었습니다.'
        });
    } catch (error) {
        console.error('Campaign delete error:', error);
        res.status(500).json({
            success: false,
            message: '캠페인 삭제에 실패했습니다.'
        });
    }
});

// 신청자 관리
router.get('/campaigns/:id/applicants', async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const applicants = await Applicant.findByCampaignId(req.params.id, { page, limit, status });
        res.json({
            success: true,
            applicants
        });
    } catch (error) {
        console.error('Applicants list error:', error);
        res.status(500).json({
            success: false,
            message: '신청자 목록을 불러오는데 실패했습니다.'
        });
    }
});

// 신청자 상태 업데이트
router.put('/applicants/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await Applicant.updateStatus(req.params.id, status);
        res.json({
            success: true,
            message: '신청자 상태가 업데이트되었습니다.'
        });
    } catch (error) {
        console.error('Applicant status update error:', error);
        res.status(500).json({
            success: false,
            message: '신청자 상태 업데이트에 실패했습니다.'
        });
    }
});

module.exports = router; 