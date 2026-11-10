// Trang Dự án (Projects): danh mục 6 bài tập có liên kết tới từng trang con.
import type { Metadata } from "next";
import { gioiThieuDuAn, thongTin } from "../../content/portfolio";
import { DinhDang, LuoiBai } from "../../components/portfolio-ui";
import s from "../../components/portfolio.module.css";

export const metadata: Metadata = {
  title: "Dự án",
  description: "Sáu bài tập của học phần Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo.",
};

export default function TrangDuAn() {
  return (
    <article className={s.trang}>
      <header className={s.dauTrang}>
        <p className={s.nhanPhu}>{thongTin.hocPhan}</p>
        <h1>Dự án</h1>
        <p className={s.moTaNgan}>
          <DinhDang text={gioiThieuDuAn} />
        </p>
      </header>
      <LuoiBai />
    </article>
  );
}
