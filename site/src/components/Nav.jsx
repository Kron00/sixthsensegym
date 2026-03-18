
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', href: '#mission' },
  { label: 'Equipment', href: '#features' },
  { label: 'Membership', href: '#membership' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#footer' },
];

function scrollToSection(href) {
  const el = document.querySelector(href);
  if (el) {
    window.__lenis?.scrollTo(el, { offset: -80 });
  }
}

export default function Nav() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Scroll listener for background + progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(window.scrollY / docHeight, 1));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.__lenis?.scrollTo(0);
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 opacity-0 ${
          scrolled
            ? 'bg-[var(--black)]/90 backdrop-blur-md shadow-lg shadow-black/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={handleLogoClick} className="shrink-0">
            <img
              src="https://sixthsensegym.com/wp-content/uploads/2021/04/sixth_sense_header-light.png"
              alt="Sixth Sense Gym"
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-7 md:h-8' : 'h-8 md:h-10'
              }`}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-[var(--gold)] transition-colors duration-300 font-[family-name:var(--font-body)] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Join Now pill */}
            <a
              href="#membership"
              onClick={(e) => handleLinkClick(e, '#membership')}
              className="ml-2 text-[11px] uppercase tracking-[0.2em] font-[family-name:var(--font-body)] px-5 py-2 rounded-full border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)] transition-all duration-300"
            >
              Join Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[6px] z-[110]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[7.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
              }`}
            />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--gold)]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99] bg-[var(--black)] flex flex-col items-center justify-center gap-6"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setTimeout(() => scrollToSection(link.href), 500);
                }}
                className="text-[clamp(2rem,8vw,3.5rem)] font-[family-name:var(--font-display)] text-[var(--cream)] tracking-[0.05em] hover:text-[var(--gold)] transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#membership"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.4 }}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => scrollToSection('#membership'), 500);
              }}
              className="mt-4 text-sm uppercase tracking-[0.2em] font-[family-name:var(--font-body)] px-7 py-3 rounded-full border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)] transition-all duration-300"
            >
              Join Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
