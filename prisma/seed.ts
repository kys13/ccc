import { PrismaClient, Role, Status, UserType, SnsPlatform } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    try {
        // 1. 관리자 계정 생성
        const hashedPassword = await bcrypt.hash('admin123!', 10);
        const admin = await prisma.user.upsert({
            where: { email: 'rksvndrl100@naver.com' },
            update: {},
            create: {
                email: 'rksvndrl100@naver.com',
                name: 'Admin',
                password: hashedPassword,
                role: Role.ADMIN,
                status: Status.ACTIVE,
                userType: UserType.INDIVIDUAL
            }
        });

        console.log('Admin account created:', admin.email);

        // 2. 위치 데이터 생성
        const location = await prisma.location.upsert({
            where: { address: '서울특별시 강남구 테헤란로 123' },
            update: {},
            create: {
                city: '서울특별시',
                district: '강남구',
                address: '서울특별시 강남구 테헤란로 123',
            },
        });

        console.log('Location created:', location.address);

        // 3. 방문/배달 카테고리 생성
        const visitCategories = ['맛집', '카페'];
        const deliveryCategories = ['식품', '뷰티'];

        for (const name of visitCategories) {
            await prisma.visitCategory.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }
        console.log('Visit categories created');

        for (const name of deliveryCategories) {
            await prisma.deliveryCategory.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }
        console.log('Delivery categories created');

        // 4. 캠페인 카테고리 생성
        const campaignCategories = ['맛집', '카페', '뷰티', '패션'];
        for (const name of campaignCategories) {
            await prisma.campaignCategory.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }
        console.log('Campaign categories created');

        // 5. 일반 사용자 생성
        const users = [
            {
                email: 'user1@example.com',
                name: '홍길동',
                password: await bcrypt.hash('password123', 10),
                role: Role.USER,
                status: Status.ACTIVE
            },
            {
                email: 'user2@example.com',
                name: '김철수',
                password: await bcrypt.hash('password123', 10),
                role: Role.USER,
                status: Status.ACTIVE
            }
        ];

        const createdUsers = await Promise.all(
            users.map(user =>
                prisma.user.upsert({
                    where: { email: user.email },
                    update: {},
                    create: user
                })
            )
        );

        // 6. 캠페인 생성
        const restaurantCategory = await prisma.campaignCategory.findUnique({
            where: { name: '맛집' },
        });

        const beautyCategory = await prisma.campaignCategory.findUnique({
            where: { name: '뷰티' },
        });

        const visitRestaurant = await prisma.visitCategory.findUnique({
            where: { name: '맛집' },
        });

        const deliveryBeauty = await prisma.deliveryCategory.findUnique({
            where: { name: '뷰티' },
        });

        if (restaurantCategory && beautyCategory && visitRestaurant && deliveryBeauty) {
            // 레스토랑 캠페인
            await prisma.campaign.create({
                data: {
                    title: '강남 신규 오픈 레스토랑 방문 체험단',
                    description: '강남에 새로 오픈한 레스토랑의 시그니처 메뉴를 체험하고 리뷰를 작성해주세요.',
                    imageUrl: 'https://example.com/restaurant.jpg',
                    reward: 50000,
                    maxParticipants: 10,
                    currentParticipants: 0,
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                    requirements: '인스타그램 팔로워 1000명 이상\n리뷰 작성 필수\n방문 인증샷 필수',
                    reviewTemplate: '1. 방문 일시\n2. 주문 메뉴\n3. 맛 평가\n4. 서비스 평가\n5. 매장 분위기\n6. 재방문 의사',
                    status: 'ONGOING',
                    isVisible: true,
                    locationId: location.id,
                    visitCategoryId: visitRestaurant.id,
                    snsTypes: [SnsPlatform.INSTAGRAM],
                    categories: {
                        connect: [{ id: restaurantCategory.id }]
                    }
                }
            });

            // 화장품 캠페인
            await prisma.campaign.create({
                data: {
                    title: '프리미엄 화장품 체험단',
                    description: '새로 출시된 프리미엄 스킨케어 제품을 체험하고 상세한 리뷰를 작성해주세요.',
                    imageUrl: 'https://example.com/cosmetics.jpg',
                    reward: 100000,
                    maxParticipants: 5,
                    currentParticipants: 0,
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                    requirements: '뷰티 블로그 운영자\n상세 리뷰 작성 필수\n제품 사용 후기 필수',
                    reviewTemplate: '1. 제품 첫인상\n2. 사용감\n3. 효과\n4. 장단점\n5. 추천 대상',
                    status: 'ONGOING',
                    isVisible: true,
                    deliveryCategoryId: deliveryBeauty.id,
                    snsTypes: [SnsPlatform.BLOG],
                    categories: {
                        connect: [{ id: beautyCategory.id }]
                    }
                }
            });
        }
        console.log('Campaigns created');

        console.log('Seed completed successfully!');
    } catch (error) {
        console.error('Error during seed:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error('Failed to seed database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 