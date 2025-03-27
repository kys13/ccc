import { Metadata } from 'next';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}

export function generateMetadata({
  title = '인플루언서 마케팅 플랫폼',
  description = '인플루언서와 브랜드를 연결하는 마케팅 플랫폼',
  keywords = ['인플루언서', '마케팅', '캠페인', '브랜드', 'SNS'],
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonical,
}: SEOMetadataProps = {}): Metadata {
  const metaTitle = `${title} | 인플루언서 마케팅 플랫폼`;
  const metaDescription = description.length > 160 ? `${description.slice(0, 157)}...` : description;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: '인플루언서 마케팅 플랫폼',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-site-verification',
      naver: 'your-naver-site-verification',
    },
  };
} 