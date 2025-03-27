import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import CampaignLayout from '@/components/campaigns/CampaignLayout';
import CampaignSidebar from '@/components/campaigns/CampaignSidebar';
import CampaignCard from '@/components/CampaignCard';
import { Skeleton } from '@/components/ui/skeleton';

async function getDeliveryPageData() {
    // 카테고리 목록 조회
    const categories = await prisma.deliveryCategory.findMany({
        orderBy: { name: 'asc' },
    });

    return {
        categories,
        cities: [],
        districts: [],
    };
}

async function DeliveryCampaigns({ 
    searchParams 
}: { 
    searchParams: { [key: string]: string | undefined } 
}) {
    const { category, sns } = searchParams;
    
    // 캠페인 목록 조회
    const campaigns = await prisma.campaign.findMany({
        where: {
            status: 'active',
            campaignType: 'delivery',
            ...(category && {
                deliveryCategory: {
                    name: category,
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
            deliveryCategory: true,
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

export default async function DeliveryPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const { categories } = await getDeliveryPageData();
    
    return (
        <CampaignLayout
            sidebar={
                <CampaignSidebar
                    type="delivery"
                    categories={categories}
                    cities={[]}
                    districts={[]}
                />
            }
        >
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">배송 캠페인</h1>
                <Suspense fallback={<CampaignsSkeleton />}>
                    <DeliveryCampaigns searchParams={searchParams} />
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