import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { Prisma, Role, Status, UserType, SnsPlatform } from '@prisma/client';
import { ApiResponse } from '@/types/api';

// 입력값 검증을 위한 스키마 정의
const snsAccountSchema = z.object({
  platform: z.enum(['INSTAGRAM', 'YOUTUBE', 'TIKTOK', 'FACEBOOK', 'BLOG']),
  username: z.string().min(1, '계정명을 입력해주세요.'),
  url: z.string().url('올바른 URL을 입력해주세요.').optional(),
});

const registerSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  name: z.string().min(2, '이름을 입력해주세요.'),
  phoneNumber: z.string()
    .regex(/^\d{10,11}$/, '올바른 휴대폰 번호 형식이 아닙니다.')
    .transform(val => {
      if (val.length === 11) {
        return `${val.slice(0,3)}-${val.slice(3,7)}-${val.slice(7)}`;
      }
      return `${val.slice(0,3)}-${val.slice(3,6)}-${val.slice(6)}`;
    }),
  userType: z.enum(['INDIVIDUAL', 'BUSINESS']),
  ssn: z.string()
    .regex(/^\d{13}$/, '올바른 주민등록번호 형식이 아닙니다.')
    .optional(),
  businessNumber: z.string()
    .regex(/^\d{10}$/, '올바른 사업자등록번호 형식이 아닙니다.')
    .optional(),
  snsAccounts: z.array(snsAccountSchema),
  postcode: z.string().min(5, '우편번호를 입력해주세요.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  addressDetail: z.string().min(1, '상세주소를 입력해주세요.'),
}).refine((data) => {
  if (data.userType === 'INDIVIDUAL' && !data.ssn) {
    return false;
  }
  if (data.userType === 'BUSINESS' && !data.businessNumber) {
    return false;
  }
  return true;
}, {
  message: '회원 유형에 따른 필수 정보를 입력해주세요.',
  path: ['userType']
});

type RegisterInput = z.infer<typeof registerSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received registration data:', body);

    // 입력값 검증
    const validatedData: RegisterInput = registerSchema.parse(body);
    console.log('Validated data:', validatedData);

    // Check for existing email
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: validatedData.email
      }
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: '이미 등록된 이메일입니다.' },
        { status: 400 }
      );
    }

    // Check for existing phone number
    if (validatedData.phoneNumber) {
      const existingPhone = await prisma.user.findFirst({
        where: {
          phoneNumber: validatedData.phoneNumber
        }
      });

      if (existingPhone) {
        return NextResponse.json(
          { message: '이미 등록된 휴대폰 번호입니다.' },
          { status: 400 }
        );
      }
    }

    // Check for existing SSN
    if (validatedData.ssn) {
      const existingSsn = await prisma.user.findFirst({
        where: {
          ssn: validatedData.ssn
        }
      });

      if (existingSsn) {
        return NextResponse.json(
          { message: '이미 등록된 주민번호입니다.' },
          { status: 400 }
        );
      }
    }

    // Check for existing business number
    if (validatedData.businessNumber) {
      const existingBusiness = await prisma.user.findFirst({
        where: {
          businessNumber: validatedData.businessNumber
        }
      });

      if (existingBusiness) {
        return NextResponse.json(
          { message: '이미 등록된 사업자 번호입니다.' },
          { status: 400 }
        );
      }
    }

    // Create user
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const userData = {
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name,
      phoneNumber: validatedData.phoneNumber,
      userType: validatedData.userType as UserType,
      role: Role.USER,
      status: Status.ACTIVE,
      ssn: validatedData.ssn,
      businessNumber: validatedData.businessNumber,
      postcode: validatedData.postcode,
      address: validatedData.address,
      addressDetail: validatedData.addressDetail,
      snsAccounts: {
        create: validatedData.snsAccounts.map((account) => ({
          platform: account.platform as SnsPlatform,
          username: account.username,
          url: account.url || null,
        })),
      },
    };

    console.log('Creating user with data:', userData);

    const user = await prisma.user.create({
      data: userData,
      include: {
        snsAccounts: true
      }
    });

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: '회원가입에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// API 응답 형식 통일을 위한 유틸리티 함수
export function createApiResponse<T>(
  data?: T,
  message?: string,
  status: 'success' | 'error' = 'success'
): ApiResponse<T> {
  return {
    data,
    message,
    status,
  };
} 