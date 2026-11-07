import Image from 'next/image';
import Link from 'next/link';
import { Hero, PianoKeyboard, ProjectGrid } from '@/components/interactions';
import { student } from '@/src/config/student';
export default function Home() {
  return (
    <>
      <Hero />
      <div className="ticker" aria-hidden="true">
        <span>THE ART OF BECOMING</span>
        <b>✳</b>
        <span>ÂM NHẠC & CÔNG NGHỆ</span>
        <b>✳</b>
        <span>MỘT HÀNH TRÌNH CỦA ĐINH QUANG PHONG</span>
        <b>✳</b>
      </div>
      <section id="about" className="about section-pad">
        <div className="section-label">
          <span>01 / VỀ TÔI</span>
          <span>MỘT CHÚT GIỚI THIỆU</span>
        </div>
        <div className="about-grid">
          <div className="portrait-wrap">
            <div className="portrait-stage">
              <div className="portrait-spotlight" aria-hidden="true" />
              <div className="portrait-staff" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="portrait-piano-motif" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <Image
                className="portrait-cutout"
                src={student.avatar}
                alt="Chân dung Đinh Quang Phong trên nền trang trí lấy cảm hứng sân khấu piano"
                width={1031}
                height={1525}
                sizes="(max-width: 760px) 88vw, 36vw"
              />
              <span className="portrait-stage-label" aria-hidden="true">
                ÂM NHẠC / MỘT ĐAM MÊ
              </span>
            </div>
            <div className="portrait-caption">
              <span>ĐINH QUANG PHONG</span>
              <span>2007 — VIỆT NAM</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">NGƯỜI HỌC NHẠC. NGƯỜI KỂ CHUYỆN.</p>
            <h2>
              Xin chào,
              <br />
              tôi là <span>Phong.</span>
            </h2>
            <p className="lead">{student.biography}</p>
            <div className="student-details">
              <div>
                <span>NGÀNH HỌC</span>
                <p>{student.major}</p>
              </div>
              <div>
                <span>TRƯỜNG</span>
                <p>{student.university}</p>
              </div>
              <div>
                <span>MSSV / LỚP</span>
                <p>
                  {student.studentId} / {student.className}
                </p>
              </div>
              <div>
                <span>SỞ THÍCH</span>
                <p>Đá bóng & Ca hát</p>
              </div>
              <div>
                <span>GIẢNG VIÊN HƯỚNG DẪN</span>
                <p>{student.supervisor}</p>
              </div>
              <div>
                <span>KHOA</span>
                <p>{student.faculty}</p>
              </div>
            </div>
            <a href={`mailto:${student.email}`} className="text-link">
              Trò chuyện cùng tôi <span>↗</span>
            </a>
          </div>
        </div>
      </section>
      <section className="philosophy section-pad">
        <div className="section-label">
          <span>02 / GÓC NHÌN</span>
          <span>CREATIVITY MEETS POSSIBILITY</span>
        </div>
        <p className="eyebrow lime">HAI THẾ GIỚI. MỘT NHỊP ĐẬP.</p>
        <h2>
          Giữa <span>nghệ thuật</span>
          <br />
          và công nghệ.
        </h2>
        <div className="philosophy-bottom">
          <span className="asterisk" aria-hidden="true">
            ✳
          </span>
          <p>
            Âm nhạc dạy tôi lắng nghe. Công nghệ mở ra những cách mới để học hỏi, sáng tạo và chia
            sẻ. Portfolio này là nơi tôi kết nối hai thế giới — bằng sự tò mò, tinh thần học tập và
            trách nhiệm với từng sản phẩm.
          </p>
        </div>
      </section>
      <section className="goals section-pad">
        <div className="section-label">
          <span>03 / ĐỊNH HƯỚNG</span>
          <span>TỪNG NGÀY, TIẾN MỘT CHÚT</span>
        </div>
        <div className="goals-layout">
          <h2>
            Học để hiểu.
            <br />
            Rèn để <span>vươn xa.</span>
          </h2>
          <div>
            {[
              {
                title: 'Vững chuyên môn',
                text: student.careerDirection[0] + ' ' + student.learningGoals,
              },
              { title: 'Trở thành người truyền cảm hứng', text: student.careerDirection[1] },
              {
                title: 'Mở rộng khả năng',
                text: 'Rèn năng lực số, tư duy sáng tạo và sử dụng AI có trách nhiệm trong học tập.',
              },
              { title: 'Sẵn sàng cho hành trình mới', text: student.careerDirection[2] },
            ].map((g, i) => (
              <article className="goal-row" key={g.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="featured section-pad">
        <div className="section-label">
          <span>04 / DỰ ÁN HỌC TẬP</span>
          <Link href="/projects">XEM TẤT CẢ ↗</Link>
        </div>
        <h2>
          Sáu chương.
          <br />
          <span>Một hành trình.</span>
        </h2>
        <ProjectGrid />
      </section>
      <PianoKeyboard />
      <section className="purpose section-pad">
        <p className="eyebrow">KHÔNG CHỈ LÀ MỘT BÀI TẬP.</p>
        <h2>
          Một bản ghi
          <br />
          của sự <span>trưởng thành.</span>
        </h2>
        <p>{student.portfolioPurpose}</p>
        <Link href="/projects" className="text-link">
          Mở chương đầu tiên <span>↗</span>
        </Link>
      </section>
    </>
  );
}
