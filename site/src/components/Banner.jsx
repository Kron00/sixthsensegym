
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on marquee rows
      gsap.to(row1Ref.current, {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(row2Ref.current, {
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(row3Ref.current, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Center overlay text reveals
      const lines = overlayRef.current.querySelectorAll('[data-reveal]');
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: '100%' },
          {
            y: '0%',
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: overlayRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Subtitle fade
      gsap.fromTo(
        overlayRef.current.querySelector('[data-subtitle]'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: overlayRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1Text =
    'THE FERRARI OF FITNESS \u2014 THE FERRARI OF FITNESS \u2014 THE FERRARI OF FITNESS \u2014 ';
  const row2Text =
    'PANATTA \u2022 ARSENAL \u2022 GHOST \u2022 ROGUE \u2022 KABUKI \u2022 KEISER \u2022 ';

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--black)] py-20 md:py-28"
    >
      {/* Row 1 - scrolls left */}
      <div ref={row1Ref} className="whitespace-nowrap animate-marquee">
        <span className="inline-block font-[family-name:var(--font-display)] text-[clamp(4rem,12vw,10rem)] text-white/[0.03] leading-none">
          {row1Text}
          {row1Text}
        </span>
      </div>

      {/* Row 2 - scrolls right */}
      <div ref={row2Ref} className="whitespace-nowrap animate-marquee-reverse mt-4">
        <span className="inline-block font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] text-[var(--gold)]/[0.08] leading-none">
          {row2Text}
          {row2Text}
        </span>
      </div>

      {/* Row 3 - scrolls left */}
      <div ref={row3Ref} className="whitespace-nowrap animate-marquee mt-4">
        <span className="inline-block font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] text-white/[0.02] leading-none">
          {row1Text}
          {row1Text}
        </span>
      </div>

      {/* Center overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-6"
      >
        <div className="overflow-hidden">
          <p
            data-reveal
            className="font-[family-name:var(--font-body)] text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4"
          >
            World-Class Equipment
          </p>
        </div>

        <div className="overflow-hidden">
          <h2
            data-reveal
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5.5rem)] tracking-[0.02em] text-white leading-[1.1]"
          >
            EQUIPPED FOR THE{' '}
            <span className="text-[var(--gold)]">SERIOUS</span>
          </h2>
        </div>

        <p
          data-subtitle
          className="font-[family-name:var(--font-body)] text-base md:text-lg text-white/40 max-w-xl mx-auto mt-6 opacity-0"
        >
          Panatta. Arsenal Strength. Ghost. Rogue. Kabuki. Keiser. If you know
          these names, you know this isn&apos;t ordinary.
        </p>
      </div>
    </section>
  );
}
