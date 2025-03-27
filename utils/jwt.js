const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        config.secret,
        { expiresIn: config.expiresIn }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.secret);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
}; 