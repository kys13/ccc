const db = require('../database/db');

class Notification {
    static async create({ userId, type, title, message }) {
        const sql = `
            INSERT INTO notifications (user_id, type, title, message)
            VALUES (?, ?, ?, ?)
        `;
        const result = await db.query(sql, [userId, type, title, message]);
        return result.insertId;
    }

    static async getByUserId(userId, { page = 1, limit = 20 }) {
        const offset = (page - 1) * limit;
        const sql = `
            SELECT * FROM notifications
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;
        return await db.query(sql, [userId, limit, offset]);
    }

    static async markAsRead(id) {
        const sql = `
            UPDATE notifications
            SET is_read = true
            WHERE id = ?
        `;
        return await db.query(sql, [id]);
    }

    static async markAllAsRead(userId) {
        const sql = `
            UPDATE notifications
            SET is_read = true
            WHERE user_id = ?
        `;
        return await db.query(sql, [userId]);
    }

    static async getUnreadCount(userId) {
        const sql = `
            SELECT COUNT(*) as count
            FROM notifications
            WHERE user_id = ? AND is_read = false
        `;
        const result = await db.query(sql, [userId]);
        return result[0].count;
    }
}

module.exports = Notification; 