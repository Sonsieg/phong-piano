import type { Metadata } from 'next';
import { Header, Footer } from '@/components/shell';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'Đinh Quang Phong — PIANO / PRELUDE', template: '%s — PIANO / PRELUDE' },
  description:
    'Portfolio học tập của Đinh Quang Phong, sinh viên Sư phạm âm nhạc. Sáu chương khám phá âm nhạc, công nghệ số và AI có trách nhiệm.',
  openGraph: {
    title: 'Đinh Quang Phong — PIANO / PRELUDE',
    description: 'Âm nhạc, học tập và nghệ thuật trở thành chính mình.',
    locale: 'vi_VN',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <a href="#main" className="skip-link">
          Đến nội dung chính
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
