import { BasicAssignmentOne } from '@/components/basic-assignment-one';
import { ProjectAnswer } from '@/components/project-answer';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { assignments } from '@/src/data/assignments';
import { baiTap } from '@/portfolio-nextjs/content/portfolio';
import { Bang, DinhDang, KhoiNoiDung, TepNhung } from '@/portfolio-nextjs/components/portfolio-ui';
import s from '@/portfolio-nextjs/components/portfolio.module.css';
import { learningConnections } from '@/src/data/learning-connections';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return assignments.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = assignments.find((item) => item.slug === slug);
  return {
    title: a ? `Bài ${a.id} — ${a.title}` : 'Không tìm thấy bài tập',
    description: a?.description,
  };
}
export default async function AssignmentPage({ params }: Props) {
  const { slug } = await params;
  const a = assignments.find((item) => item.slug === slug);
  const b = baiTap.find((item) => item.slug === slug);
  if (!a || !b) notFound();
  const previous = assignments[a.id - 2];
  const next = assignments[a.id];
  const insight = learningConnections[a.id - 1];
  const advancedAnswer = (
    <>
      <section id="objectives">
        <p className="eyebrow">a / MỤC TIÊU BÀI TẬP</p>
        <h2>Yêu cầu & kỹ năng.</h2>
        <p>
          <DinhDang text={b.mucTieu.yeuCau} />
        </p>
        <h3>Kỹ năng được rèn luyện</h3>
        {b.mucTieu.kyNang.map((skill, i) => (
          <div className="objective" key={skill}>
            <span>0{i + 1}</span>
            <p>
              <DinhDang text={skill} />
            </p>
          </div>
        ))}
      </section>
      <section id="process">
        <p className="eyebrow">b / TÓM TẮT QUÁ TRÌNH THỰC HIỆN</p>
        <h2>
          Từ lựa chọn
          <br />
          đến cách giải quyết.
        </h2>
        <ol className="process-list">
          {b.quaTrinh.cacBuoc.map((step) => (
            <li key={step.ten}>
              <div className="process-step">
                <h3>{step.ten}</h3>
                <p>
                  <DinhDang text={step.moTa} />
                </p>
              </div>
            </li>
          ))}
        </ol>
        <h3>Công cụ và mục đích sử dụng</h3>
        <Bang
          cot={['Công cụ', 'Mục đích']}
          dong={b.quaTrinh.congCu.map((tool) => [tool.ten, tool.mucDich])}
        />
        <div className={s.hopAI}>
          <h3>Công bố sử dụng AI</h3>
          {b.quaTrinh.suDungAI.map((tool, i) => (
            <p key={i}>
              <strong>
                <DinhDang text={tool.congCu} />
              </strong>
              : <DinhDang text={tool.mucDich} />
            </p>
          ))}
          <p>
            <strong>Codex (OpenAI)</strong>: hỗ trợ tích hợp hồ sơ vào website, biên tập trình bày
            và kiểm tra kỹ thuật trong lần cập nhật này.
          </p>
        </div>
        <h3>Khó khăn và cách giải quyết</h3>
        <Bang
          cot={['Khó khăn', 'Cách giải quyết']}
          dong={b.quaTrinh.khoKhan.map((item) => [item.khoKhan, item.cachGiaiQuyet])}
        />
      </section>
      <section id="workshop">
        <p className="eyebrow">c / SẢN PHẨM CUỐI CÙNG</p>
        <h2>
          Kết quả có cấu trúc.
          <br />
          Lập luận có căn cứ.
        </h2>
        <p>
          <DinhDang text={b.sanPham.gioiThieu} />
        </p>
        {a.id === 4 && (
          <p className="note">
            Phần tự đánh giá phối hợp nhóm trong hồ sơ cần được sinh viên rà soát và xác nhận theo
            trải nghiệm thực tế trước khi nộp.
          </p>
        )}
        {b.sanPham.khoi.map((block, i) => (
          <KhoiNoiDung key={i} khoi={block} />
        ))}
      </section>
      <section id="evidence">
        <p className="eyebrow">MINH CHỨNG / TỆP ĐÍNH KÈM</p>
        <h2>
          Đối chiếu với
          <br />
          sản phẩm thực tế.
        </h2>
        <p className="note">
          Các tệp dưới đây là danh mục minh chứng của hồ sơ. Tệp chưa được cung cấp sẽ hiển thị
          trạng thái chờ bổ sung.
        </p>
        <div className={s.luoiTep}>
          {b.sanPham.tep.map((file, i) => (
            <TepNhung key={i} tep={file} />
          ))}
        </div>
      </section>
      <section id="connections" className="learning-insight">
        <p className="eyebrow">TÌM HIỂU / LỰA CHỌN / VẬN DỤNG</p>
        <h2>{insight.title}</h2>
        <p>{insight.reasoning}</p>
        <h3>Giới hạn cần nhận diện</h3>
        <p>{insight.limit}</p>
        <h3>Kết nối với hành trình học tập</h3>
        <p>{insight.application}</p>
        <Link href={`/projects/bai-${insight.related}`} className="text-link">
          Đọc bài {insight.related} liên quan ↗
        </Link>
      </section>
    </>
  );
  return (
    <>
      <section className="assignment-hero section-pad">
        <div className="section-label">
          <Link href="/projects">← DỰ ÁN / BÀI {a.id}</Link>
          <span>INF2501 / {a.textbookSection}</span>
        </div>
        <div className="assignment-title">
          <span className="chapter-big">0{a.id}</span>
          <div>
            <p className="eyebrow lime">{a.chapterName}</p>
            <h1>{a.title}</h1>
            <p>{a.description}</p>
          </div>
        </div>
        <div className="assignment-hero-bottom">
          <div className="tags">
            {a.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <span className="status">
            <i />
            Nội dung đã tích hợp
          </span>
        </div>
      </section>
      <div className="assignment-body section-pad">
        <aside className="assignment-sidebar">
          <p className="eyebrow">TRONG BÀI TẬP NÀY</p>
          <a href="#project-answer">Câu trả lời & hình ảnh</a>
          {a.id === 1 ? (
            <>
              <a href="#basic-process">Thao tác cơ bản</a>
              <a href="#basic-product">c — Sản phẩm cuối cùng</a>
              <a href="#advanced-answer">Bài tập 1, theo cách nâng cao</a>
            </>
          ) : (
            <>
              <a href="#objectives">a — Mục tiêu & kỹ năng</a>
              <a href="#process">b — Quá trình thực hiện</a>
              <a href="#workshop">c — Sản phẩm cuối cùng</a>
              <a href="#evidence">Minh chứng & tệp đính kèm</a>
              <a href="#connections">Tìm hiểu & vận dụng</a>
            </>
          )}
          <Link href="/projects">← Về danh mục dự án</Link>
          <p className="sidebar-note">
            {a.textbookSection} · {a.weight} điểm theo đề. Nội dung được biên tập từ hồ sơ cung cấp;
            các mục cần bổ sung được đánh dấu riêng.
          </p>
        </aside>
        <div className={`assignment-content ${s.noiDung}`}>
          <ProjectAnswer key={a.id} id={a.id} />
          <details className="personal-work" id="reference-material">
            <summary>Yêu cầu & tài liệu tham khảo của bài</summary>
            {a.id === 1 && <BasicAssignmentOne />}
            {a.id === 1 ? (
              <details id="advanced-answer" className="personal-work">
                <summary>Bài tập 1, theo cách nâng cao</summary>
                {advancedAnswer}
              </details>
            ) : (
              advancedAnswer
            )}
          </details>
        </div>
      </div>
      <nav className="chapter-navigation" aria-label="Điều hướng bài tập">
        <Link href={previous ? `/projects/${previous.slug}` : '/projects'}>
          <span>{previous ? '← BÀI TRƯỚC' : '← DANH MỤC'}</span>
          <strong>{previous?.title ?? 'Sáu bài tập'}</strong>
        </Link>
        <Link href={next ? `/projects/${next.slug}` : '/conclusion'}>
          <span>{next ? 'BÀI TIẾP THEO →' : 'TỔNG KẾT →'}</span>
          <strong>{next?.title ?? 'Nhìn lại hành trình học tập'}</strong>
        </Link>
      </nav>
    </>
  );
}
