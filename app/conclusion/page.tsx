import type { Metadata } from 'next';
import Link from 'next/link';
import { assignments } from '@/src/data/assignments';
export const metadata: Metadata = { title: 'Tổng kết — Hành trình tiếp nối' };
export default function Conclusion() {
  return (
    <>
      <section className="page-intro finale section-pad">
        <div className="section-label">
          <Link href="/">TRANG CHỦ / TỔNG KẾT</Link>
          <span>THE FINALE</span>
        </div>
        <p className="eyebrow">MỘT ĐIỂM DỪNG. KHÔNG PHẢI ĐÍCH ĐẾN.</p>
        <h1>
          Khép lại một chương.
          <br />
          <span>Mở ra hành trình mới.</span>
        </h1>
        <p className="finale-description">
          Một portfolio không chỉ lưu lại điều đã làm, mà còn gợi mở những điều mình muốn trở thành.
        </p>
        <div className="finale-score" aria-hidden="true">
          <span>p.</span>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </section>
      <section className="conclusion-body section-pad">
        <div className="section-label">
          <span>01 / NHÌN LẠI</span>
          <span>GHI CHÉP CỦA NGƯỜI HỌC</span>
        </div>
        <div className="goals-layout">
          <h2>
            Những điều
            <br />
            đọng lại.
          </h2>
          <div>
            {[
              {
                title: 'Trải nghiệm học tập',
                text: 'Chưa bổ sung. Hãy viết về điều bạn hiểu thêm sau khi thực hiện sáu bài tập.',
              },
              {
                title: 'Kiến thức & kỹ năng số',
                text: 'Các chủ đề cần tự đánh giá: quản trị tệp tin, tìm kiếm học thuật, thiết kế prompt, cộng tác trực tuyến, sáng tạo nội dung và trách nhiệm với AI.',
              },
              {
                title: 'Thành quả ý nghĩa nhất',
                text: 'Chưa bổ sung thành quả thực tế. Hãy chọn một sản phẩm, dẫn minh chứng và giải thích ý nghĩa với bản thân.',
              },
              {
                title: 'Thử thách & bài học',
                text: 'Chưa bổ sung trải nghiệm cá nhân. Mô tả một khó khăn, cách giải quyết và điều sẽ thay đổi trong lần sau.',
              },
            ].map((r, i) => (
              <article className="goal-row" key={r.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad sources" id="sources">
        <div className="section-label">
          <span>02 / MINH BẠCH & TRÁCH NHIỆM</span>
          <span>AI / SOURCES</span>
        </div>
        <div className="two-col">
          <div>
            <h2>
              Công nghệ hỗ trợ.
              <br />
              Con người làm chủ.
            </h2>
            <p>
              Website được xây dựng với sự hỗ trợ của trợ lý AI để tổ chức mã nguồn, thiết kế và
              soạn nội dung hướng dẫn minh họa. Thông tin cá nhân và ảnh chân dung do người dùng
              cung cấp.
            </p>
            <p>
              Các bước thực hành, prompt và cấu trúc thư mục là ví dụ tham khảo, không đại diện cho
              bài tập đã hoàn thành. Phản tư, nhật ký AI và minh chứng học tập cần được sinh viên tự
              bổ sung, kiểm tra và chịu trách nhiệm trước khi nộp.
            </p>
          </div>
          <div>
            <h3>Nguồn & tài nguyên</h3>
            <p>
              Hình đại dương cầm: minh họa vector được dựng cho website, không phải ảnh biểu diễn
              của sinh viên.
            </p>
            <p>Ảnh chân dung: ảnh do người dùng cung cấp.</p>
            <p>Định hướng thiết kế: “Piano Prelude: Luxury Editorial Portfolio”.</p>
            <h3>Lưu ý hồ sơ học phần</h3>
            <p>
              Báo cáo Word là bài nộp riêng, website không thay thế báo cáo. Thông tin khoa và các
              sản phẩm bài tập còn cần bổ sung.
            </p>
          </div>
        </div>
      </section>
      <section className="final-chapters section-pad">
        <p className="eyebrow">LẮNG NGHE LẠI TỪNG CHƯƠNG</p>
        {assignments.map((a) => (
          <Link key={a.id} href={`/projects/${a.slug}`}>
            <span>0{a.id}</span>
            <strong>{a.title}</strong>
            <span>↗</span>
          </Link>
        ))}
      </section>
    </>
  );
}
