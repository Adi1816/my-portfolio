import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // We only run this on desktop where pointer is fine
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    setIsVisible(true);

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Use gsap.quickTo for direct, zero-latency DOM updates
    const setCursorX = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3' });
    const setCursorY = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3' });
    
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0, ease: 'none' }); // 0 duration = instant snap
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0, ease: 'none' });

    let activeHover = false;

    const onMouseMove = (e) => {
      setCursorX(e.clientX - 16); // offset by half width
      setCursorY(e.clientY - 16);
      setDotX(e.clientX - 3);     // offset by half width
      setDotY(e.clientY - 3);
    };

    const onMouseOver = (e) => {
      const isInteractable = 
        e.target.closest('a') || 
        e.target.closest('button') || 
        e.target.classList.contains('interactive') ||
        e.target.closest('.magnetic-btn');

      if (isInteractable && !activeHover) {
        activeHover = true;
        gsap.to(cursor, { scale: 1.5, backgroundColor: 'rgba(139, 92, 246, 0.15)', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else if (!isInteractable && activeHover) {
        activeHover = false;
        gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    // Hide default cursor across the body using a class is better than inline style
    document.documentElement.classList.add('hide-cursor');

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.classList.remove('hide-cursor');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .hide-cursor, .hide-cursor * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Outer Circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full border border-purple-500/50 mix-blend-screen"
        style={{
          width: 32,
          height: 32,
        }}
      />
      
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10001] pointer-events-none rounded-full bg-cyan-400"
        style={{
          width: 6,
          height: 6,
        }}
      />
    </>
  );
}
