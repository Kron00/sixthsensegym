
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2022/01/main-floor-2-scaled.jpg',
    alt: 'Main gym floor with premium equipment',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2022/01/racks-scaled.jpg',
    alt: 'Power racks and squat stations',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2022/01/panatta.jpg',
    alt: 'Panatta strength machines',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2023/09/WEBSITE-PIC5-scaled.jpg',
    alt: 'Training area overview',
    className: 'col-span-1 row-span-2',
  },
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2023/09/WEBSITE-PIC2-scaled.jpg',
    alt: 'Gym equipment and free weights',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2022/01/turf-scaled.jpg',
    alt: 'Turf area for functional training',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2022/01/plate-laoded-scaled.jpg',
    alt: 'Plate-loaded machines',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://sixthsensegym.com/wp-content/uploads/2022/01/2nd-floor-scaled.jpg',
    alt: 'Second floor training area',
    className: 'col-span-1 row-span-1',
  },
];

export default function Gallery() {
  const gridRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        const img = item.querySelector('img');

        // Clip-path reveal
        gsap.fromTo(
          item,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.inOut',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );

        // Ken Burns — scale down after reveal
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.3 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
              delay: i * 0.08,
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
              },
            }
          );
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[var(--cream)] px-6 pb-20 md:pb-32">
      <div
        ref={gridRef}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3 auto-rows-[120px] md:auto-rows-[200px]"
      >
        {images.map((image, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className={`gallery-item overflow-hidden rounded-lg relative group ${image.className}`}
            style={{ clipPath: 'inset(100% 0 0 0)' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[var(--black)]/10 transition-colors duration-500 group-hover:bg-[var(--black)]/30" />
            {/* Gold bottom border on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] origin-left" />
          </div>
        ))}
      </div>
    </section>
  );
}
