// Trang Tổng kết (Conclusion) — Câu 3 của đề: trải nghiệm, kiến thức – kỹ năng, điểm tâm đắc,
// thách thức, liên kết tới 6 bài tập, bảng kê công cụ AI và lời kết.
import type { Metadata } from "next";
import Link from "next/link";
import { baiTap, thongTin, tongKet } from "../../content/portfolio";
import { Bang, DinhDang, LuoiBai } from "../../components/portfolio-ui";
import s from "../../components/portfolio.module.css";

export const metadata: Metadata = {
  title: "Tổng kết",
  description: tongKet.moDau,
};

export default function TrangTongKet() {
  const t = tongKet;
  return (
    <article className={s.trang}>
      <header className={s.dauTrang}>
        <p className={s.nhanPhu}>{thongTin.hocPhan}</p>
        <h1>Tổng kết</h1>
        <p className={s.moTaNgan}>
          <DinhDang text={t.moDau} />
        </p>
      </header>

      <section className={s.muc}>
        <h2>Trải nghiệm và cảm nhận</h2>
        {t.traiNghiem.map((p, i) => (
          <p key={i}>
            <DinhDang text={p} />
          </p>
        ))}
      </section>

      <section className={s.muc}>
        <h2>Kiến thức và kỹ năng quan trọng nhất</h2>
        <ul className={s.dsKienThuc}>
          {t.kienThuc.map((k, i) => {
            const bai = k.slug ? baiTap.find((b) => b.slug === k.slug) : undefined;
            return (
              <li key={i}>
                <DinhDang text={k.noiDung} />
                {bai && (
                  <>
                    {" "}
                    <Link href={`/du-an/${bai.slug}`} className={s.lienKetNho}>
                      Bài {bai.so} →
                    </Link>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className={s.muc}>
        <h2>Điều tâm đắc nhất</h2>
        {t.tamDac.map((p, i) => (
          <p key={i}>
            <DinhDang text={p} />
          </p>
        ))}
        <h3>Thách thức và cách vượt qua</h3>
        <Bang cot={["Thách thức", "Cách vượt qua"]} dong={t.thachThuc.map((x) => [x.thachThuc, x.cachVuotQua])} />
      </section>

      <section className={s.muc}>
        <h2>Các bài tập đã hoàn thành</h2>
        <LuoiBai />
      </section>

      <section className={s.muc}>
        <h2>Bảng kê công cụ AI đã sử dụng</h2>
        <Bang cot={["Công cụ", "Mục đích sử dụng", "Dùng ở"]} dong={t.congCuAI.map((c) => [c.congCu, c.mucDich, c.dungO])} />
      </section>

      <section className={s.muc}>
        <h2>Hành trình tiếp theo</h2>
        <ul>
          {t.huongTiepTheo.map((h, i) => (
            <li key={i}>
              <DinhDang text={h} />
            </li>
          ))}
        </ul>
      </section>

      <section className={s.loiKet} aria-label="Lời kết">
        {t.loiKet.map((p, i) => (
          <p key={i}>
            <DinhDang text={p} />
          </p>
        ))}
        <p className={s.khauHieu}>{t.khauHieu}</p>
        <p className={s.camOn}>
          <DinhDang text={t.loiCamOn} />
        </p>
      </section>
    </article>
  );
}
