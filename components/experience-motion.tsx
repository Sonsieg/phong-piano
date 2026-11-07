'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function ExperienceMotion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current)
          progress.current.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    let active = true;
    let observer: IntersectionObserver | undefined;
    const animations: { stop: () => void; complete: () => void }[] = [];
    void import('motion').then(({ animate }) => {
      if (!active) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer?.unobserve(entry.target);
            if (reduced.matches) return;
            animations.push(
              animate(
                entry.target as HTMLElement,
                { opacity: [0.4, 1], y: [18, 0] },
                { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              ),
            );
          });
        },
        { threshold: 0.12 },
      );
      document
        .querySelectorAll(
          '#main section > h2, .project-slide, .goal-row, .portrait-stage, .page-intro h1',
        )
        .forEach((element) => observer?.observe(element));
    });
    const stop = () => {
      if (reduced.matches) animations.forEach((animation) => animation.complete());
    };
    reduced.addEventListener('change', stop);
    return () => {
      active = false;
      observer?.disconnect();
      animations.forEach((animation) => animation.stop());
      reduced.removeEventListener('change', stop);
    };
  }, [pathname]);
  return <div ref={progress} className="scroll-progress" aria-hidden="true" />;
}
