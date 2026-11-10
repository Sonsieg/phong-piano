import type { Metadata } from 'next';
import Link from 'next/link';
import { tongKet } from '@/portfolio-nextjs/content/portfolio';
import { Bang, DinhDang } from '@/portfolio-nextjs/components/portfolio-ui';
import { assignments } from '@/src/data/assignments';
import s from '@/portfolio-nextjs/components/portfolio.module.css';
export const metadata: Metadata = {
  title: 'Tổng kết — Hành trình học tập',
  description: tongKet.moDau,
};
export default function Conclusion() {
  return (
    <>
      <section className="page-intro finale section-pad">
        <div className="section-label">
          <Link href="/">TRANG CHỦ / TỔNG KẾT</Link>
          <span>THE FINALE</span>
        </div>
        <p className="eyebrow">NHÌN LẠI ĐỂ TIẾP TỤC</p>
        <h1>
          Khép lại một chương.
          <br />
          <span>Mở ra hành trình mới.</span>
        </h1>
        <p className="finale-description">{tongKet.moDau}</p>
      </section>
      <div className={`conclusion-body section-pad ${s.tongKet}`}>
        <p className="note">
          Nội dung dưới đây được biên tập từ bản tổng kết bạn cung cấp. Phần cảm nhận và tự đánh giá
          cần được bạn rà soát, sửa bằng trải nghiệm thật và xác nhận trước khi nộp theo mục IV.3
          của đề thi.
        </p>
        <section>
          <p className="eyebrow">01 / TRẢI NGHIỆM VÀ CẢM NHẬN</p>
          <h2>Nhìn lại cách mình học.</h2>
          {tongKet.traiNghiem.map((text, i) => (
            <p key={i}>
              <DinhDang text={text} />
            </p>
          ))}
        </section>
        <section>
          <p className="eyebrow">02 / KIẾN THỨC VÀ KỸ NĂNG</p>
          <h2>Sáu bài tập, những kết nối.</h2>
          {tongKet.kienThuc.map((item, i) => (
            <article className="goal-row" key={i}>
              <span>0{i + 1}</span>
              <div>
                <p>
                  <DinhDang text={item.noiDung} />
                </p>
                {item.slug && (
                  <Link className="text-link" href={`/projects/${item.slug}`}>
                    Xem bài tập liên quan ↗
                  </Link>
                )}
              </div>
            </article>
          ))}
        </section>
        <section>
          <p className="eyebrow">03 / ĐIỀU TÂM ĐẮC</p>
          <h2>Từ sản phẩm đến bài học.</h2>
          {tongKet.tamDac.map((text, i) => (
            <p key={i}>
              <DinhDang text={text} />
            </p>
          ))}
          <h3>Thách thức và cách vượt qua</h3>
          <Bang
            cot={['Thách thức', 'Cách vượt qua']}
            dong={tongKet.thachThuc.map((item) => [item.thachThuc, item.cachVuotQua])}
          />
        </section>
        <section id="sources">
          <p className="eyebrow">04 / MINH BẠCH VỀ AI VÀ NGUỒN</p>
          <h2>
            Công nghệ hỗ trợ.
            <br />
            Con người làm chủ.
          </h2>
          <Bang
            cot={['Công cụ', 'Mục đích sử dụng', 'Phạm vi']}
            dong={tongKet.congCuAI.map((tool) => [tool.congCu, tool.mucDich, tool.dungO])}
          />
          <p>
            Các tên công cụ chưa xác nhận được đánh dấu để bổ sung. Nguồn học thuật được ghi tại
            phần sản phẩm của Bài 2 và Bài 6; cần đối chiếu bản gốc trước khi dùng làm căn cứ.
          </p>
          <p>
            Ảnh chân dung do người dùng cung cấp. Minh họa đại dương cầm được dựng cho website. Nhạc
            nền mặc định “Piano Concerto No.21” sử dụng tệp MP3 do người dùng cung cấp; không phải
            sản phẩm Suno AI trong danh sách thử nghiệm.
          </p>
          <p>
            Bộ đèn giao thông ở Bài 6 là tương tác tự kiểm tra. Các phân tích “Tìm hiểu & vận dụng”
            được AI hỗ trợ biên tập từ hồ sơ, không phải nhật ký thực nghiệm bổ sung.
          </p>
        </section>
        <section>
          <p className="eyebrow">05 / HƯỚNG PHÁT TRIỂN</p>
          <h2>Tiếp tục từ đây.</h2>
          <ul>
            {tongKet.huongTiepTheo.map((text, i) => (
              <li key={i}>
                <DinhDang text={text} />
              </li>
            ))}
          </ul>
          <div className={s.loiKet}>
            {tongKet.loiKet.map((text, i) => (
              <p key={i}>
                <DinhDang text={text} />
              </p>
            ))}
            <p className={s.khauHieu}>{tongKet.khauHieu}</p>
            <p>
              <DinhDang text={tongKet.loiCamOn} />
            </p>
          </div>
        </section>
      </div>
      <section className="final-chapters section-pad">
        <p className="eyebrow">XEM LẠI SÁU BÀI TẬP</p>
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
