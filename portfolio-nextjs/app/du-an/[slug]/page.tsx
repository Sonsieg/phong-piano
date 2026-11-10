// 6 trang bài tập: /du-an/bai-1 … /du-an/bai-6.
// Mỗi trang có tiêu đề ghi rõ tên bài và chương, đủ 3 phần a) Mục tiêu b) Quá trình c) Sản phẩm,
// và nút quay lại trang Dự án / chuyển sang bài kế tiếp (đúng yêu cầu Câu 2 của đề).
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { baiTap } from "../../../content/portfolio";
import { Bang, DinhDang, KhoiNoiDung, TepNhung } from "../../../components/portfolio-ui";
import s from "../../../components/portfolio.module.css";

type Props = { params: Promise<{ slug: string }> };

// Sinh sẵn đủ 6 trang lúc build (chạy được cả khi xuất tĩnh lên GitHub Pages).
export const dynamicParams = false;
export function generateStaticParams() {
  return baiTap.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bai = baiTap.find((b) => b.slug === slug);
  return bai ? { title: `Bài ${bai.so}. ${bai.ten}`, description: bai.tomTat } : {};
}

export default async function TrangBaiTap({ params }: Props) {
  const { slug } = await params;
  const i = baiTap.findIndex((b) => b.slug === slug);
  if (i < 0) notFound();
  const bai = baiTap[i];
  const truoc = i > 0 ? baiTap[i - 1] : undefined;
  const sau = i < baiTap.length - 1 ? baiTap[i + 1] : undefined;
  const { mucTieu, quaTrinh, sanPham } = bai;

  return (
    <article className={s.trang}>
      <nav className={s.duongDan} aria-label="Đường dẫn">
        <Link href="/du-an">Dự án</Link> <span aria-hidden="true">/</span> Bài {bai.so}
      </nav>

      <header className={s.dauTrang}>
        <p className={s.nhanPhu}>
          {bai.chuong} · {bai.mucGiaoTrinh}
        </p>
        <h1>
          Bài {bai.so}. {bai.ten}
        </h1>
        <p className={s.moTaNgan}>{bai.tomTat}</p>
      </header>

      <section className={s.muc} aria-labelledby="muc-tieu">
        <h2 id="muc-tieu">
          <span className={s.soMuc}>a</span>Mục tiêu bài tập
        </h2>
        <p>
          <DinhDang text={mucTieu.yeuCau} />
        </p>
        <h3>Kỹ năng được rèn luyện</h3>
        <ul>
          {mucTieu.kyNang.map((k, j) => (
            <li key={j}>
              <DinhDang text={k} />
            </li>
          ))}
        </ul>
      </section>

      <section className={s.muc} aria-labelledby="qua-trinh">
        <h2 id="qua-trinh">
          <span className={s.soMuc}>b</span>Tóm tắt quá trình thực hiện
        </h2>
        <h3>Các bước thực hiện</h3>
        <ol className={s.cacBuoc}>
          {quaTrinh.cacBuoc.map((b, j) => (
            <li key={j}>
              <strong>{b.ten}</strong>
              <p>
                <DinhDang text={b.moTa} />
              </p>
            </li>
          ))}
        </ol>

        <h3>Công cụ đã sử dụng</h3>
        <Bang cot={["Công cụ", "Mục đích"]} dong={quaTrinh.congCu.map((c) => [c.ten, c.mucDich])} />

        <div className={s.hopAI}>
          <h3>Sử dụng AI</h3>
          <ul>
            {quaTrinh.suDungAI.map((a, j) => (
              <li key={j}>
                <strong>
                  <DinhDang text={a.congCu} />
                </strong>
                : <DinhDang text={a.mucDich} />
              </li>
            ))}
          </ul>
        </div>

        <h3>Khó khăn và cách giải quyết</h3>
        <Bang cot={["Khó khăn", "Cách giải quyết"]} dong={quaTrinh.khoKhan.map((k) => [k.khoKhan, k.cachGiaiQuyet])} />
      </section>

      <section className={s.muc} aria-labelledby="san-pham">
        <h2 id="san-pham">
          <span className={s.soMuc}>c</span>Sản phẩm cuối cùng
        </h2>
        <p>
          <DinhDang text={sanPham.gioiThieu} />
        </p>
        {sanPham.khoi.map((k, j) => (
          <KhoiNoiDung key={j} khoi={k} />
        ))}
        {sanPham.tep.length > 0 && (
          <>
            <h3>Minh chứng và tệp đính kèm</h3>
            <div className={s.luoiTep}>
              {sanPham.tep.map((t, j) => (
                <TepNhung key={j} tep={t} />
              ))}
            </div>
          </>
        )}
      </section>

      <nav className={s.chuyenBai} aria-label="Chuyển bài">
        {truoc ? <Link href={`/du-an/${truoc.slug}`}>← Bài {truoc.so}</Link> : <span />}
        <Link href="/du-an">Về trang Dự án</Link>
        {sau ? <Link href={`/du-an/${sau.slug}`}>Bài {sau.so} →</Link> : <Link href="/tong-ket">Trang Tổng kết →</Link>}
      </nav>
    </article>
  );
}
