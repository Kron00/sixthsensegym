
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { y: '100%' },
        {
          y: '0%',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Subtitle fade up
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 90%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-52 px-6 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://sixthsensegym.com/wp-content/uploads/2022/01/mainfloor-pic-1-scaled.jpg"
          alt="Sixth Sense Gym main floor"
          className="w-full h-[120%] object-cover will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[var(--black)]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-[var(--gold)]">
          Take the First Step
        </span>

        <div className="overflow-hidden mt-4 mb-6">
          <h2
            ref={titleRef}
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,6rem)] tracking-[0.02em] text-white leading-none"
            style={{ transform: 'translateY(100%)' }}
          >
            READY TO{' '}
            <span className="text-[var(--gold)]">TRAIN?</span>
          </h2>
        </div>

        <p
          ref={subtitleRef}
          className="font-[family-name:var(--font-body)] text-base md:text-lg text-white/40 max-w-lg mx-auto mb-6 md:mb-10"
        >
          Text or call to schedule your walkthrough. Same-day sign up available.
          Your key fob is waiting.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.a
            href="tel:+19092608960"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--black)] font-[family-name:var(--font-body)] text-sm font-semibold tracking-wider uppercase rounded-full px-8 py-4 transition-colors hover:bg-[var(--gold-light)]"
          >
            Call Now
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          <motion.a
            href="sms:+19092608960"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 border border-white/20 text-white font-[family-name:var(--font-body)] text-sm font-semibold tracking-wider uppercase rounded-full px-8 py-4 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            Text Us
          </motion.a>
        </div>

        <p className="font-[family-name:var(--font-body)] text-xs text-white/20">
          (909) 260-8960 &bull; 790 Ferrari Lane, Ontario, CA 91764
        </p>
      </div>
    </section>
  );
}
