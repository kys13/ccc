const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const config = require('../config/upload');

// 파일 이름 생성 함수
const generateFileName = (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return `${uniqueSuffix}${path.extname(file.originalname)}`;
};

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, generateFileName(file));
    }
});

// 파일 필터
const fileFilter = (req, file, cb) => {
    if (config.allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('지원하지 않는 파일 형식입니다.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: config.maxFileSize
    }
});

// 이미지 리사이징 및 최적화
const optimizeImage = async (file) => {
    const { filename, path: filePath } = file;
    const optimizedImages = {};

    try {
        // 각 사이즈별로 이미지 생성
        for (const [size, dimensions] of Object.entries(config.imageSizes)) {
            const outputPath = path.join(
                config.uploadPath,
                `${size}_${filename}`
            );

            await sharp(filePath)
                .resize(dimensions.width, dimensions.height, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 80 })
                .toFile(outputPath);

            optimizedImages[size] = `/uploads/${size}_${filename}`;
        }

        // 원본 이미지 경로 추가
        optimizedImages.original = `/uploads/${filename}`;

        return optimizedImages;
    } catch (error) {
        // 에러 발생 시 생성된 파일들 삭제
        await fs.unlink(filePath).catch(() => {});
        for (const size of Object.keys(config.imageSizes)) {
            const optimizedPath = path.join(config.uploadPath, `${size}_${filename}`);
            await fs.unlink(optimizedPath).catch(() => {});
        }
        throw error;
    }
};

// 이미지 삭제
const deleteImage = async (filename) => {
    try {
        // 원본 및 리사이즈된 이미지 모두 삭제
        await fs.unlink(path.join(config.uploadPath, filename));
        for (const size of Object.keys(config.imageSizes)) {
            const optimizedPath = path.join(config.uploadPath, `${size}_${filename}`);
            await fs.unlink(optimizedPath).catch(() => {});
        }
    } catch (error) {
        console.error('Image delete error:', error);
        throw error;
    }
};

module.exports = {
    upload,
    optimizeImage,
    deleteImage
}; 