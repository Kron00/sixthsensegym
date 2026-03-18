
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  'Infrared Sauna',
  'Posing Room',
  'Showers',
  'Full Cardio',
  'Barbershop',
  'Nutrition Spot',
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const imageInnerRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef(null);
  const amenitiesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );

      // Ken Burns
      gsap.fromTo(
        imageInnerRef.current,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );

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

      // Paragraphs fade up
      const paragraphs = paragraphsRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.from(paragraphs, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paragraphsRef.current,
            start: 'top 85%',
          },
        });
      }

      // Amenities stagger
      const items = amenitiesRef.current?.querySelectorAll('.amenity-item');
      if (items) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: amenitiesRef.current,
            start: 'top 90%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[var(--cream)] py-12 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-20 items-center">
        {/* Left — Image */}
        <div
          ref={imageRef}
          className="aspect-[3/4] rounded-xl overflow-hidden relative"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <img
            ref={imageInnerRef}
            src="https://sixthsensegym.com/wp-content/uploads/2021/04/family_sixth_sense_gym.png"
            alt="Mario and Erika Juarez — Sixth Sense Gym founders"
            className="w-full h-full object-cover will-change-transform"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)]/30 to-transparent" />
        </div>

        {/* Right — Text */}
        <div>
          <span className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-[var(--gold-dark)]">
            Our Story
          </span>

          <div className="overflow-hidden mt-3 mb-8">
            <h2
              ref={titleRef}
              className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,5vw,4rem)] tracking-[0.02em] text-[var(--black)] leading-none"
              style={{ transform: 'translateY(100%)' }}
            >
              BUILT BY A FAMILY,{' '}
              <span className="text-[var(--gold)]">FOR ATHLETES</span>
            </h2>
          </div>

          <div ref={paragraphsRef} className="space-y-5">
            <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-[var(--black)]/50 leading-relaxed">
              Sixth Sense Gym was founded by Mario and Erika Juarez with a simple
              vision: build a gym they&apos;d actually want to train in. Tired of
              overcrowded floors, broken equipment, and cookie-cutter facilities,
              they set out to create something different in Ontario, California.
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-[var(--black)]/50 leading-relaxed">
              Every piece of equipment was hand-selected &mdash; Panatta machines from
              Italy, Ghost Combo Racks with calibrated kilos, Kabuki specialty
              bars, Arsenal Strength stations. This isn&apos;t a gym that ordered
              from a catalog. It&apos;s a gym built piece by piece by people who
              understand what serious training demands.
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-[var(--black)]/50 leading-relaxed">
              Membership is private and intentional. Your key fob grants 24/7
              access to a facility that feels like your own personal training
              headquarters &mdash; complete with an infrared sauna, posing room, and an
              atmosphere where focus comes first.
            </p>
          </div>

          <div
            ref={amenitiesRef}
            className="grid grid-cols-2 gap-3 mt-8"
          >
            {amenities.map((item) => (
              <div
                key={item}
                className="amenity-item flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--black)]/[0.03]"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] flex-shrink-0" />
                <span className="font-[family-name:var(--font-body)] text-xs tracking-wider uppercase text-[var(--black)]/50">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
