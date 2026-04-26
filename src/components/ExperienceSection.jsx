import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import FloatingGeometry from './three/FloatingGeometry';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Oracle',
    role: 'Software Engineering Intern',
    duration: 'Jan 2026 – Present',
    length: '6 Months',
    location: 'India',
    color: '#f43f5e',
    logo: 'O',
    points: [
      'Refactored the OSDMC backend by implementing Factory Design Patterns to resolve 2 critical architectural flaws. Improved system scalability while streamlining end-to-end data flow across Spring Boot microservices.',
      'Engineered the seamless migration of Configuration Manager and Route Manager modules from Oracle JET to the Rapid framework. Delivered 100% bug-free integration, enhancing UI responsiveness.',
      'Developed robust RESTful APIs and integrated Kafka with WebSockets to enable low-latency, real-time monitoring. Utilized Docker for containerization across Oracle Cloud infrastructure.',
    ],
    tags: ['Spring Boot', 'Kafka', 'Docker', 'REST APIs', 'WebSockets', 'Oracle Cloud'],
  },
  {
    company: 'DocuSign',
    role: 'Software Engineering Intern',
    duration: 'May 2025 – July 2025',
    length: '10 Weeks',
    location: 'India',
    color: '#8b5cf6',
    logo: 'D',
    points: [
      'Engineered a multi-step user redirection and callback mechanism within DocuSign\'s ACT workflows. Integrated a 3P SDK for OTP-based Aadhaar identity verification, improving process efficiency by 15%.',
      'Configured robust Azure DevOps pipelines for 10+ core services, reducing deployment time by 20%.',
      'Debugged and resolved critical build/runtime issues across systems scaled to 200+ users.',
    ],
    tags: ['Azure DevOps', 'CI/CD', 'Identity Verification', 'Aadhaar SDK'],
  },
  {
    company: 'TLE Eliminators',
    role: 'Competitive Programming Mathematics Tutor',
    duration: 'Aug 2024 – Dec 2024',
    length: '5 Months',
    location: 'Remote',
    color: '#06b6d4',
    logo: 'T',
    points: [
      'Delivered expert instruction to over 200 beginners, leading to a 40% enhancement in students\' Codeforces ratings.',
      'Facilitated interactive post-contest solution discussions, resulting in 15% fewer common coding errors.',
    ],
    tags: ['Competitive Programming', 'Mathematics', 'Teaching', 'Codeforces'],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-heading', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
      });

      gsap.fromTo('.exp-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative section-padding">
      {/* 3D Floating Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <FloatingGeometry shape="octahedron" color="#f59e0b" position={[5, 2, -2]} scale={0.6} speed={0.25} />
          <FloatingGeometry shape="torusKnot" color="#06b6d4" position={[-5, -1, -3]} scale={0.5} speed={0.35} />
          <FloatingGeometry shape="box" color="#ec4899" position={[3, -4, -4]} scale={0.4} speed={0.45} />
        </Canvas>
      </div>

      <div className="section-container relative z-10">
        {/* Section label */}
        <div className="exp-heading" style={{ marginBottom: 16 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, color: '#10b981',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            03 — Experience
          </span>
        </div>

        <h2 className="exp-heading" style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, marginBottom: 56, lineHeight: 1.2,
        }}>
          Where I've<br />
          <span className="gradient-text">made impact.</span>
        </h2>

        {/* Timeline */}
        <div className="exp-timeline relative" style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Vertical line */}
          <div className="hidden md:block absolute" style={{
            left: 30, top: 0, bottom: 0, width: 1,
            background: 'linear-gradient(180deg, var(--purple), var(--cyan), var(--emerald), transparent)',
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="exp-card relative md:pl-20"
              style={{ marginBottom: i < experiences.length - 1 ? 40 : 0 }}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute items-center justify-center" style={{
                left: 18, top: 24, width: 25, height: 25, borderRadius: '50%',
                background: 'var(--bg-primary)', border: `2px solid ${exp.color}`,
                boxShadow: `0 0 15px ${exp.color}44`,
                zIndex: 2,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: exp.color }} />
              </div>

              {/* Card */}
              <motion.div
                className="glass"
                whileHover={{ borderColor: `${exp.color}33`, y: -2 }}
                style={{ padding: '28px 28px 24px', transition: 'all 0.3s ease' }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4" style={{ marginBottom: 16 }}>
                  <div className="flex items-center gap-4">
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `linear-gradient(135deg, ${exp.color}22, ${exp.color}11)`,
                      border: `1px solid ${exp.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: exp.color,
                    }}>
                      {exp.logo}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {exp.company}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: exp.color, fontWeight: 500 }}>
                        {exp.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                      <Calendar size={12} />
                      {exp.duration}
                    </div>
                    <span style={{
                      padding: '2px 10px', borderRadius: 50, fontSize: 10,
                      background: `${exp.color}15`, color: exp.color,
                      fontFamily: 'var(--font-mono)', fontWeight: 500,
                    }}>
                      {exp.length}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <div className="flex flex-col gap-3" style={{ marginBottom: 16 }}>
                  {exp.points.map((point, j) => (
                    <div key={j} className="flex gap-3">
                      <ChevronRight size={14} style={{ color: exp.color, marginTop: 4, flexShrink: 0 }} />
                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                      }}>
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '3px 10px', borderRadius: 50, fontSize: 11,
                      fontFamily: 'var(--font-mono)', color: 'var(--text-muted)',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
