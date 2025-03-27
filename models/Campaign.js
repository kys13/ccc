const db = require('../database/db');

class Campaign {
    static async create(campaignData) {
        return await db.transaction(async (connection) => {
            // 캠페인 기본 정보 저장
            const campaignSql = `
                INSERT INTO campaigns (
                    title, description, category, location,
                    max_applicants, start_date, end_date, deadline,
                    created_by
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const campaignResult = await connection.execute(campaignSql, [
                campaignData.title,
                campaignData.description,
                campaignData.category,
                campaignData.location,
                campaignData.maxApplicants,
                campaignData.startDate,
                campaignData.endDate,
                campaignData.deadline,
                campaignData.createdBy
            ]);
            
            const campaignId = campaignResult[0].insertId;

            // 이미지 정보 저장
            if (campaignData.images && campaignData.images.length > 0) {
                const imagesSql = `
                    INSERT INTO campaign_images (
                        campaign_id, image_url, is_thumbnail, display_order
                    ) VALUES ?
                `;
                const imageValues = campaignData.images.map((img, index) => [
                    campaignId,
                    img.url,
                    index === 0, // 첫 번째 이미지를 썸네일로
                    index
                ]);
                await connection.query(imagesSql, [imageValues]);
            }

            // 태그 정보 저장
            if (campaignData.tags && campaignData.tags.length > 0) {
                const tagsSql = `
                    INSERT INTO campaign_tags (campaign_id, tag)
                    VALUES ?
                `;
                const tagValues = campaignData.tags.map(tag => [campaignId, tag]);
                await connection.query(tagsSql, [tagValues]);
            }

            return campaignId;
        });
    }

    static async findById(id) {
        const sql = `
            SELECT c.*, 
                   GROUP_CONCAT(DISTINCT ci.image_url) as images,
                   GROUP_CONCAT(DISTINCT ct.tag) as tags
            FROM campaigns c
            LEFT JOIN campaign_images ci ON c.id = ci.campaign_id
            LEFT JOIN campaign_tags ct ON c.id = ct.campaign_id
            WHERE c.id = ?
            GROUP BY c.id
        `;
        const campaigns = await db.query(sql, [id]);
        return campaigns[0];
    }

    // ... 더 많은 메서드들 추가 예정
}

module.exports = Campaign; 