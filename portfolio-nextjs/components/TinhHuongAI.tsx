'use client';

// Thử thách tương tác ở Bài 6: chọn màu đèn cho từng tình huống, xem ngay giải thích theo bộ nguyên tắc 5T.
import { useState } from 'react';
import type { MauDen } from '../content/portfolio';
import s from './portfolio.module.css';

const CAC_MAU: MauDen[] = ['xanh', 'vang', 'do'];
const TEN_MAU: Record<MauDen, string> = { xanh: 'Xanh', vang: 'Vàng', do: 'Đỏ' };

type Cau = { tinhHuong: string; dapAn: MauDen; giaiThich: string };

export default function TinhHuongAI({ cau }: { cau: Cau[] }) {
  const [chon, setChon] = useState<(MauDen | null)[]>(() => cau.map(() => null));
  const soDaChon = chon.filter((c) => c !== null).length;
  const soDung = chon.filter((c, i) => c === cau[i].dapAn).length;

  return (
    <div className={s.tinhHuong}>
      <ol>
        {cau.map((c, i) => (
          <li key={i} className={s.cauHoi}>
            <p>{c.tinhHuong}</p>
            <div
              className={s.nhomNut}
              role="group"
              aria-label={`Chọn màu đèn cho tình huống ${i + 1}`}
            >
              {CAC_MAU.map((mau) => (
                <button
                  key={mau}
                  type="button"
                  className={s.nutDen}
                  data-mau={mau}
                  aria-pressed={chon[i] === mau}
                  onClick={() => setChon((cu) => cu.map((v, j) => (j === i ? mau : v)))}
                >
                  {TEN_MAU[mau]}
                </button>
              ))}
            </div>
            <div aria-live="polite">
              {chon[i] && (
                <p className={s.phanHoi}>
                  {chon[i] === c.dapAn
                    ? '✔ Chính xác. '
                    : `✘ Chưa đúng, đáp án là đèn ${TEN_MAU[c.dapAn]}. `}
                  {c.giaiThich}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className={s.diemSo} aria-live="polite">
        Bạn đúng {soDung}/{cau.length} tình huống
        {soDaChon < cau.length ? `, còn ${cau.length - soDaChon} tình huống chưa chọn` : ''}.
      </p>
    </div>
  );
}
