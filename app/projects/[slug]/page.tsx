import { ExerciseWorkspace } from '@/components/exercise-workspace';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { assignments } from '@/src/data/assignments';
import { AssignmentContent } from '@/components/assignment-content';
import { MediaViewer } from '@/components/interactions';
export function generateStaticParams() {
  return assignments.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = assignments.find((a) => a.slug === slug);
  return {
    title: a ? `${a.chapter} — ${a.title}` : 'Không tìm thấy bài tập',
    description: a?.description,
  };
}
export default async function AssignmentPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const a = assignments.find((a) => a.slug === slug);
  if (!a) notFound();
  const prev = assignments[a.id - 2];
  const next = assignments[a.id];
  return (
    <>
      <section className="assignment-hero section-pad">
        <div className="section-label">
          <Link href="/projects">← DỰ ÁN / {a.chapter.toUpperCase()}</Link>
          <span>INF2501 / 0{a.id}—06</span>
        </div>
        <div className="assignment-title">
          <span className="chapter-big">0{a.id}</span>
          <div>
            <p className="eyebrow lime">{a.chapter} / THE ART OF LEARNING</p>
            <h1>{a.title}</h1>
            <p>{a.description}</p>
          </div>
        </div>
        <div className="assignment-hero-bottom">
          <div className="tags">
            {a.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <span className="status">
            <i />
            {a.status}
          </span>
        </div>
      </section>
      <div className="assignment-body section-pad">
        <aside className="assignment-sidebar">
          <p className="eyebrow">TRONG CHƯƠNG NÀY</p>
          <a href="#objectives">01 — Mục tiêu</a>
          <a href="#process">02 — Quy trình</a>
          <a href="#workshop">03 — Nội dung thực hành</a>
          <a href="#my-work">＋ Bài làm & trợ giảng</a>
          <a href="#evidence">04 — Sản phẩm & minh chứng</a>
          <a href="#reflection">05 — Tự đánh giá & nguồn</a>
          <p className="sidebar-note">
            Nội dung thực hành là hướng dẫn tham khảo. Sinh viên cần bổ sung quá trình thực hiện và
            kết quả của mình.
          </p>
        </aside>
        <div className="assignment-content">
          <section id="objectives">
            <p className="eyebrow">01 / MỤC TIÊU HỌC TẬP</p>
            <h2>
              Bắt đầu từ
              <br />
              điều cần hiểu.
            </h2>
            {a.objectives.map((s, i) => (
              <div className="objective" key={s}>
                <span>0{i + 1}</span>
                <p>{s}</p>
              </div>
            ))}
          </section>
          <section id="process">
            <p className="eyebrow">02 / KẾ HOẠCH THỰC HIỆN</p>
            <h2>
              Từng bước
              <br />
              tạo nên kết quả.
            </h2>
            <p className="note">Các bước đề xuất, chưa xác nhận là công việc đã hoàn thành.</p>
            <ol className="process-list">
              {a.implementationSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <div className="tool-line">
              <span>CÔNG CỤ</span>
              <p>{a.toolsUsed.join(' / ')}</p>
            </div>
          </section>
          <section id="workshop" className="workshop">
            <p className="eyebrow">03 / KHÔNG GIAN THỰC HÀNH</p>
            <AssignmentContent id={a.id} />
          </section>
          <ExerciseWorkspace key={a.id} id={a.id} />
          <section id="evidence">
            <p className="eyebrow">04 / SẢN PHẨM & MINH CHỨNG</p>
            <h2>
              Để quá trình
              <br />
              có tiếng nói.
            </h2>
            <MediaViewer items={a.deliverables} />
          </section>
          <section id="reflection">
            <p className="eyebrow">05 / TỰ ĐÁNH GIÁ & NGUỒN</p>
            <h2>
              Nhìn lại để
              <br />
              tiến xa hơn.
            </h2>
            <div className="reflection-row">
              <h3>Khó khăn gặp phải</h3>
              <p>{a.challenges}</p>
            </div>
            <div className="reflection-row">
              <h3>Cách giải quyết</h3>
              <p>{a.solutions}</p>
            </div>
            <div className="reflection-row">
              <h3>Công bố sử dụng AI</h3>
              <p>{a.aiUsage}</p>
            </div>
            <div className="reflection-row">
              <h3>Tài liệu tham khảo</h3>
              {a.references.length ? (
                a.references.map((r) => (
                  <a href={r.url} key={r.url} target="_blank" rel="noopener noreferrer">
                    {r.title} ↗
                  </a>
                ))
              ) : (
                <p>
                  Chưa bổ sung nguồn học thuật được sử dụng. Không có trích dẫn hoặc kết quả nghiên
                  cứu được tạo thay cho sinh viên.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
      <nav className="chapter-navigation" aria-label="Điều hướng giữa các bài tập">
        {prev ? (
          <Link href={`/projects/${prev.slug}`}>
            <span>← CHƯƠNG TRƯỚC</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <Link href="/projects">
            <span>← MỤC LỤC</span>
            <strong>Sáu chương học tập</strong>
          </Link>
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`}>
            <span>CHƯƠNG TIẾP THEO →</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <Link href="/conclusion">
            <span>LỜI KẾT →</span>
            <strong>Khép lại một chương.</strong>
          </Link>
        )}
      </nav>
    </>
  );
}
