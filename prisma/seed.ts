import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create test location
    const location = await prisma.location.create({
        data: {
            city: '서울',
            district: '강남구',
            address: '서울특별시 강남구 테헤란로 123'
        }
    });

    // Create visit category
    const visitCategory = await prisma.visitCategory.create({
        data: {
            name: '맛집',
            description: '맛집 방문 리뷰'
        }
    });

    // Create delivery category
    const deliveryCategory = await prisma.deliveryCategory.create({
        data: {
            name: '식품',
            description: '식품 배송 체험'
        }
    });

    // Create test campaigns
    const campaigns = await Promise.all([
        // 방문형 캠페인
        prisma.campaign.create({
            data: {
                title: '[강남] 신규 오픈 레스토랑 방문 체험단',
                description: '새롭게 오픈한 레스토랑의 시그니처 메뉴를 체험하고 리뷰를 작성해주세요.',
                reward: 50000,
                maxParticipants: 10,
                currentParticipants: 0,
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                snsTypes: ['INSTAGRAM', 'BLOG'],
                requirements: JSON.stringify({
                    minFollowers: 1000,
                    postRequirements: '메뉴 사진 10장 이상, 매장 전경 사진 필수'
                }),
                reviewTemplate: JSON.stringify({
                    sections: ['매장 분위기', '음식 맛', '서비스', '가격 대비 만족도']
                }),
                status: 'ONGOING',
                isVisible: true,
                locationId: location.id,
                visitCategoryId: visitCategory.id
            }
        }),
        // 배송형 캠페인
        prisma.campaign.create({
            data: {
                title: '신상 간편식 체험단 모집',
                description: '새롭게 출시된 프리미엄 간편식을 집에서 편하게 체험해보세요.',
                reward: 30000,
                maxParticipants: 20,
                currentParticipants: 0,
                startDate: new Date(),
                endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                snsTypes: ['INSTAGRAM', 'BLOG'],
                requirements: JSON.stringify({
                    minFollowers: 500,
                    postRequirements: '제품 사진 5장 이상, 조리 과정 필수'
                }),
                reviewTemplate: JSON.stringify({
                    sections: ['제품 외관', '맛', '조리 편의성', '가격 대비 만족도']
                }),
                status: 'ONGOING',
                isVisible: true,
                deliveryCategoryId: deliveryCategory.id
            }
        })
    ]);

    console.log('Seed data created successfully:', {
        location,
        visitCategory,
        deliveryCategory,
        campaigns
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 