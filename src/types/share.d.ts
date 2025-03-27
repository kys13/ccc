declare module 'react-share' {
    export interface ShareButtonProps {
        url: string;
        title?: string;
        description?: string;
        imageUrl?: string;
        quote?: string;
        hashtag?: string;
        children?: React.ReactNode;
        className?: string;
    }

    export const FacebookShareButton: React.FC<ShareButtonProps>;
    export const TwitterShareButton: React.FC<ShareButtonProps>;
    export const LineShareButton: React.FC<ShareButtonProps>;
    export const KakaoShareButton: React.FC<ShareButtonProps>;
} 