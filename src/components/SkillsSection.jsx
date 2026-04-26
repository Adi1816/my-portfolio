import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import FloatingGeometry from './three/FloatingGeometry';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    color: '#8b5cf6',
    skills: [
      { name: 'C++', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'C', level: 80 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    color: '#06b6d4',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Next.js', level: 88 },
      { name: 'Node.js', level: 85 },
      { name: 'Spring Boot', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'GSAP', level: 82 },
    ],
  },
  {
    title: 'Databases & Cloud',
    color: '#10b981',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 82 },
      { name: 'Azure', level: 78 },
      { name: 'Docker', level: 80 },
      { name: 'Kubernetes', level: 72 },
    ],
  },
  {
    title: 'Developer Tools',
    color: '#f59e0b',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'VS Code', level: 92 },
      { name: 'IntelliJ', level: 80 },
      { name: 'LaTeX', level: 75 },
      { name: 'GitLab', level: 80 },
    ],
  },
];

const cpProfiles = [
  { platform: 'Codeforces', rating: '1749', badge: 'Expert', color: '#8b5cf6', bgColor: 'rgba(139,92,246,0.1)' },
  { platform: 'LeetCode', rating: 'Knight', badge: 'Knight', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)' },
  { platform: 'CodeChef', rating: '1700', badge: '4★', color: '#06b6d4', bgColor: 'rgba(6,182,212,0.1)' },
  { platform: 'AtCoder', rating: '8 Kyu', badge: '8 Kyu', color: '#10b981', bgColor: 'rgba(16,185,129,0.1)' },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-heading', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-heading', start: 'top 85%' },
      });

      gsap.fromTo('.skill-category', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
      });

      gsap.fromTo('.cp-card', { y: 30, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.08,
        scrollTrigger: { trigger: '.cp-grid', start: 'top 85%' },
      });

      // Animate skill bars on scroll
      gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
        gsap.fromTo(bar, { width: '0%' }, {
          width: bar.getAttribute('data-level') + '%',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: bar, start: 'top 90%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative section-padding">
      {/* 3D Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{ zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <FloatingGeometry shape="dodecahedron" color="#f43f5e" position={[-5, 3, -2]} scale={0.5} speed={0.2} />
          <FloatingGeometry shape="sphere" color="#8b5cf6" position={[5, -3, -4]} scale={0.4} speed={0.4} />
          <FloatingGeometry shape="torus" color="#10b981" position={[-4, -2, -3]} scale={0.6} speed={0.3} />
          <FloatingGeometry shape="icosahedron" color="#06b6d4" position={[4, 4, -1]} scale={0.3} speed={0.6} />
        </Canvas>
      </div>

      <div className="section-container relative" style={{ zIndex: 10 }}>
        {/* Section label */}
        <div className="skills-heading" style={{ marginBottom: 16 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--cyan)',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            02 — Skills
          </span>
        </div>

        <h2 className="skills-heading" style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, marginBottom: 24, lineHeight: 1.2,
        }}>
          Technologies I<br />
          <span className="gradient-text">work with.</span>
        </h2>

        {/* CP Profiles */}
        <div className="cp-grid grid grid-cols-2 md:grid-cols-4 gap-3" style={{ marginBottom: 48 }}>
          {cpProfiles.map((cp) => (
            <motion.div
              key={cp.platform}
              className="cp-card glass-sm"
              whileHover={{ scale: 1.04, y: -4 }}
              style={{ padding: '16px 20px', textAlign: 'center', cursor: 'default' }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                {cp.platform}
              </p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: cp.color }}>
                {cp.rating}
              </p>
              <span style={{
                display: 'inline-block', marginTop: 6, padding: '2px 10px', borderRadius: 50,
                fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)',
                color: cp.color, background: cp.bgColor,
              }}>
                {cp.badge}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Skill Categories Grid */}
        <div className="skills-grid grid md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="skill-category glass-sm"
              whileHover={{ borderColor: `${category.color}33` }}
              style={{ padding: '28px 24px', transition: 'border-color 0.3s ease' }}
            >
              <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: category.color,
                  boxShadow: `0 0 12px ${category.color}66`,
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center" style={{ marginBottom: 6 }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
                        {skill.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%', height: 3, borderRadius: 2,
                      background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
                    }}>
                      <div
                        className="skill-bar-fill"
                        data-level={skill.level}
                        style={{
                          height: '100%', borderRadius: 2, width: '0%',
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                          boxShadow: `0 0 8px ${category.color}44`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
