import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'BoChuStore - Industrial Equipment & Components',
    template: '%s | BoChuStore'
  },
  description: 'Professional-grade industrial equipment, precision components, and spare parts for your business needs. Global services and supplies.',
  keywords: ['industrial equipment', 'laser components', 'nozzles', 'spare parts', 'precision tools'],
  authors: [{ name: 'BoChuStore' }],
  creator: 'BoChuStore',
  metadataBase: new URL('https://BoChuStore.example.com'),
  openGraph: {
    type: 'website',
    locale: 'vn_VN',
    url: 'https://BoChuStore.example.com',
    siteName: 'BoChuStore',
    title: 'BoChuStore - Industrial Equipment & Components',
    description: 'Professional-grade industrial equipment, precision components, and spare parts for your business needs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BoChuStore - Industrial Equipment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoChuStore - Industrial Equipment & Components',
    description: 'Professional-grade industrial equipment, precision components, and spare parts.',
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster 
          position="top-right"
          expand={false}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}