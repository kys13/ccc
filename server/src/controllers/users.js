const db = require('../config/database');

// 북마크한 캠페인 목록 조회
const getBookmarkedCampaigns = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 12 } = req.query;
        const offset = (page - 1) * limit;

        const query = `
            SELECT c.*, b.created_at as bookmarked_at, true as is_bookmarked
            FROM campaigns c
            INNER JOIN bookmarks b ON c.id = b.campaign_id
            WHERE b.user_id = $1
            ORDER BY b.created_at DESC
            LIMIT $2 OFFSET $3
        `;

        const result = await db.query(query, [userId, limit, offset]);

        // 전체 북마크 수 조회
        const countQuery = `
            SELECT COUNT(*) 
            FROM bookmarks 
            WHERE user_id = $1
        `;
        const totalCount = await db.query(countQuery, [userId]);

        res.json({
            campaigns: result.rows,
            total: parseInt(totalCount.rows[0].count),
            page: parseInt(page),
            totalPages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
        });
    } catch (error) {
        console.error('Get bookmarked campaigns error:', error);
        res.status(500).json({ message: '북마크 목록 조회 중 오류가 발생했습니다.' });
    }
};

// 신청한 캠페인 목록 조회
const getAppliedCampaigns = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 12 } = req.query;
        const offset = (page - 1) * limit;

        const query = `
            SELECT c.*, a.status as application_status, a.created_at as applied_at
            FROM campaigns c
            INNER JOIN applications a ON c.id = a.campaign_id
            WHERE a.user_id = $1
            ORDER BY a.created_at DESC
            LIMIT $2 OFFSET $3
        `;

        const result = await db.query(query, [userId, limit, offset]);

        // 전체 신청 수 조회
        const countQuery = `
            SELECT COUNT(*) 
            FROM applications 
            WHERE user_id = $1
        `;
        const totalCount = await db.query(countQuery, [userId]);

        res.json({
            campaigns: result.rows,
            total: parseInt(totalCount.rows[0].count),
            page: parseInt(page),
            totalPages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
        });
    } catch (error) {
        console.error('Get applied campaigns error:', error);
        res.status(500).json({ message: '신청 목록 조회 중 오류가 발생했습니다.' });
    }
};

// 프로필 정보 조회
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await db.query(
            'SELECT id, email, name, phone, region, sns_type, sns_url, created_at FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: '프로필 조회 중 오류가 발생했습니다.' });
    }
};

// 프로필 정보 수정
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, phone, region, sns_type, sns_url } = req.body;

        const result = await db.query(
            `UPDATE users 
             SET name = $1, phone = $2, region = $3, sns_type = $4, sns_url = $5, updated_at = NOW()
             WHERE id = $6
             RETURNING id, email, name, phone, region, sns_type, sns_url`,
            [name, phone, region, sns_type, sns_url, userId]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: '프로필 수정 중 오류가 발생했습니다.' });
    }
};

module.exports = {
    getBookmarkedCampaigns,
    getAppliedCampaigns,
    getProfile,
    updateProfile
}; 