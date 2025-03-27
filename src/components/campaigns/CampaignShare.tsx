import { useState } from 'react';
import {
    ShareIcon,
    LinkIcon,
    QrCodeIcon,
} from '@heroicons/react/24/outline';
import {
    FacebookShareButton,
    TwitterShareButton,
    KakaoShareButton,
    LineShareButton,
} from 'react-share';
import QRCode from 'qrcode.react';
import { toast } from '@/components/ui/toast';
import { Dialog } from '@/components/ui/dialog';

interface CampaignShareProps {
    campaignId: number;
    title: string;
    description: string;
    imageUrl: string;
}

export default function CampaignShare({
    campaignId,
    title,
    description,
    imageUrl,
}: CampaignShareProps) {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/campaigns/${campaignId}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast({
                title: '링크 복사 완료',
                description: '캠페인 링크가 클립보드에 복사되었습니다.',
                type: 'success',
            });
        } catch (error) {
            toast({
                title: '링크 복사 실패',
                description: '링크 복사 중 오류가 발생했습니다.',
                type: 'error',
            });
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsQRModalOpen(true)}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
                <ShareIcon className="w-5 h-5" />
                <span>공유하기</span>
            </button>

            <Dialog
                open={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                title="캠페인 공유하기"
            >
                <div className="p-6">
                    {/* SNS 공유 버튼 */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <KakaoShareButton
                            url={url}
                            title={title}
                            description={description}
                            imageUrl={imageUrl}
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src="/icons/kakao.svg"
                                alt="카카오톡"
                                className="w-12 h-12"
                            />
                            <span className="text-sm">카카오톡</span>
                        </KakaoShareButton>

                        <FacebookShareButton
                            url={url}
                            quote={title}
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src="/icons/facebook.svg"
                                alt="페이스북"
                                className="w-12 h-12"
                            />
                            <span className="text-sm">페이스북</span>
                        </FacebookShareButton>

                        <TwitterShareButton
                            url={url}
                            title={title}
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src="/icons/twitter.svg"
                                alt="트위터"
                                className="w-12 h-12"
                            />
                            <span className="text-sm">트위터</span>
                        </TwitterShareButton>

                        <LineShareButton
                            url={url}
                            title={title}
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src="/icons/line.svg"
                                alt="라인"
                                className="w-12 h-12"
                            />
                            <span className="text-sm">라인</span>
                        </LineShareButton>
                    </div>

                    {/* URL 복사 */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <input
                                type="text"
                                value={url}
                                readOnly
                                className="flex-1 bg-transparent outline-none"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="p-2 hover:bg-gray-200 rounded-full"
                            >
                                <LinkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* QR 코드 */}
                    <div className="text-center">
                        <div className="inline-block p-4 bg-white rounded-lg">
                            <QRCode value={url} size={200} />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            QR 코드를 스캔하여 캠페인 정보를 확인하세요
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
} 