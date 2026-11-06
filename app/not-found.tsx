import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="page-intro section-pad">
      <p className="eyebrow">404 / MỘT NỐT LẶNG</p>
      <h1>
        Chương này
        <br />
        chưa tồn tại.
      </h1>
      <Link className="text-link" href="/projects">
        Trở về sáu chương <span>↗</span>
      </Link>
    </section>
  );
}
