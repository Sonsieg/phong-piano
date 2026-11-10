import { existsSync } from 'node:fs';
import path from 'node:path';
// Các khối hiển thị dùng chung cho trang Dự án, 6 trang bài tập và trang Tổng kết.
import Link from 'next/link';
import { Fragment, type CSSProperties } from 'react';
import { baiTap, thongTin, type Khoi, type TepSanPham } from '../content/portfolio';
import TinhHuongAI from './TinhHuongAI';
import s from './portfolio.module.css';

/** Chữ có **đậm**, `mã`; chỗ [ĐIỀN: …] chưa thay được tô nền vàng để dễ thấy. */
export function DinhDang({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[ĐIỀN[^\]]*\])/g).map((p, i) => {
        if (p.length > 4 && p.startsWith('**') && p.endsWith('**'))
          return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.length > 2 && p.startsWith('`') && p.endsWith('`'))
          return (
            <code key={i} className={s.ma}>
              {p.slice(1, -1)}
            </code>
          );
        if (p.startsWith('[ĐIỀN'))
          return (
            <mark key={i} className={s.choDien}>
              {`Cần bổ sung: ${p.replace(/^\[ĐIỀN:\s*/, '').replace(/\]$/, '')}`}
            </mark>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

/** Bảng cuộn ngang được trên điện thoại; tên bảng đặt phía trên như quy ước trình bày. */
export function Bang({
  cot,
  dong,
  chuThich,
}: {
  cot: string[];
  dong: string[][];
  chuThich?: string;
}) {
  return (
    <figure className={s.hinh}>
      {chuThich && <figcaption className={s.chuThichBang}>{chuThich}</figcaption>}
      <div
        className={s.bangCuon}
        role="region"
        aria-label={chuThich ?? `Bảng ${cot.join(', ')}`}
        tabIndex={0}
      >
        <table
          className={cot.length > 3 ? `${s.bang} ${s.bangRong}` : s.bang}
          style={{ '--pf-columns': cot.length } as CSSProperties}
        >
          <thead>
            <tr>
              {cot.map((c, i) => (
                <th key={i} scope="col">
                  <DinhDang text={c} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dong.map((d, i) => (
              <tr key={i}>
                {d.map((o, j) => (
                  <td key={j}>
                    <DinhDang text={o} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function KhoiNoiDung({ khoi }: { khoi: Khoi }) {
  switch (khoi.kieu) {
    case 'doan':
      return (
        <p>
          <DinhDang text={khoi.noiDung} />
        </p>
      );
    case 'tieuDe':
      return <h3>{khoi.noiDung}</h3>;
    case 'danhSach': {
      const DanhSach = khoi.danhSo ? 'ol' : 'ul';
      return (
        <DanhSach>
          {khoi.muc.map((m, i) => (
            <li key={i}>
              <DinhDang text={m} />
            </li>
          ))}
        </DanhSach>
      );
    }
    case 'bang':
      return <Bang cot={khoi.cot} dong={khoi.dong} chuThich={khoi.chuThich} />;
    case 'ma':
      return (
        <figure className={s.hinh}>
          <pre className={s.khoiMa}>{khoi.noiDung}</pre>
          {khoi.chuThich && <figcaption className={s.chuThich}>{khoi.chuThich}</figcaption>}
        </figure>
      );
    case 'trichDan':
      return (
        <figure className={s.hinh}>
          <blockquote className={s.trichDan}>
            <DinhDang text={khoi.noiDung} />
          </blockquote>
          {khoi.chuThich && <figcaption className={s.chuThich}>{khoi.chuThich}</figcaption>}
        </figure>
      );
    case 'soSanh':
      return (
        <div className={s.soSanh}>
          {khoi.cot.map((c, i) => (
            <div key={i} className={s.cotSoSanh}>
              <p className={s.nhanSoSanh}>{c.nhan}</p>
              <pre className={s.khoiPrompt}>{c.prompt}</pre>
              <p className={s.ketQua}>
                <strong>Kết quả: </strong>
                <DinhDang text={c.ketQua} />
              </p>
            </div>
          ))}
        </div>
      );
    case 'luoiThe':
      return (
        <div className={s.luoiThe}>
          {khoi.the.map((t, i) => (
            <div key={i} className={t.mau ? `${s.the} ${s[t.mau]}` : s.the}>
              {t.nhan && <span className={s.nhanThe}>{t.nhan}</span>}
              <h4>{t.tieuDe}</h4>
              <p>
                <DinhDang text={t.noiDung} />
              </p>
            </div>
          ))}
        </div>
      );
    case 'tinhHuong':
      return <TinhHuongAI cau={khoi.cau} />;
  }
}

/** Link chia sẻ Google Drive / YouTube → link nhúng được vào iframe; link khác giữ nguyên. */
export function linkNhung(url: string): string {
  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  return url;
}

export function TepNhung({ tep }: { tep: TepSanPham }) {
  // Link chưa điền: hiện khung chờ để không để lại liên kết hỏng.
  if (
    tep.url.startsWith('[') ||
    (tep.url.startsWith('/') && !existsSync(path.join(process.cwd(), 'public', tep.url)))
  ) {
    return (
      <div className={s.choTrong}>
        <strong>{tep.tieuDe}</strong>
        <br />
        <p>Chưa có tệp hoặc liên kết trong hồ sơ được cung cấp.</p>
      </div>
    );
  }
  const moTa = tep.moTa && (
    <p className={s.moTaTep}>
      <DinhDang text={tep.moTa} />
    </p>
  );
  if (tep.loai === 'anh') {
    return (
      <figure className={s.hinh}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ảnh tĩnh trong public/, không cần next/image */}
        <img className={s.anh} src={tep.url} alt={tep.tieuDe} loading="lazy" />
        <figcaption className={s.chuThich}>{tep.tieuDe}</figcaption>
        {moTa}
      </figure>
    );
  }
  if (tep.loai === 'lienKet') {
    return (
      <div>
        <a className={s.nutLienKet} href={tep.url} target="_blank" rel="noopener noreferrer">
          {tep.tieuDe} ↗
        </a>
        {moTa}
      </div>
    );
  }
  return (
    <figure className={s.hinh}>
      <div className={tep.loai === 'video' ? `${s.khungNhung} ${s.khungVideo}` : s.khungNhung}>
        <iframe
          src={linkNhung(tep.url)}
          title={tep.tieuDe}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      <figcaption className={s.chuThich}>
        {tep.tieuDe} ·{' '}
        <a href={tep.url} target="_blank" rel="noopener noreferrer">
          Mở trong tab mới ↗
        </a>
      </figcaption>
      {moTa}
    </figure>
  );
}

/** Danh mục 6 bài tập có liên kết — dùng ở trang Dự án và trang Tổng kết. */
export function LuoiBai() {
  return (
    <ol className={s.luoiBai}>
      {baiTap.map((b) => (
        <li key={b.slug}>
          <Link href={`/projects/${b.slug}`} className={s.theBai}>
            <span className={s.soBai}>Bài {b.so}</span>
            <span className={s.nhanPhu}>{b.chuong}</span>
            <strong className={s.tenBai}>{b.ten}</strong>
            <span>{b.tomTat}</span>
            <span className={s.xemTiep}>Xem chi tiết</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Chân trang theo yêu cầu đề (mục IV.2): họ tên, mã SV, lớp, tên học phần. Đặt trong app/layout.tsx. */
export function ChanTrang() {
  return (
    <footer className={s.chanTrang}>
      <p>
        <strong>
          <DinhDang text={thongTin.hoTen} />
        </strong>{' '}
        · Mã SV: <DinhDang text={thongTin.maSV} /> · Lớp: <DinhDang text={thongTin.lop} />
      </p>
      <p>Học phần: {thongTin.hocPhan}</p>
      <p>{thongTin.truong}</p>
    </footer>
  );
}
