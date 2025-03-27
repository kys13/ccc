const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('rladudtjr!2', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'rksvndrl200@naver.com',
        password: hashedPassword,
        name: '관리자',
        role: 'ADMIN',
        status: 'ACTIVE',
        userType: 'INDIVIDUAL',
        emailVerified: new Date(),
      },
    });

    console.log('관리자 계정이 생성되었습니다:', admin);
  } catch (error) {
    console.error('관리자 계정 생성 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 