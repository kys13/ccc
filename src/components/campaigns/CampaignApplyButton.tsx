import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

interface CampaignApplyButtonProps {
    campaignId: number;
    isAuthenticated: boolean;
    isFull: boolean;
    hasApplied: boolean;
}

export default function CampaignApplyButton({
    campaignId,
    isAuthenticated,
    isFull,
    hasApplied,
}: CampaignApplyButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleApply = async () => {
        if (!isAuthenticated) {
            router.push(`/auth/login?redirect=/campaigns/${campaignId}`);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`/api/campaigns/${campaignId}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '신청에 실패했습니다.');
            }

            toast({
                title: '신청 완료',
                description: '캠페인 신청이 완료되었습니다.',
                type: 'success',
            });

            router.refresh();
        } catch (error) {
            toast({
                title: '오류',
                description: error instanceof Error ? error.message : '신청 중 오류가 발생했습니다.',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (hasApplied) {
        return (
            <Button
                disabled
                className="w-full h-12 text-lg"
            >
                이미 신청한 캠페인입니다
            </Button>
        );
    }

    if (isFull) {
        return (
            <Button
                disabled
                className="w-full h-12 text-lg"
            >
                모집이 마감되었습니다
            </Button>
        );
    }

    return (
        <Button
            onClick={handleApply}
            disabled={isLoading}
            className="w-full h-12 text-lg bg-primary text-white hover:bg-primary-dark"
        >
            {isLoading ? '신청 중...' : '캠페인 신청하기'}
        </Button>
    );
} 