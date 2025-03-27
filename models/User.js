const db = require('../database/db');
const bcrypt = require('bcrypt');

class User {
    static async create({ email, password, name, phone }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `
            INSERT INTO users (email, password, name, phone)
            VALUES (?, ?, ?, ?)
        `;
        const result = await db.query(sql, [email, hashedPassword, name, phone]);
        return result.insertId;
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const users = await db.query(sql, [email]);
        return users[0];
    }

    static async findById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const users = await db.query(sql, [id]);
        return users[0];
    }

    static async updateLastLogin(id) {
        const sql = 'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?';
        return await db.query(sql, [id]);
    }

    static async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = User; 