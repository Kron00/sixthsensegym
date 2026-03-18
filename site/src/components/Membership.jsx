
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'DAY PASS',
    price: '25',
    period: '/single visit',
    highlight: false,
    features: [
      'Full gym access',
      'All equipment',
      'Infrared sauna',
      'Posing room',
    ],
    cta: 'Text to Purchase',
    href: 'sms:+19092608960',
  },
  {
    name: 'COMMITTED',
    badge: 'Package A',
    price: '79.99',
    period: '/month',
    highlight: true,
    features: [
      '12-month commitment',
      '$0 enrollment fee',
      '24/7 key fob',
      'All equipment',
      'Infrared sauna',
      'Posing room & showers',
      'First + last due at signup',
    ],
    cta: 'Get Started',
    href: 'sms:+19092608960',
  },
  {
    name: 'FLEXIBLE',
    badge: 'Package B',
    price: '89.99',
    period: '/month',
    highlight: false,
    features: [
      'Month-to-month',
      '$99.99 enrollment fee',
      '24/7 key fob',
      'All equipment',
      'Infrared sauna',
      'Posing room & showers',
      'Cancel anytime',
    ],
    cta: 'Get Started',
    href: 'sms:+19092608960',
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}

function PlanCard({ plan }) {
  const inner = (
    <div
      className={`relative rounded-2xl h-full flex flex-col ${
        plan.highlight
          ? 'bg-[var(--dark)] p-5 md:p-10'
          : 'bg-white/[0.03] border border-white/[0.06] p-5 md:p-10'
      }`}
    >
      {/* Most Popular badge */}
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--black)] font-[family-name:var(--font-body)] text-[10px] tracking-[0.25em] uppercase px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}

      {/* Badge */}
      {plan.badge && (
        <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.25em] uppercase text-[var(--gold)]/60 mb-4">
          {plan.badge}
        </p>
      )}

      {/* Plan name */}
      <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.05em] text-white">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1 mt-4 mb-6">
        <span className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-white">
          ${plan.price}
        </span>
        <span className="font-[family-name:var(--font-body)] text-sm text-white/40">
          {plan.period}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckIcon />
            <span className="font-[family-name:var(--font-body)] text-sm text-white/50">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={plan.href}
        className={`block text-center font-[family-name:var(--font-body)] text-sm tracking-[0.1em] uppercase py-4 rounded-lg transition-all duration-300 ${
          plan.highlight
            ? 'bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)]'
            : 'border border-white/20 text-white hover:border-[var(--gold)] hover:text-[var(--gold)]'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );

  if (plan.highlight) {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="p-[1px] rounded-2xl animate-gradient-border"
        style={{
          background:
            'linear-gradient(135deg, var(--gold), var(--gold-dark), var(--gold), var(--gold-dark))',
          backgroundSize: '300% 300%',
        }}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {inner}
    </motion.div>
  );
}

export default function Membership() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header label fade
      gsap.fromTo(
        headerRef.current.querySelector('[data-label]'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Header title reveal
      gsap.fromTo(
        headerRef.current.querySelector('[data-title]'),
        { y: '100%' },
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        cardsRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--black)] py-12 md:py-36 px-6"
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

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16 lg:mb-20">
          <p
            data-label
            className="font-[family-name:var(--font-body)] text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4 opacity-0"
          >
            Membership Plans
          </p>
          <div className="overflow-hidden">
            <h2
              data-title
              className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,7vw,5.5rem)] tracking-[0.02em] text-white leading-[1.1]"
            >
              CHOOSE YOUR PATH
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-4 md:gap-8 items-stretch"
        >
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Footer */}
        <p className="font-[family-name:var(--font-body)] text-xs text-white/30 text-center mt-12">
          To sign up, text or call{' '}
          <a
            href="tel:+19092608960"
            className="underline underline-offset-2 hover:text-white/50 transition-colors"
          >
            (909) 260-8960
          </a>
          .
        </p>
      </div>
    </section>
  );
}
