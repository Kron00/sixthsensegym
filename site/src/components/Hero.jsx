
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = 'WHERE IRON MEETS INSTINCT';

function scrollToSection(href) {
  const el = document.querySelector(href);
  if (el) {
    window.__lenis?.scrollTo(el, { offset: -80 });
  }
}

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const taglineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image entrance
      gsap.fromTo(
        bgRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 2.2 }
      );

      // Background parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 25,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content timeline
      const tl = gsap.timeline({ delay: 2.2 });

      // Label fade up
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.3
      );

      // Headline characters
      const chars = headlineRef.current?.querySelectorAll('.char');
      if (chars?.length) {
        tl.fromTo(
          chars,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.025, ease: 'power3.out' },
          0.5
        );
      }

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        1.2
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        1.4
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        1.6
      );

      // 24/7 Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8, rotate: -10 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' },
        1.8
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        2.0
      );

      // Scroll indicator pulse animation
      gsap.to('.hero-scroll-pulse', {
        scaleY: 1,
        opacity: 0.3,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split headline into words, then characters
  const headlineWords = HEADLINE.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[600px] bg-[var(--black)] overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          ref={bgRef}
          src="https://sixthsensegym.com/wp-content/uploads/2023/09/WEBSITE-PICS-scaled.jpg"
          alt="Sixth Sense Gym interior"
          className="w-full h-full object-cover opacity-0"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end max-w-7xl mx-auto px-5 md:px-8 pb-10 md:pb-28">
        {/* Location label */}
        <p
          ref={labelRef}
          className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-4 opacity-0"
        >
          ONTARIO, CA &mdash; EST. 2021
        </p>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="font-[family-name:var(--font-display)] text-[var(--white)] text-[clamp(2rem,8vw,10rem)] leading-[0.85] tracking-[0.02em]"
        >
          {headlineWords.map((word, wi) => (
            <span key={wi} className="inline-block mr-[0.25em]">
              {word.split('').map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="char inline-block opacity-0"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-5 text-white/40 text-sm tracking-[0.35em] uppercase font-[family-name:var(--font-body)] opacity-0"
        >
          STILL WATERS RUN DEEP
        </p>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-4 text-white/50 text-base md:text-lg max-w-xs md:max-w-md font-[family-name:var(--font-body)] leading-relaxed opacity-0"
        >
          Ontario CA&rsquo;s premier 24/7 private membership gym. Family-owned.
          Built for serious athletes.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 opacity-0">
          <a
            href="#membership"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#membership');
            }}
            className="group inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--black)] rounded-full px-7 py-3.5 text-sm tracking-[0.15em] uppercase font-[family-name:var(--font-body)] hover:bg-[var(--gold-light)] transition-colors duration-300"
          >
            Start Training
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#mission"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#mission');
            }}
            className="inline-flex items-center gap-2 border border-white/20 text-white rounded-full px-7 py-3.5 text-sm tracking-[0.15em] uppercase font-[family-name:var(--font-body)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* 24/7 Access badge */}
      <div
        ref={badgeRef}
        className="absolute right-6 md:right-12 bottom-32 md:bottom-40 opacity-0 hidden md:flex"
      >
        <div className="w-24 h-24 rounded-full border border-[var(--gold)] flex flex-col items-center justify-center">
          <span className="font-[family-name:var(--font-display)] text-[var(--gold)] text-2xl tracking-[0.05em] leading-none">
            24/7
          </span>
          <span className="text-[var(--gold)] text-[9px] tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mt-0.5">
            ACCESS
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-0"
      >
        <span className="text-white/40 text-[9px] tracking-[0.35em] uppercase font-[family-name:var(--font-body)]">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-white/10 relative overflow-hidden">
          <div className="hero-scroll-pulse absolute inset-x-0 top-0 h-full bg-[var(--gold)] origin-top scale-y-0" />
        </div>
      </div>
    </section>
  );
}
