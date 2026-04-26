import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', style = {}, href, onClick }) {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn || !text) return;

    // Use quickTo for zero-lag 
    const xTo = gsap.quickTo(btn, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const textXTo = gsap.quickTo(text, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const textYTo = gsap.quickTo(text, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * 0.4); // Button moves 40% of the distance
      yTo(y * 0.4);
      textXTo(x * 0.2); // Text moves 20% (parallax effect inside button)
      textYTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={btnRef}
      href={href}
      onClick={onClick}
      className={`magnetic-btn ${className}`}
      style={{ ...style, display: 'inline-block', position: 'relative' }}
    >
      <div ref={textRef} style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {children}
      </div>
    </Component>
  );
}
