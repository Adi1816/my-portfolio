import React, { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import ParticleField from './three/ParticleField';
import FloatingGeometry from './three/FloatingGeometry';
import AnimatedText from './ui/AnimatedText';
import MagneticButton from './ui/MagneticButton';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtitle fade
      gsap.fromTo('.hero-subtitle', {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 2.2,
      });

      // CTA buttons
      gsap.fromTo('.hero-cta', {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 2.6,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative w-full" style={{ height: '100vh', minHeight: 700, overflow: 'hidden' }}>
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <FloatingGeometry shape="icosahedron" color="#8b5cf6" position={[-5, 3, -4]} scale={0.8} speed={0.15} />
          <FloatingGeometry shape="torus" color="#06b6d4" position={[5, -2, -3]} scale={0.6} speed={0.2} />
          <ParticleField count={400} color="#06b6d4" size={0.04} spread={15} />
          <ParticleField count={200} color="#8b5cf6" size={0.06} spread={15} />
        </Canvas>
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(180deg, rgba(3,0,20,0.4) 0%, rgba(3,0,20,0.1) 40%, rgba(3,0,20,0.3) 80%, rgba(3,0,20,0.95) 100%)',
      }} />

      {/* Content Overlay */}
      <div ref={textRef} className="relative z-[2] flex flex-col items-center justify-center h-full text-center" style={{ padding: '0 24px' }}>
        <div style={{ perspective: 800, marginTop: '15vh' }}>
          {/* Status badge */}
          <motion.div
            className="hero-line"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 50, marginBottom: 24,
              background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              SDE Intern @ Oracle
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1, marginBottom: 16 }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 300, color: 'var(--text-secondary)' }}>
              <AnimatedText text="Hi, I'm" delay={1.5} />
            </div>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '-10px' }}>
              <AnimatedText text="Aditya" delay={1.7} gradient={true} />
            </div>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '-10px' }}>
              <AnimatedText text="Srivastava" delay={1.8} />
            </div>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle" style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px',
            lineHeight: 1.7, fontWeight: 400,
          }}>
            Software Engineer crafting performant systems & elegant solutions.
            <br />
            <span style={{ color: 'var(--text-muted)' }}>BIT Mesra CSE '26 • Codeforces Expert (1749)</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <MagneticButton
            href="#projects"
            className="hero-cta"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              padding: '16px 36px', borderRadius: 50, border: 'none', cursor: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600,
              color: '#fff', textDecoration: 'none',
            }}
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </MagneticButton>

          <MagneticButton
            href="https://drive.google.com/file/d/1zBbPLYJlFTyngobXBBWxughLH_HncRXT/view?usp=sharing"
            className="hero-cta"
            onClick={(e) => { window.open("https://drive.google.com/file/d/1zBbPLYJlFTyngobXBBWxughLH_HncRXT/view?usp=sharing", "_blank", "noopener,noreferrer"); e.preventDefault(); }}
            style={{
              padding: '16px 36px', borderRadius: 50, cursor: 'none',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600,
              color: 'var(--text-primary)', textDecoration: 'none',
            }}
          >
            View Resume
          </MagneticButton>
        </div>
      </div>

    </section>
  );
}
