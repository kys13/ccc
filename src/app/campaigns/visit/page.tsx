import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import CampaignLayout from '@/components/campaigns/CampaignLayout';
import CampaignSidebar from '@/components/campaigns/CampaignSidebar';
import CampaignCard from '@/components/CampaignCard';
import { Skeleton } from '@/components/ui/skeleton';

async function getVisitPageData() {
    // 카테고리 목록 조회
    const categories = await prisma.visitCategory.findMany({
        orderBy: { name: 'asc' },
    });

    // 지역 목록 조회
    const locations = await prisma.location.findMany({
        select: {
            city: true,
            district: true,
        },
        orderBy: [
            { city: 'asc' },
            { district: 'asc' },
        ],
    });

    // 중복 제거된 시/도 목록
    const cities = [...new Set(locations.map(loc => loc.city))];
    
    // 구/군 목록 (시/도별로 그룹화)
    const districtsByCity = locations.reduce((acc, loc) => {
        if (!acc[loc.city]) acc[loc.city] = [];
        acc[loc.city].push(loc.district);
        return acc;
    }, {} as Record<string, string[]>);

    return {
        categories,
        cities,
        districtsByCity,
    };
}

async function VisitCampaigns({ 
    searchParams 
}: { 
    searchParams: { [key: string]: string | undefined } 
}) {
    const { category, city, district, sns } = searchParams;
    
    // 캠페인 목록 조회
    const campaigns = await prisma.campaign.findMany({
        where: {
            status: 'active',
            campaignType: 'visit',
            ...(category && {
                visitCategory: {
                    name: category,
                },
            }),
            ...(city && {
                location: {
                    city,
                    ...(district && { district }),
                },
            }),
            ...(sns && {
                snsTypes: {
                    has: sns,
                },
            }),
        },
        include: {
            client: {
                select: {
                    name: true,
                    companyName: true,
                },
            },
            location: true,
            visitCategory: true,
        },
        orderBy: { createdAt: 'desc' },
    });

    if (campaigns.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-600">
                    해당하는 캠페인이 없습니다.
                </h3>
                <p className="text-gray-500 mt-2">
                    다른 필터 조건으로 다시 시도해보세요.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </div>
    );
}

export default async function VisitPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const { categories, cities, districtsByCity } = await getVisitPageData();
    
    return (
        <CampaignLayout
            sidebar={
                <CampaignSidebar
                    type="visit"
                    categories={categories}
                    cities={cities}
                    districts={searchParams.city ? districtsByCity[searchParams.city] : []}
                />
            }
        >
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">방문 캠페인</h1>
                <Suspense fallback={<CampaignsSkeleton />}>
                    <VisitCampaigns searchParams={searchParams} />
                </Suspense>
            </div>
        </CampaignLayout>
    );
}

function CampaignsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-4">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
} 