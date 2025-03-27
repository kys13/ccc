import { ReactNode } from 'react';

interface CampaignLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
}

export default function CampaignLayout({ children, sidebar }: CampaignLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* 사이드바 */}
                <div className="lg:w-64 flex-shrink-0">
                    {sidebar}
                </div>
                
                {/* 메인 컨텐츠 */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
} 