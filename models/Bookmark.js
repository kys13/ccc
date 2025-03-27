const db = require('../database/db');

class Bookmark {
    static async toggle(userId, campaignId) {
        return await db.transaction(async (connection) => {
            // 북마크 존재 여부 확인
            const checkSql = 'SELECT id FROM bookmarks WHERE user_id = ? AND campaign_id = ?';
            const [existing] = await connection.execute(checkSql, [userId, campaignId]);

            if (existing.length > 0) {
                // 북마크 제거
                const deleteSql = 'DELETE FROM bookmarks WHERE user_id = ? AND campaign_id = ?';
                await connection.execute(deleteSql, [userId, campaignId]);
                return { isBookmarked: false };
            } else {
                // 북마크 추가
                const insertSql = 'INSERT INTO bookmarks (user_id, campaign_id) VALUES (?, ?)';
                await connection.execute(insertSql, [userId, campaignId]);
                return { isBookmarked: true };
            }
        });
    }

    static async getByUserId(userId) {
        const sql = `
            SELECT c.*, b.created_at as bookmarked_at
            FROM bookmarks b
            JOIN campaigns c ON b.campaign_id = c.id
            WHERE b.user_id = ?
            ORDER BY b.created_at DESC
        `;
        return await db.query(sql, [userId]);
    }

    static async isBookmarked(userId, campaignId) {
        const sql = 'SELECT id FROM bookmarks WHERE user_id = ? AND campaign_id = ?';
        const result = await db.query(sql, [userId, campaignId]);
        return result.length > 0;
    }
}

module.exports = Bookmark; 