const db = require('../database/db');

class Review {
    static async create(reviewData) {
        return await db.transaction(async (connection) => {
            // 리뷰 기본 정보 저장
            const reviewSql = `
                INSERT INTO reviews (
                    campaign_id, user_id, content, rating
                ) VALUES (?, ?, ?, ?)
            `;
            const reviewResult = await connection.execute(reviewSql, [
                reviewData.campaignId,
                reviewData.userId,
                reviewData.content,
                reviewData.rating
            ]);
            
            const reviewId = reviewResult[0].insertId;

            // 이미지 정보 저장
            if (reviewData.images && reviewData.images.length > 0) {
                const imagesSql = `
                    INSERT INTO review_images (review_id, image_url, display_order)
                    VALUES ?
                `;
                const imageValues = reviewData.images.map((url, index) => [
                    reviewId, url, index
                ]);
                await connection.query(imagesSql, [imageValues]);
            }

            return reviewId;
        });
    }

    static async findByCampaignId(campaignId, { page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;
        const sql = `
            SELECT r.*, u.name as user_name,
                   GROUP_CONCAT(ri.image_url) as images
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            LEFT JOIN review_images ri ON r.id = ri.review_id
            WHERE r.campaign_id = ? AND r.status = 'approved'
            GROUP BY r.id
            ORDER BY r.created_at DESC
            LIMIT ? OFFSET ?
        `;
        return await db.query(sql, [campaignId, limit, offset]);
    }

    static async updateStatus(id, status) {
        const sql = `
            UPDATE reviews 
            SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        return await db.query(sql, [status, id]);
    }
}

module.exports = Review; 