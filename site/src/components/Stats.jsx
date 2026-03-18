
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 24, suffix: 'HR', label: 'Key Fob Access' },
  { value: 365, suffix: '', label: 'Days Open Per Year' },
  { value: 150, suffix: 'LB', label: 'Dumbbell Range' },
  { value: 4.3, suffix: '\u2605', label: 'Yelp Rating', decimals: 1 },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const statRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statRefs.current.forEach((el, i) => {
        if (!el) return;

        const numEl = el.querySelector('[data-stat-num]');
        const target = parseFloat(numEl.dataset.target);
        const decimals = parseInt(numEl.dataset.decimals || '0', 10);
        const counter = { val: 0 };

        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            numEl.textContent = decimals > 0
              ? counter.val.toFixed(decimals)
              : Math.round(counter.val);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--black)] py-24 md:py-32 px-6"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative 6TH */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-[family-name:var(--font-display)] text-[20rem] text-white/[0.015] leading-none">
        6TH
      </div>

      <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => (statRefs.current[i] = el)}
            className="relative text-center opacity-0"
          >
            {/* Separator line between stats on desktop */}
            {i < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-white/[0.06] translate-x-[calc(50%+1.5rem)]" />
            )}

            <div className="flex items-baseline justify-center gap-1">
              <span
                data-stat-num
                data-target={stat.value}
                data-decimals={stat.decimals || 0}
                className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-white"
              >
                0
              </span>
              {stat.suffix && (
                <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--gold)]">
                  {stat.suffix}
                </span>
              )}
            </div>

            <p className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-white/40 mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
