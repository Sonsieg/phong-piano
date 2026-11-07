import { ExperienceMotion } from '@/components/experience-motion';
import type { Metadata } from 'next';
import { MusicProvider } from '@/components/music/music-provider';
import { MusicPlayer } from '@/components/music/music-player';
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
        <MusicProvider>
          <ExperienceMotion />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
