const multer = require('multer');
const path = require('path');

module.exports = {
    // 이미지 저장 경로
    uploadPath: 'public/uploads',
    
    // 허용할 이미지 타입
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    
    // 최대 파일 크기 (5MB)
    maxFileSize: 5 * 1024 * 1024,
    
    // 이미지 사이즈 설정
    imageSizes: {
        thumbnail: { width: 300, height: 300 },
        medium: { width: 600, height: 600 },
        large: { width: 1200, height: 1200 }
    }
}; 