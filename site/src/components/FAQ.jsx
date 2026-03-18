
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'How do I sign up?',
    a: 'Text or call us at (909) 260-8960 to schedule a walkthrough. We\u2019ll get you set up with a membership and your personal key fob the same day.',
  },
  {
    q: 'Is this a 24/7 gym?',
    a: 'Yes. Once you\u2019re a member, your key fob gives you access 24 hours a day, 7 days a week, 365 days a year. Staff hours are by appointment.',
  },
  {
    q: 'What equipment do you have?',
    a: 'Panatta plate-loaded and pin-selected machines, Arsenal Strength equipment, Ghost Combo Racks with calibrated kilos, Rogue barbells, Kabuki specialty bars, Keiser hydraulic machines, 5\u2013150lb dumbbells, kettlebells, slam balls, and full cardio.',
  },
  {
    q: 'Can I try before I commit?',
    a: 'Absolutely. We offer a $25 day pass \u2014 text (909) 260-8960 to purchase. Come see the facility, try the equipment, and feel the difference.',
  },
  {
    q: 'What\u2019s the infrared sauna?',
    a: 'Our infrared sauna uses light to create heat, penetrating deeper than traditional saunas. Great for recovery, circulation, and detox. It\u2019s included with every membership.',
  },
  {
    q: 'Is there a contract cancellation fee?',
    a: 'Package A (Committed) requires a 12-month commitment with no enrollment fee. Package B (Flexible) is month-to-month with a $99.99 enrollment fee and can be cancelled anytime \u2014 no penalty.',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      itemRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 90%',
        },
        delay: index * 0.08,
      }
    );
  }, [index]);

  const toggle = useCallback(() => {
    const panel = answerRef.current;
    if (!panel) return;

    if (!open) {
      gsap.set(panel, { height: 'auto' });
      const fullHeight = panel.scrollHeight;
      gsap.fromTo(
        panel,
        { height: 0 },
        { height: fullHeight, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(panel, {
        height: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      });
    }

    setOpen((prev) => !prev);
  }, [open]);

  return (
    <div
      ref={itemRef}
      className="border-b border-[var(--black)]/[0.06]"
      style={{ opacity: 0 }}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <span
          className={`font-[family-name:var(--font-body)] text-sm md:text-base font-semibold transition-colors duration-300 ${
            open ? 'text-[var(--gold-dark)]' : 'text-[var(--black)] group-hover:text-[var(--gold-dark)]'
          }`}
        >
          {faq.q}
        </span>
        <span
          className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${
            open
              ? 'rotate-45 border-[var(--gold)] bg-[var(--gold)]/10'
              : 'border-[var(--black)]/10'
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-300 ${
              open ? 'text-[var(--gold)]' : 'text-[var(--black)]/40'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden" style={{ height: 0 }}>
        <div className="pb-5 max-w-2xl">
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--black)]/40 leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: '100%' },
        {
          y: '0%',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-[var(--cream)] py-24 md:py-36 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <span className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-[var(--gold-dark)]">
            Questions
          </span>
          <div className="overflow-hidden mt-3">
            <h2
              ref={titleRef}
              className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] tracking-[0.02em] text-[var(--black)] leading-none"
              style={{ transform: 'translateY(100%)' }}
            >
              FAQ
            </h2>
          </div>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
