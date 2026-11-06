'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { assignments } from '@/src/data/assignments';
import { student } from '@/src/config/student';
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const run = () => setScrolled(window.scrollY > 40);
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const main = document.getElementById('main');
    const footer = document.querySelector('footer');
    document.body.style.overflow = 'hidden';
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    document.querySelector<HTMLAnchorElement>('#mobile-nav a')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
      if (e.key === 'Tab') {
        const items = Array.from(
          document.querySelectorAll<HTMLElement>('.header a, .header button'),
        ).filter((el) => el.offsetParent !== null);
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const desktop = matchMedia('(min-width: 761px)');
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', onResize);
    window.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = prev;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      window.removeEventListener('keydown', key);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);
  return (
    <header
      className={`header ${scrolled || path !== '/' ? 'solid' : ''} ${open ? 'menu-is-open' : ''}`}
    >
      <Link
        className="wordmark"
        href="/"
        onClick={() => setOpen(false)}
        aria-label="Piano Prelude — Trang chủ"
      >
        <span className="brand-keys" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>
          PIANO <b>/</b> PRELUDE<small>ĐINH QUANG PHONG · PORTFOLIO</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Điều hướng chính">
        <Link href="/#about">Giới thiệu</Link>
        <Link href="/projects" aria-current={path.startsWith('/projects') ? 'page' : undefined}>
          Dự án <sup>06</sup>
        </Link>
        <details>
          <summary>
            Các chương <span>⌄</span>
          </summary>
          <div className="chapter-menu">
            {assignments.map((a) => (
              <Link
                href={`/projects/${a.slug}`}
                key={a.id}
                onClick={(e) => {
                  const menu = e.currentTarget.closest('details');
                  if (menu) menu.open = false;
                }}
              >
                {a.chapter} <span>{a.title}</span>
              </Link>
            ))}
          </div>
        </details>
        <Link href="/conclusion" aria-current={path === '/conclusion' ? 'page' : undefined}>
          Tổng kết
        </Link>
      </nav>
      <a className="header-contact" href={`mailto:${student.email}`}>
        Cùng kết nối <span>↗</span>
      </a>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Đóng ×' : 'Menu ☰'}
      </button>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Điều hướng điện thoại">
          <Link onClick={() => setOpen(false)} href="/#about">
            Giới thiệu ↗
          </Link>
          <Link onClick={() => setOpen(false)} href="/projects">
            Sáu chương ↗
          </Link>
          {assignments.map((a) => (
            <Link
              className="mobile-chapter"
              onClick={() => setOpen(false)}
              key={a.id}
              href={`/projects/${a.slug}`}
            >
              {a.chapter} — {a.title}
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/conclusion">
            Tổng kết ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="eyebrow">MỖI HÀNH TRÌNH ĐỀU BẮT ĐẦU TỪ MỘT NỐT NHẠC.</p>
        <a href={`mailto:${student.email}`} className="footer-call">
          Cùng viết tiếp
          <br />
          chương mới. <span>↗</span>
        </a>
        <a className="email" href={`mailto:${student.email}`}>
          {student.email}
        </a>
      </div>
      <div className="footer-info">
        <div>
          <strong>{student.name}</strong>
          <p>
            MSSV {student.studentId} · Lớp {student.className}
          </p>
          <p>
            {student.major} · {student.university}
          </p>
        </div>
        <div>
          <p>{student.courseName}</p>
          <p>
            {student.courseCode} · GVHD: {student.supervisor}
          </p>
          <p>
            <Link href="/projects">Dự án</Link> / <Link href="/conclusion">Tổng kết</Link> /{' '}
            <Link href="/conclusion#sources">Nguồn & AI</Link>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>PIANO / PRELUDE — THE ART OF BECOMING</span>
        <a href="#main">Lên đầu trang ↑</a>
      </div>
    </footer>
  );
}
