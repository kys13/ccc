const db = require('../database/db');

class Applicant {
    static async create({ campaignId, userId, message, instagramUrl, blogUrl, youtubeUrl }) {
        const sql = `
            INSERT INTO applicants (
                campaign_id, user_id, message, 
                instagram_url, blog_url, youtube_url
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(sql, [
            campaignId, userId, message,
            instagramUrl, blogUrl, youtubeUrl
        ]);
        return result.insertId;
    }

    static async findByCampaignId(campaignId, { page = 1, limit = 10, status = null }) {
        const offset = (page - 1) * limit;
        let sql = `
            SELECT a.*, u.name, u.email, u.phone
            FROM applicants a
            JOIN users u ON a.user_id = u.id
            WHERE a.campaign_id = ?
        `;
        const params = [campaignId];

        if (status) {
            sql += ' AND a.status = ?';
            params.push(status);
        }

        sql += ` ORDER BY a.created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        return await db.query(sql, params);
    }

    static async updateStatus(id, status) {
        const sql = `
            UPDATE applicants 
            SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        return await db.query(sql, [status, id]);
    }

    static async bulkUpdateStatus(ids, status) {
        const sql = `
            UPDATE applicants 
            SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id IN (?)
        `;
        return await db.query(sql, [status, ids]);
    }
}

module.exports = Applicant; 