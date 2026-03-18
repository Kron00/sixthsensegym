
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const barFillRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Logo fade in and scale up
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      0
    );

    // Tagline letters appear one by one
    const letters = taglineRef.current?.querySelectorAll('.loader-letter');
    if (letters?.length) {
      tl.fromTo(
        letters,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.03, stagger: 0.02, ease: 'power2.out' },
        0.3
      );
    }

    // Progress bar fill
    tl.to(
      barFillRef.current,
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
      0.2
    );

    // Counter from 0 to 100
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(counter.value)}%`;
          }
        },
      },
      0.2
    );

    // Exit: fade up logo, tagline, bar, counter
    tl.to(
      [logoRef.current, taglineRef.current, barFillRef.current?.parentElement, counterRef.current],
      { opacity: 0, y: -20, duration: 0.3, ease: 'power3.in', stagger: 0.03 },
      1.5
    );

    // Clip container away
    tl.to(
      containerRef.current,
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power4.inOut',
      },
      1.7
    );

    return () => tl.kill();
  }, [onComplete]);

  const tagline = 'STILL WATERS RUN DEEP';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #080808 70%)',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      {/* Logo */}
      <img
        ref={logoRef}
        src="https://sixthsensegym.com/wp-content/uploads/2021/04/sixth_sense_header-light.png"
        alt="Sixth Sense Gym"
        className="h-12 md:h-16 w-auto opacity-0"
      />

      {/* Tagline - letter by letter */}
      <p
        ref={taglineRef}
        className="mt-6 text-[var(--gold)] text-[10px] md:text-xs tracking-[0.4em] uppercase font-[family-name:var(--font-body)]"
        aria-label={tagline}
      >
        {tagline.split('').map((char, i) => (
          <span key={i} className="loader-letter inline-block opacity-0">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </p>

      {/* Progress bar */}
      <div className="mt-10 w-48 md:w-64 h-[2px] bg-white/10 overflow-hidden">
        <div
          ref={barFillRef}
          className="h-full w-full bg-[var(--gold)] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Counter */}
      <p
        ref={counterRef}
        className="mt-3 text-[var(--gold)] text-lg font-[family-name:var(--font-display)] tracking-[0.1em]"
      >
        0%
      </p>
    </div>
  );
}
