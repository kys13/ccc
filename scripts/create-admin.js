const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // 기존 계정 확인
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'rksvndrl100@naver.com'
      }
    });

    // 기존 계정이 있다면 삭제
    if (existingAdmin) {
      await prisma.user.delete({
        where: {
          email: 'rksvndrl100@naver.com'
        }
      });
      console.log('Existing admin account deleted');
    }

    const hashedPassword = await bcrypt.hash('rladudtjr!2', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'rksvndrl100@naver.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    });

    console.log('Admin account created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin account:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 