
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const headlineLines = [
  { text: "YOU DON'T NEED", gold: false },
  { text: 'ANOTHER GYM.', gold: false },
  { text: 'YOU NEED THIS ONE.', gold: true },
];

export default function Mission() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const linesRef = useRef([]);
  const bodyRef = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade up
      gsap.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Headline lines reveal
      linesRef.current.forEach((line, i) => {
        gsap.fromTo(
          line,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      });

      // Body paragraph fade up
      gsap.fromTo(
        bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Parallax decorative dots
      gsap.to(dot1Ref.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(dot2Ref.current, {
        y: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative bg-[var(--cream)] py-20 md:py-44 px-6 overflow-hidden"
    >
      {/* Decorative gold dot — top right */}
      <div
        ref={dot1Ref}
        className="absolute top-20 right-12 w-2 h-2 rounded-full bg-[var(--gold)]/20"
      />
      {/* Decorative gold dot — bottom left */}
      <div
        ref={dot2Ref}
        className="absolute bottom-20 left-12 w-2 h-2 rounded-full bg-[var(--gold)]/20"
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <p
          ref={labelRef}
          className="font-[family-name:var(--font-body)] text-xs tracking-[0.3em] uppercase text-[var(--gold-dark)] mb-8 opacity-0"
        >
          Our Philosophy
        </p>

        {/* Headline */}
        <h2 className="mb-10">
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                ref={(el) => (linesRef.current[i] = el)}
                className={`block font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] tracking-[0.02em] uppercase ${
                  line.gold ? 'text-[var(--gold)]' : 'text-[var(--black)]'
                }`}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="font-[family-name:var(--font-body)] text-[var(--black)]/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed opacity-0"
        >
          Sixth Sense isn&apos;t a franchise. It&apos;s not a big-box gym with rows of
          treadmills and a smoothie bar. It&apos;s a private, family-owned facility in
          Ontario, CA &mdash; built for people who take training seriously. World-class
          iron, 24/7 key fob access, infrared sauna, and zero distractions.
        </p>
      </div>
    </section>
  );
}
