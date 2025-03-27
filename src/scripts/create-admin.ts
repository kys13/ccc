import { PrismaClient, Role, Status, UserType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('rladudtjr!2', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'rksvndrl100@naver.com',
        password: hashedPassword,
        name: '관리자',
        role: Role.ADMIN,
        status: Status.ACTIVE,
        userType: UserType.INDIVIDUAL,
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