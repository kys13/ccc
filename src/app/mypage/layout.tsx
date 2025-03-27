import React from 'react';

export const metadata = {
    title: '마이페이지 - Experience Platform',
    description: '북마크한 캠페인과 신청한 캠페인을 관리하고 프로필을 수정할 수 있습니다.',
};

export default function MyPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-gray-50">
            {children}
        </main>
    );
} 