import { SongLibrary } from '@/components/music/song-library';
import type { Metadata } from 'next';
import Link from 'next/link';
import { student } from '@/src/config/student';

export const metadata: Metadata = {
  title: 'Âm nhạc — Thử nghiệm sáng tạo cùng AI',
  description:
    'Giới thiệu cách Đinh Quang Phong dùng AI hỗ trợ viết lời và Suno AI để thử nghiệm các phong cách âm nhạc phù hợp với bản thân.',
};

export default function MusicPage() {
  return (
    <>
      <section className="page-intro section-pad">
        <div className="section-label">
          <Link href="/">TRANG CHỦ / ÂM NHẠC</Link>
          <span>Ý TƯỞNG · LỜI CA · ÂM THANH</span>
        </div>
        <p className="eyebrow">THỬ NGHIỆM SÁNG TẠO CÙNG AI</p>
        <h1>
          Tìm một giai điệu.
          <br />
          <span>Gần với chính mình.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Một góc dành cho những thử nghiệm kết hợp ý tưởng cá nhân với AI hỗ trợ viết lời và Suno
            AI tạo nhạc, để khám phá các cách thể hiện khác nhau.
          </p>
          <span>
            ĐINH QUANG PHONG
            <br />
            SƯ PHẠM ÂM NHẠC
          </span>
        </div>
      </section>
      <SongLibrary />
      <section className="section-pad music-experiments">
        <div className="section-label">
          <span>01 / LỜI GIỚI THIỆU</span>
          <span>KÍNH GỬI THẦY</span>
        </div>
        <div className="two-col">
          <h2>
            Khi công nghệ
            <br />
            gợi mở âm nhạc.
          </h2>
          <div>
            <p>Kính thưa thầy {student.supervisor},</p>
            <p>
              Trong những thử nghiệm âm nhạc này, em sử dụng AI để hỗ trợ viết lời bài hát và Suno
              AI để tạo các bản nhạc từ ý tưởng, lời ca và mô tả phong cách. Em muốn thử một vài
              kiểu nhạc khác nhau để tìm cách thể hiện phù hợp với sở thích và cá tính của mình.
            </p>
            <p>
              Mục đích của em là khám phá thêm khả năng sáng tạo khi kết hợp âm nhạc với công nghệ:
              cùng một ý tưởng có thể được thể hiện ra sao qua nhịp điệu, không khí và cách phối
              nhạc khác nhau. Các bản nhạc này được giới thiệu với vai trò sản phẩm thử nghiệm có AI
              hỗ trợ.
            </p>
            <p>
              Em xin ghi rõ sự tham gia của AI trong cả phần lời và phần nhạc để thầy có thể hiểu
              cách các sản phẩm được hình thành.
            </p>
          </div>
        </div>
      </section>
      <section className="section-pad stone music-experiments">
        <div className="section-label">
          <span>02 / CÔNG CỤ VÀ VAI TRÒ</span>
          <span>MINH BẠCH TRONG SÁNG TẠO</span>
        </div>
        <h2>
          Từ ý tưởng
          <br />
          đến bản nhạc thử nghiệm.
        </h2>
        <div className="music-role-grid">
          <article>
            <p className="eyebrow">01 / ĐỊNH HƯỚNG CÁ NHÂN</p>
            <h3>Chọn điều muốn thể hiện</h3>
            <p>
              Ý tưởng và mong muốn thử các phong cách phù hợp với bản thân là điểm xuất phát của
              hoạt động sáng tạo.
            </p>
          </article>
          <article>
            <p className="eyebrow">02 / AI HỖ TRỢ VIẾT LỜI</p>
            <h3>Phát triển lời ca</h3>
            <p>
              AI hỗ trợ xây dựng lời bài hát từ ý tưởng và yêu cầu. Phần lời có sự tham gia của AI
              được công bố cùng với phần nhạc.
            </p>
          </article>
          <article>
            <p className="eyebrow">03 / SUNO AI</p>
            <h3>Thử cách thể hiện âm nhạc</h3>
            <p>
              Suno AI được sử dụng để tạo bản nhạc, thử các cách thể hiện từ lời ca và mô tả phong
              cách, phục vụ việc khám phá hướng âm nhạc phù hợp.
            </p>
          </article>
        </div>
      </section>
      <section className="section-pad music-experiments">
        <div className="section-label">
          <span>03 / CÁCH TIẾP CẬN</span>
          <span>LẮNG NGHE VÀ LỰA CHỌN</span>
        </div>
        <div className="two-col">
          <h2>
            Thử nhiều cách.
            <br />
            Tìm điều phù hợp.
          </h2>
          <div>
            <p>
              Khi nghe và so sánh các bản thử nghiệm, những câu hỏi có thể dùng để lựa chọn là: lời
              ca có diễn đạt đúng ý không, nhịp điệu có phù hợp với cảm xúc muốn truyền tải không,
              và cách thể hiện có gần với sở thích của mình không?
            </p>
            <p>
              Thay đổi từng yếu tố như tốc độ, sắc thái hoặc cách phối nhạc giúp việc so sánh rõ
              hơn. Đây là hướng để tiếp tục phát triển ý tưởng và rèn khả năng nhận xét âm nhạc
              trong quá trình học.
            </p>
            <p className="note">
              Các bản nhạc nghe thử được tạo bằng Suno AI, với phần lời có AI hỗ trợ. Danh sách phía
              trên dùng chung bộ phát với nhạc nền của website.
            </p>
            <div className="music-related-links">
              <Link className="text-link" href="/projects/bai-5">
                Bài 5 · Sáng tạo nội dung với AI ↗
              </Link>
              <Link className="text-link" href="/projects/bai-6">
                Bài 6 · Sử dụng AI có trách nhiệm ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
