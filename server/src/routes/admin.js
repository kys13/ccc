const express = require('express');
const router = express.Router();
const {
    adminLogin,
    getAdmins,
    addAdmin,
    removeAdmin,
    changePassword
} = require('../controllers/admin');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// 관리자 로그인 (공개 라우트)
router.post('/login', adminLogin);

// 이하 라우트는 관리자 인증 필요
router.use(auth);
router.use(admin);

// 관리자 목록 조회
router.get('/admins', getAdmins);

// 관리자 추가
router.post('/admins', addAdmin);

// 관리자 삭제
router.delete('/admins/:id', removeAdmin);

// 비밀번호 변경
router.put('/password', changePassword);

module.exports = router; 