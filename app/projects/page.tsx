import { ChapterIcon } from '@/components/chapter-icon';
import type { Metadata } from 'next';
import Link from 'next/link';
import { assignments } from '@/src/data/assignments';
import { ProjectGrid } from '@/components/interactions';
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
          Sáu bài tập được biên tập theo đúng danh mục của đề thi. Mỗi bài gồm mục tiêu, quá trình
          thực hiện và sản phẩm; các ảnh hoặc liên kết chưa có trong hồ sơ được ghi rõ để bổ sung.
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
              <p className="project-summary">{a.description}</p>
              <p className="eyebrow">
                {a.textbookSection} · {a.weight} điểm
              </p>
              <div className="tags">
                {a.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
            <div className={`row-art art-${a.id}`} aria-hidden="true">
              <span>
                <ChapterIcon id={a.id} />
              </span>
            </div>
            <span className="row-arrow">↗</span>
          </Link>
        ))}
      </section>
      <section className="section-pad stone">
        <ProjectGrid />
      </section>
    </>
  );
}
