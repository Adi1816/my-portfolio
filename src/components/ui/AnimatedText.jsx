import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({ text, className = '', style = {}, delay = 0, gradient = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Grab all character spans
    const chars = el.querySelectorAll('.char');

    const ctx = gsap.context(() => {
      gsap.fromTo(chars, {
        y: '100%',
        rotateX: -90,
        opacity: 0,
      }, {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.04,
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        }
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  // Simple split by character
  return (
    <span ref={containerRef} className={`animated-text ${className}`} style={{ ...style, display: 'inline-block', perspective: '1000px' }}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.25em', paddingBottom: '0.1em' }}>
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className={`char ${gradient ? 'gradient-text' : ''}`} 
              style={{ display: 'inline-block', transformOrigin: '50% 50% -20px' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
