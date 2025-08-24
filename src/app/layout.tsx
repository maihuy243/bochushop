import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'BoChuStore - Thiết bị & Linh kiện Công nghiệp',
    template: '%s | BoChuStore',
  },
  description:
    'Thiết bị công nghiệp, linh kiện và phụ tùng chính xác cho doanh nghiệp. Dịch vụ và nguồn cung toàn cầu.',
  keywords: [
    'thiết bị công nghiệp',
    'linh kiện laser',
    'vòi phun nozzle',
    'phụ tùng thay thế',
    'dụng cụ chính xác',
  ],
  authors: [{ name: 'BoChuStore' }],
  creator: 'BoChuStore',
  metadataBase: new URL('https://www.bochu.store'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://www.bochu.store',
    siteName: 'BoChuStore',
    title: 'BoChuStore - Thiết bị & Linh kiện Công nghiệp',
    description:
      'Thiết bị công nghiệp, linh kiện và phụ tùng chính xác cho doanh nghiệp. Dịch vụ và nguồn cung toàn cầu.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BoChuStore - Thiết bị công nghiệp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoChuStore - Thiết bị & Linh kiện Công nghiệp',
    description:
      'Thiết bị công nghiệp, linh kiện laser và phụ tùng chính xác.',
    images: ['/og-image.jpg'],
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
    google: 'google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster position="top-right" expand={false} richColors closeButton />
      </body>
    </html>
  );
}
