import type { Metadata } from 'next';
import Link from 'next/link';
import { TributeVideo } from '@/components/tribute-video';
import { student } from '@/src/config/student';

export const metadata: Metadata = {
  title: 'Tri ân thầy — Một lời cảm ơn',
  description:
    'Lời cảm ơn gửi thầy Vũ Việt Hoàng trong học phần Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo.',
};

export default function TributePage() {
  return (
    <>
      <section className="page-intro section-pad tribute-intro">
        <div className="section-label">
          <Link href="/">TRANG CHỦ / TRI ÂN</Link>
          <span>MỘT LỜI CẢM ƠN</span>
        </div>
        <p className="eyebrow">KÍNH GỬI THẦY {student.supervisor.toUpperCase()}</p>
        <h1>
          Cảm ơn thầy,
          <br />
          <span>người đồng hành.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Em xin gửi thầy lời cảm ơn chân thành vì sự hướng dẫn và đồng hành trong học phần{' '}
            {student.courseName}. Video này là một lời tri ân nhỏ em muốn gửi tới thầy.
          </p>
          <span>
            ĐINH QUANG PHONG
            <br />
            K20F · INF2501
          </span>
        </div>
      </section>
      <section className="section-pad tribute-screen" aria-label="Video tri ân thầy giáo">
        <TributeVideo />
        <div className="tribute-signature">
          <p>
            Kính chúc thầy luôn mạnh khỏe, nhiều niềm vui và tiếp tục truyền cảm hứng cho các thế hệ
            sinh viên.
          </p>
          <p>
            Trân trọng,
            <br />
            <strong>{student.name}</strong>
          </p>
          <Link className="text-link" href="/conclusion">
            Nhìn lại hành trình học tập ↗
          </Link>
        </div>
      </section>
    </>
  );
}
