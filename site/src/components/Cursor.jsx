
import { useRef, useEffect, useState, useCallback } from 'react';

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const hoverStateRef = useRef('default');
  const [hoverState, setHoverState] = useState('default');
  const [isTouch, setIsTouch] = useState(false);

  // Keep ref in sync with state for use in rAF loop
  useEffect(() => {
    hoverStateRef.current = hoverState;
  }, [hoverState]);

  const handleMouseMove = useCallback((e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    }
  }, []);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    // Lerp animation loop
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        const state = hoverStateRef.current;
        const size = state === 'image' ? 80 : state === 'link' ? 64 : 40;
        const half = size / 2;
        ringRef.current.style.transform = `translate(${ringPos.current.x - half}px, ${ringPos.current.y - half}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Hover detection via event delegation
    const handleOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setHoverState('link');
      } else if (
        target.tagName === 'IMG' ||
        target.closest('[data-cursor="view"]')
      ) {
        setHoverState('image');
      }
    };

    const handleOut = (e) => {
      const related = e.relatedTarget;
      if (
        !related ||
        (!related.closest?.('a') &&
          !related.closest?.('button') &&
          !related.closest?.('[role="button"]') &&
          related.tagName !== 'IMG' &&
          !related.closest?.('[data-cursor="view"]'))
      ) {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  if (isTouch) return null;

  const ringSize = hoverState === 'image' ? 80 : hoverState === 'link' ? 64 : 40;
  const ringOpacity = hoverState === 'default' ? 0.3 : hoverState === 'link' ? 0.6 : 0.5;

  return (
    <div className="hidden md:block">
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full border border-[var(--gold)] mix-blend-difference flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
          zIndex: 9997,
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      >
        {hoverState === 'image' && (
          <span className="text-[10px] text-[var(--gold)] tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
            VIEW
          </span>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none w-2 h-2 rounded-full bg-[var(--gold)]"
        style={{
          zIndex: 9997,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
