import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/toast';

interface CampaignDisplaySettingsProps {
    campaignId: number;
    initialSettings: {
        main: boolean;
        popular: boolean;
        recommended: boolean;
    };
}

export default function CampaignDisplaySettings({ 
    campaignId, 
    initialSettings 
}: CampaignDisplaySettingsProps) {
    const [settings, setSettings] = useState(initialSettings);
    const [isUpdating, setIsUpdating] = useState(false);

    const updateDisplaySettings = async (key: keyof typeof settings, value: boolean) => {
        try {
            setIsUpdating(true);
            const newSettings = { ...settings, [key]: value };
            
            const response = await fetch(`/api/campaigns/${campaignId}/display`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ displaySettings: newSettings }),
            });

            if (!response.ok) {
                throw new Error('설정 업데이트에 실패했습니다.');
            }

            setSettings(newSettings);
            toast({
                title: '성공',
                description: '노출 설정이 업데이트되었습니다.',
                type: 'success',
            });
        } catch (error) {
            toast({
                title: '오류',
                description: '노출 설정 업데이트에 실패했습니다.',
                type: 'error',
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">노출 설정</h3>
            
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium">메인 페이지</div>
                        <div className="text-sm text-gray-500">
                            메인 페이지에 캠페인을 노출합니다.
                        </div>
                    </div>
                    <Switch
                        checked={settings.main}
                        onCheckedChange={(checked) => updateDisplaySettings('main', checked)}
                        disabled={isUpdating}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium">인기 캠페인</div>
                        <div className="text-sm text-gray-500">
                            인기 캠페인 섹션에 노출합니다.
                        </div>
                    </div>
                    <Switch
                        checked={settings.popular}
                        onCheckedChange={(checked) => updateDisplaySettings('popular', checked)}
                        disabled={isUpdating}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium">추천 캠페인</div>
                        <div className="text-sm text-gray-500">
                            추천 캠페인 섹션에 노출합니다.
                        </div>
                    </div>
                    <Switch
                        checked={settings.recommended}
                        onCheckedChange={(checked) => updateDisplaySettings('recommended', checked)}
                        disabled={isUpdating}
                    />
                </div>
            </div>
        </div>
    );
} 