const express = require('express');
const router = express.Router();
const { 
    getBookmarkedCampaigns,
    getAppliedCampaigns,
    getProfile,
    updateProfile
} = require('../controllers/users');
const auth = require('../middlewares/auth');

// 모든 라우트에 인증 미들웨어 적용
router.use(auth);

// 북마크한 캠페인 목록
router.get('/bookmarks', getBookmarkedCampaigns);

// 신청한 캠페인 목록
router.get('/applications', getAppliedCampaigns);

// 프로필 정보 조회
router.get('/profile', getProfile);

// 프로필 정보 수정
router.put('/profile', updateProfile);

module.exports = router; 