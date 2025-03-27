declare module 'qrcode.react' {
    export interface QRCodeProps {
        value: string;
        size?: number;
        level?: 'L' | 'M' | 'Q' | 'H';
        bgColor?: string;
        fgColor?: string;
        style?: React.CSSProperties;
        includeMargin?: boolean;
        imageSettings?: {
            src: string;
            height: number;
            width: number;
            excavate: boolean;
        };
    }

    const QRCode: React.FC<QRCodeProps>;
    export default QRCode;
} 