import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: '01',
    label: 'Premium Machines',
    title: 'PANATTA',
    subtitle: 'The Ferrari of Fitness',
    body: 'Sixth Sense is home to the largest collection of Panatta equipment in the Inland Empire. Built in Italy with obsessive precision, every machine delivers biomechanically perfect movement paths that protect joints and maximize muscle engagement.',
    tags: ['Plate-Loaded', 'Pin-Selected', 'Italian Design'],
    img: 'https://sixthsensegym.com/wp-content/uploads/2022/01/panatta.jpg',
    alt: 'Panatta plate-loaded machines at Sixth Sense Gym',
  },
  {
    num: '02',
    label: 'Power & Strength',
    title: 'ARSENAL + GHOST',
    subtitle: 'Strength Redefined',
    body: 'Competition-grade combo racks from Arsenal Strength and Ghost pair with calibrated kilo plates for a setup serious lifters demand. Whether you squat, bench, or deadlift, every rep feels dialed in.',
    tags: ['Combo Racks', 'Calibrated Kilos', 'Competition-Grade'],
    img: 'https://sixthsensegym.com/wp-content/uploads/2022/01/racks-scaled.jpg',
    alt: 'Power racks and combo racks at Sixth Sense Gym',
  },
  {
    num: '03',
    label: 'Specialty Bars & Hydraulics',
    title: 'ROGUE + KABUKI + KEISER',
    subtitle: 'Every Tool You Need',
    body: 'From Rogue barbells and Kabuki specialty bars to Keiser pneumatic machines, our floor covers every training modality. Plus a full dumbbell run from 5 to 150 pounds ensures no gap in your arsenal.',
    tags: ['Rogue Barbells', 'Kabuki Bars', 'Keiser Hydraulic', '5-150lb DBs'],
    img: 'https://sixthsensegym.com/wp-content/uploads/2023/09/WEBSITE-PIC-3-scaled.jpg',
    alt: 'Main gym floor with specialty equipment',
  },
];

function FeatureRow({ feature, index }) {
  const rowRef = useRef(null);
  const imgRef = useRef(null);
  const isReversed = index % 2 !== 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Label fade
      tl.fromTo(
        rowRef.current.querySelector('[data-label]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      // Title reveal
      tl.fromTo(
        rowRef.current.querySelector('[data-title]'),
        { y: '100%' },
        { y: '0%', duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );

      // Subtitle fade
      tl.fromTo(
        rowRef.current.querySelector('[data-subtitle]'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // Body fade
      tl.fromTo(
        rowRef.current.querySelector('[data-body]'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Tags stagger
      tl.fromTo(
        rowRef.current.querySelectorAll('[data-tag]'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 },
        '-=0.2'
      );

      // Image clip-path reveal
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Ken Burns zoom
      gsap.fromTo(
        imgRef.current.querySelector('img'),
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const textContent = (
    <div className="relative flex flex-col justify-center">
      {/* Large decorative number */}
      <span className="absolute top-0 left-0 font-[family-name:var(--font-display)] text-8xl md:text-9xl text-[var(--black)]/[0.04] leading-none pointer-events-none select-none">
        {feature.num}
      </span>

      <p
        data-label
        className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-[var(--gold-dark)] mb-4 opacity-0"
      >
        {feature.label}
      </p>

      <div className="overflow-hidden">
        <h3
          data-title
          className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] tracking-[0.02em] text-[var(--black)] leading-[1.1]"
        >
          {feature.title}
        </h3>
      </div>

      <p
        data-subtitle
        className="font-[family-name:var(--font-body)] text-lg text-[var(--black)]/60 mt-2 opacity-0"
      >
        {feature.subtitle}
      </p>

      <p
        data-body
        className="font-[family-name:var(--font-body)] text-base text-[var(--black)]/50 leading-relaxed mt-4 max-w-md opacity-0"
      >
        {feature.body}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {feature.tags.map((tag) => (
          <span
            key={tag}
            data-tag
            className="font-[family-name:var(--font-body)] text-xs rounded-full bg-[var(--black)]/5 text-[var(--black)]/50 px-4 py-1.5 opacity-0"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const imageContent = (
    <div
      ref={imgRef}
      className="aspect-[4/5] rounded-lg overflow-hidden relative group"
      style={{ clipPath: 'inset(100% 0 0 0)' }}
    >
      <img
        src={feature.img}
        alt={feature.alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );

  return (
    <div
      ref={rowRef}
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
        index > 0 ? 'mt-24 md:mt-36' : ''
      }`}
    >
      {isReversed ? (
        <>
          <div className="relative">{imageContent}</div>
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          <div className="relative">{imageContent}</div>
        </>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[var(--cream)] py-24 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <FeatureRow key={feature.num} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
