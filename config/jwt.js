module.exports = {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '7d' // 토큰 만료 기간
}; 