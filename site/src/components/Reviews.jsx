
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Marcus T.',
    stars: 5,
    text: 'Best gym in the Inland Empire, hands down. The Panatta machines are on another level. Once you train here, you can\u2019t go back to a chain gym.',
  },
  {
    name: 'Jessica R.',
    stars: 5,
    text: 'I love the 24/7 access. I work nights and this is the only gym where I can get a serious workout at 3 AM. The infrared sauna is a game-changer for recovery.',
  },
  {
    name: 'Derek W.',
    stars: 5,
    text: 'Mario and Erika built something special. It\u2019s private, it\u2019s clean, and the equipment is world-class. The Ghost racks with calibrated kilos are legit.',
  },
  {
    name: 'Sarah M.',
    stars: 4,
    text: 'Switched from LA Fitness and never looked back. Worth every penny. The atmosphere is focused \u2014 everyone here is actually training, not taking selfies.',
  },
  {
    name: 'Anthony L.',
    stars: 5,
    text: 'As a powerlifter, finding Kabuki bars and calibrated plates outside a competition gym is rare. Sixth Sense has everything I need. The owners are great people too.',
  },
  {
    name: 'Christina V.',
    stars: 4,
    text: 'The posing room is perfect for my bikini prep. Clean showers, infrared sauna for water cuts, and nobody bothering you. This is a serious athlete\u2019s gym.',
  },
];

const doubled = [...reviews, ...reviews];

function Star({ filled }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ${filled ? 'text-[var(--gold)]' : 'text-[var(--black)]/10'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="w-[300px] md:w-[400px] mx-2 p-5 md:p-8 rounded-xl bg-white border border-[var(--black)]/[0.04] flex-shrink-0">
      <div className="h-[2px] w-12 bg-[var(--gold)]/40 mb-4" />
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={i <= review.stars} />
        ))}
      </div>
      <p className="font-[family-name:var(--font-body)] text-sm text-[var(--black)]/60 leading-relaxed mb-6">
        &ldquo;{review.text}&rdquo;
      </p>
      <span className="font-[family-name:var(--font-body)] text-xs tracking-[0.15em] uppercase text-[var(--black)]/30 font-semibold">
        {review.name}
      </span>
    </div>
  );
}

export default function Reviews() {
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
      id="reviews"
      className="bg-[var(--cream)] py-24 md:py-36 overflow-hidden"
    >
      <div className="px-6 max-w-6xl mx-auto mb-16">
        <span className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-[var(--gold-dark)]">
          Testimonials
        </span>
        <div className="overflow-hidden mt-3">
          <h2
            ref={titleRef}
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] tracking-[0.02em] text-[var(--black)] leading-none"
            style={{ transform: 'translateY(100%)' }}
          >
            WHAT MEMBERS SAY
          </h2>
        </div>
      </div>

      <div className="w-max animate-marquee" style={{ animationDuration: '45s' }}>
        <div className="flex">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
