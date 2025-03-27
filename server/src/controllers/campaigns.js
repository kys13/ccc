const db = require('../config/database');

// 캠페인 목록 조회
const getCampaigns = async (req, res) => {
    try {
        const { 
            category,
            status,
            region,
            sns_type,
            sort = 'latest',
            page = 1,
            limit = 12
        } = req.query;

        let query = 'SELECT * FROM campaigns WHERE 1=1';
        const values = [];
        let valueIndex = 1;

        if (category) {
            query += ` AND category = $${valueIndex}`;
            values.push(category);
            valueIndex++;
        }

        if (status) {
            query += ` AND status = $${valueIndex}`;
            values.push(status);
            valueIndex++;
        }

        if (region) {
            query += ` AND region = $${valueIndex}`;
            values.push(region);
            valueIndex++;
        }

        if (sns_type) {
            query += ` AND sns_type = $${valueIndex}`;
            values.push(sns_type);
            valueIndex++;
        }

        // 정렬 조건 추가
        switch (sort) {
            case 'deadline':
                query += ' ORDER BY deadline ASC';
                break;
            case 'popular':
                query += ' ORDER BY (total_slots - remaining_slots) DESC';
                break;
            default:
                query += ' ORDER BY created_at DESC';
        }

        // 페이지네이션
        const offset = (page - 1) * limit;
        query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
        values.push(limit, offset);

        const result = await db.query(query, values);
        
        // 전체 캠페인 수 조회
        let countQuery = 'SELECT COUNT(*) FROM campaigns WHERE 1=1';
        if (category) countQuery += ' AND category = $1';
        if (status && category) countQuery += ' AND status = $2';
        if (status && !category) countQuery += ' AND status = $1';
        
        const countValues = [];
        if (category) countValues.push(category);
        if (status) countValues.push(status);
        
        const totalCount = await db.query(countQuery, countValues);

        res.json({
            campaigns: result.rows,
            total: parseInt(totalCount.rows[0].count),
            page: parseInt(page),
            totalPages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
        });
    } catch (error) {
        console.error('Get campaigns error:', error);
        res.status(500).json({ message: '캠페인 목록 조회 중 오류가 발생했습니다.' });
    }
};

// 캠페인 상세 조회
const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(
            'SELECT * FROM campaigns WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: '캠페인을 찾을 수 없습니다.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get campaign error:', error);
        res.status(500).json({ message: '캠페인 조회 중 오류가 발생했습니다.' });
    }
};

// 캠페인 신청
const applyCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // 트랜잭션 시작
        await db.query('BEGIN');

        // 캠페인 정보 조회
        const campaignResult = await db.query(
            'SELECT * FROM campaigns WHERE id = $1',
            [id]
        );

        if (campaignResult.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ message: '캠페인을 찾을 수 없습니다.' });
        }

        const campaign = campaignResult.rows[0];

        // 신청 가능 여부 확인
        if (campaign.remaining_slots <= 0) {
            await db.query('ROLLBACK');
            return res.status(400).json({ message: '모집이 마감되었습니다.' });
        }

        // 이미 신청한 캠페인인지 확인
        const applicationExists = await db.query(
            'SELECT * FROM applications WHERE user_id = $1 AND campaign_id = $2',
            [userId, id]
        );

        if (applicationExists.rows.length > 0) {
            await db.query('ROLLBACK');
            return res.status(400).json({ message: '이미 신청한 캠페인입니다.' });
        }

        // 신청 생성
        await db.query(
            'INSERT INTO applications (user_id, campaign_id, status) VALUES ($1, $2, $3)',
            [userId, id, 'pending']
        );

        // 남은 슬롯 수 감소
        await db.query(
            'UPDATE campaigns SET remaining_slots = remaining_slots - 1 WHERE id = $1',
            [id]
        );

        // 트랜잭션 커밋
        await db.query('COMMIT');

        res.json({ message: '캠페인 신청이 완료되었습니다.' });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Apply campaign error:', error);
        res.status(500).json({ message: '캠페인 신청 중 오류가 발생했습니다.' });
    }
};

// 북마크 추가/제거
const toggleBookmark = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // 북마크 존재 여부 확인
        const bookmarkExists = await db.query(
            'SELECT * FROM bookmarks WHERE user_id = $1 AND campaign_id = $2',
            [userId, id]
        );

        if (bookmarkExists.rows.length > 0) {
            // 북마크 제거
            await db.query(
                'DELETE FROM bookmarks WHERE user_id = $1 AND campaign_id = $2',
                [userId, id]
            );
            res.json({ message: '북마크가 제거되었습니다.' });
        } else {
            // 북마크 추가
            await db.query(
                'INSERT INTO bookmarks (user_id, campaign_id) VALUES ($1, $2)',
                [userId, id]
            );
            res.json({ message: '북마크가 추가되었습니다.' });
        }
    } catch (error) {
        console.error('Toggle bookmark error:', error);
        res.status(500).json({ message: '북마크 처리 중 오류가 발생했습니다.' });
    }
};

module.exports = {
    getCampaigns,
    getCampaignById,
    applyCampaign,
    toggleBookmark
}; 