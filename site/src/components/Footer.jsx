
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'About', target: '#about' },
  { label: 'Equipment', target: '#equipment' },
  { label: 'Membership', target: '#membership' },
  { label: 'Reviews', target: '#reviews' },
  { label: 'FAQ', target: '#faq' },
];

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 90%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="bg-[var(--black)] pt-20 pb-8 px-6 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

      {/* Subtle gold glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)] opacity-[0.04] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      {/* Decorative diagonal lines */}
      <div className="hidden md:block absolute top-32 right-24 w-[200px] h-[1px] bg-[var(--gold)]/20 rotate-[35deg] pointer-events-none" />
      <div className="hidden md:block absolute top-44 right-32 w-[120px] h-[1px] bg-[var(--gold)]/20 rotate-[35deg] pointer-events-none" />

      <div ref={contentRef} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16 mb-16 relative z-10">
        {/* Col 1 — Brand */}
        <div>
          <img
            src="https://sixthsensegym.com/wp-content/uploads/2021/04/sixth_sense_header-light.png"
            alt="Sixth Sense Gym"
            className="h-10 mb-6"
          />
          <p className="font-[family-name:var(--font-body)] text-sm text-white/30 leading-relaxed mb-6">
            Ontario CA&apos;s premier private membership gym. Family-owned,
            athlete-approved. Where iron meets instinct.
          </p>
          <div className="flex gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/6thsensegym/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/SixthSenseGym/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h3 className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.target}
                  onClick={(e) => handleNavClick(e, link.target)}
                  className="font-[family-name:var(--font-body)] text-sm text-white/30 hover:text-[var(--gold)] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h3 className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
            Contact
          </h3>
          <div className="space-y-4">
            <div>
              <span className="font-[family-name:var(--font-body)] text-xs text-white/50 block mb-1">
                Address
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm text-white/30">
                790 Ferrari Lane, Ontario, CA 91764
              </span>
            </div>
            <div>
              <span className="font-[family-name:var(--font-body)] text-xs text-white/50 block mb-1">
                Phone
              </span>
              <a
                href="tel:+19092608960"
                className="font-[family-name:var(--font-body)] text-sm text-white/30 hover:text-[var(--gold)] transition-colors"
              >
                (909) 260-8960
              </a>
            </div>
            <div>
              <span className="font-[family-name:var(--font-body)] text-xs text-white/50 block mb-1">
                Email
              </span>
              <a
                href="mailto:6thhsense@gmail.com"
                className="font-[family-name:var(--font-body)] text-sm text-white/30 hover:text-[var(--gold)] transition-colors"
              >
                6thhsense@gmail.com
              </a>
            </div>
            <div>
              <span className="font-[family-name:var(--font-body)] text-xs text-white/50 block mb-1">
                Hours
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm text-white/30">
                24/7 member key fob access / Staff by appointment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-[family-name:var(--font-body)] text-xs text-white/20">
          &copy; {new Date().getFullYear()} Sixth Sense Gym. All rights reserved.
        </span>
        <a
          href="https://optyxai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-xs text-white/10 hover:text-[var(--gold)] transition-colors"
        >
          Designed by OptyxAI
        </a>
      </div>

      {/* Large decorative text */}
      <div className="mt-8 pointer-events-none select-none">
        <p className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,8rem)] text-white/[0.015] text-center tracking-[0.1em] leading-none">
          STILL WATERS RUN DEEP
        </p>
      </div>
    </footer>
  );
}
