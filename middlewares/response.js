const ApiResponse = require('../utils/response');

const responseMiddleware = (req, res, next) => {
    // success 메서드 추가
    res.success = function(data, message) {
        return this.json(ApiResponse.success(data, message));
    };

    // error 메서드 추가
    res.error = function(message, statusCode = 500) {
        return this.status(statusCode).json(ApiResponse.error(message, statusCode));
    };

    // list 메서드 추가
    res.list = function(items, total, page, limit) {
        return this.json(ApiResponse.list(items, total, page, limit));
    };

    next();
};

module.exports = responseMiddleware; 