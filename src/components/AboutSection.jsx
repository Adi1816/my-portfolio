import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingGeometry from './three/FloatingGeometry';
import ParticleField from './three/ParticleField';
import { MapPin, GraduationCap, Briefcase, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <Briefcase size={18} />, label: 'Internships', value: '3', color: '#8b5cf6' },
  { icon: <Trophy size={18} />, label: 'CF Rating', value: '1749', color: '#06b6d4' },
  { icon: <GraduationCap size={18} />, label: 'CGPA', value: '8.71', color: '#10b981' },
  { icon: <MapPin size={18} />, label: 'Based in', value: 'India', color: '#f59e0b' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-heading', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
      });

      gsap.fromTo('.about-text', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: '.about-text', start: 'top 85%' },
      });

      gsap.fromTo('.about-stat', { y: 30, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1,
        scrollTrigger: { trigger: '.about-stats-grid', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative section-padding" style={{ background: 'var(--bg-primary)' }}>
      {/* Background 3D */}
      <div className="absolute inset-0 opacity-40" style={{ zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#06b6d4" />
          <FloatingGeometry shape="torusKnot" color="#8b5cf6" position={[-4, 2, 0]} scale={0.6} speed={0.3} />
          <FloatingGeometry shape="octahedron" color="#06b6d4" position={[4, -1, -2]} scale={0.5} speed={0.4} />
          <FloatingGeometry shape="icosahedron" color="#10b981" position={[3, 3, -3]} scale={0.4} speed={0.5} />
          <FloatingGeometry shape="dodecahedron" color="#f43f5e" position={[-5, -3, -4]} scale={0.45} speed={0.25} />
          <FloatingGeometry shape="sphere" color="#f59e0b" position={[-2, -2, -5]} scale={0.3} speed={0.45} />
          <ParticleField count={150} color="#8b5cf6" size={0.015} spread={12} />
        </Canvas>
      </div>

      <div className="section-container relative" style={{ zIndex: 10 }}>
        {/* Section label */}
        <div className="about-heading" style={{ marginBottom: 16 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--purple)',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            01 — About
          </span>
        </div>

        <h2 className="about-heading" style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, marginBottom: 48, lineHeight: 1.2,
        }}>
          Building the future,<br />
          <span className="gradient-text">one line at a time.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text column */}
          <div>
            <p className="about-text" style={{
              fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8,
              color: 'var(--text-secondary)', marginBottom: 20,
            }}>
              I'm a <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Computer Science student at BIT Mesra</span> with 
              a deep passion for building scalable software systems and solving complex algorithmic problems. Currently working as 
              an <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>SDE Intern at Oracle</span>, where I architect 
              cloud-native microservices and build real-time monitoring systems.
            </p>

            <p className="about-text" style={{
              fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8,
              color: 'var(--text-secondary)', marginBottom: 20,
            }}>
              My journey spans from competitive programming — where I've achieved an <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Expert rating on Codeforces (1749)</span> and 
              secured <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>AIR 3 in Codeforces Round 1093</span> — to production systems at companies 
              like <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>DocuSign</span> and <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Oracle</span>.
            </p>

            <p className="about-text" style={{
              fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8,
              color: 'var(--text-secondary)', marginBottom: 32,
            }}>
              I hold full-time offers from <span style={{ color: '#f59e0b', fontWeight: 600 }}>Flipkart</span> and <span style={{ color: '#06b6d4', fontWeight: 600 }}>Cisco</span>, 
              and ranked <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>4th nationally in Flipkart GRID 7.0</span> among 160,000+ participants.
            </p>

            {/* Education card */}
            <div className="about-text glass-sm" style={{ padding: '20px 24px' }}>
              <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
                <GraduationCap size={20} style={{ color: 'var(--purple)' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600 }}>
                  Birla Institute of Technology, Mesra
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
                B.Tech in Computer Science & Engineering • CGPA: 8.71/10.0
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                Nov 2022 – May 2026
              </p>
            </div>
          </div>

          {/* Stats column */}
          <div>
            <div className="about-stats-grid grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="about-stat glass-sm"
                  whileHover={{ scale: 1.03, borderColor: stat.color }}
                  style={{
                    padding: '24px 20px', textAlign: 'center',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <div style={{ color: stat.color, marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                    {stat.icon}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700,
                    color: 'var(--text-primary)', marginBottom: 4,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coursework */}
            <div className="about-stat glass-sm" style={{ marginTop: 16, padding: '20px 24px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-2">
                {['Operating Systems', 'DBMS', 'OOP', 'Computer Networks'].map(course => (
                  <span key={course} style={{
                    padding: '4px 12px', borderRadius: 50, fontSize: 12,
                    fontFamily: 'var(--font-body)', color: 'var(--text-secondary)',
                    background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.15)',
                  }}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
