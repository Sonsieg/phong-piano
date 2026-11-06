import type { Metadata } from 'next';
import Link from 'next/link';
import { assignments } from '@/src/data/assignments';
import { ProjectCarousel } from '@/components/interactions';
export const metadata: Metadata = { title: 'Dự án — Sáu chương' };
export default function Projects() {
  return (
    <>
      <section className="page-intro section-pad">
        <div className="section-label">
          <Link href="/">TRANG CHỦ / DỰ ÁN</Link>
          <span>THE SIX MOVEMENTS</span>
        </div>
        <p className="eyebrow">HỒ SƠ HỌC TẬP · INF2501</p>
        <h1>
          Sáu chương.
          <br />
          <span>Một hành trình.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Mỗi kỹ năng là một phím đàn. Mỗi bài tập là một chương nhỏ trong hành trình kết nối nghệ
            thuật và công nghệ.
          </p>
          <span>
            01 — 06
            <br />
            KHÁM PHÁ BÊN DƯỚI ↓
          </span>
        </div>
      </section>
      <section className="projects-index section-pad">
        <p className="note">
          Đây là khung hồ sơ học tập. Nội dung hướng dẫn bên dưới là kế hoạch tham khảo; minh chứng
          và kết quả thực tế chưa được bổ sung.
        </p>
        {assignments.map((a) => (
          <Link href={`/projects/${a.slug}`} className="project-row" key={a.id}>
            <span className="row-number">0{a.id}</span>
            <div className="project-row-main">
              <p className="eyebrow">
                {a.chapter} / {a.skills[0]}
              </p>
              <h2>{a.shortTitle}</h2>
              <p>{a.title}</p>
              <div className="tags">
                {a.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
            <div className={`row-art art-${a.id}`} aria-hidden="true">
              <span>{['⌘', '⌕', '“', '+', '✳', '≈'][a.id - 1]}</span>
            </div>
            <span className="row-arrow">↗</span>
          </Link>
        ))}
      </section>
      <section className="section-pad stone">
        <ProjectCarousel />
      </section>
    </>
  );
}
