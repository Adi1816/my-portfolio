import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import FloatingGeometry from './three/FloatingGeometry';
import { ExternalLink, ArrowRight } from 'lucide-react';
import AnimatedText from './ui/AnimatedText';
import MagneticButton from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'SpecPilot',
    subtitle: 'Contract-Grounded API Testing Copilot',
    description: 'An AI-assisted API testing copilot built with Next.js that turns OpenAPI contracts into reproducible test suites, execution dashboards, and bug-ready markdown reports.',
    tags: ['Next.js 16', 'React 19', 'Gemini AI', 'Tailwind v4', 'TypeScript'],
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #f97316)',
    metrics: [
      { label: 'Type', value: 'Full Stack' },
      { label: 'Tech', value: 'GenAI' },
      { label: 'Status', value: 'Flagship' },
    ],
  },
  {
    title: 'AI Mock Interview',
    subtitle: 'Full Stack Platform',
    description: 'A browser-based platform using Next.js 14, Gemini AI, and Clerk, processing over 500+ interviews in its first month. Features a speech recognition module with 98% accuracy, enhancing feedback quality by 40%.',
    tags: ['Next.js 14', 'Gemini AI', 'Clerk', 'Speech Recognition', 'Full Stack'],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    metrics: [
      { label: 'Interviews', value: '500+' },
      { label: 'Accuracy', value: '98%' },
      { label: 'Feedback ↑', value: '40%' },
    ],
  },
  {
    title: 'Hindi Poetry Analyzer',
    subtitle: 'Research Project',
    description: 'A computational poetry analysis platform using React, analyzing 1000+ words from Hanuman Chalisa. Achieved perfect 100/100 in Accessibility & SEO and 98/100 in Performance on Lighthouse audits.',
    tags: ['React', 'NLP', 'Computational Linguistics', 'Research', 'Lighthouse'],
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
    metrics: [
      { label: 'Words Analyzed', value: '1000+' },
      { label: 'SEO Score', value: '100' },
      { label: 'Performance', value: '98' },
    ],
  },
  {
    title: 'Fresher\'s Guide',
    subtitle: 'Web Development Project',
    description: 'A comprehensive virtual guide built for juniors to navigate college life, featuring high-end animations using GSAP and SheryJS. Achieved high engagement among the student community.',
    tags: ['GSAP', 'SheryJS', 'Locomotive Scroll', 'HTML/CSS'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
    metrics: [
      { label: 'Role', value: 'Co-creator' },
      { label: 'Target', value: 'Juniors' },
      { label: 'Focus', value: 'UI/UX' },
    ],
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-heading', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-heading', start: 'top 85%' },
      });

      gsap.fromTo('.proj-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '.proj-grid', start: 'top 80%' },
      });

      gsap.fromTo('.spline-project-container', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.spline-project-container', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative section-padding bg-grid">
      {/* 3D Floating Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <FloatingGeometry shape="torusKnot" color="#f43f5e" position={[-6, 3, -4]} scale={0.6} speed={0.2} />
          <FloatingGeometry shape="icosahedron" color="#8b5cf6" position={[5, -2, -2]} scale={0.5} speed={0.3} />
          <FloatingGeometry shape="dodecahedron" color="#06b6d4" position={[-4, -4, -3]} scale={0.4} speed={0.4} />
          <FloatingGeometry shape="sphere" color="#10b981" position={[6, 4, -5]} scale={0.35} speed={0.5} />
        </Canvas>
      </div>

      <div className="section-container relative z-10">
        {/* Section label */}
        <div className="proj-heading" style={{ marginBottom: 16 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, color: '#f59e0b',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            04 — Projects
          </span>
        </div>

        <h2 className="proj-heading" style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, marginBottom: 56, lineHeight: 1.2,
        }}>
          <AnimatedText text="Things I've" />
          <br />
          <span><AnimatedText text="built." delay={0.2} gradient={true} /></span>
        </h2>

        {/* Project Cards Grid */}
        <div className="proj-grid grid md:grid-cols-2 gap-6" style={{ marginBottom: 48 }}>
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="proj-card glass gradient-border"
              whileHover={{ y: -6 }}
              style={{ padding: 28, transition: 'transform 0.4s ease', cursor: 'default' }}
            >
              {/* Top accent line */}
              <div style={{ width: 40, height: 3, borderRadius: 2, background: project.gradient, marginBottom: 20 }} />

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
                color: 'var(--text-primary)', marginBottom: 4,
              }}>
                {project.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: project.color,
                marginBottom: 16, letterSpacing: '0.05em',
              }}>
                {project.subtitle}
              </p>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7,
                color: 'var(--text-secondary)', marginBottom: 20,
              }}>
                {project.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 20 }}>
                {project.metrics.map(m => (
                  <div key={m.label} style={{
                    textAlign: 'center', padding: '12px 8px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: project.color }}>
                      {m.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
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
          ))}
        </div>

        {/* Spline 3D Showcase */}
        <div className="spline-project-container glass" style={{ padding: 4, overflow: 'hidden', borderRadius: 20 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 400, position: 'relative' }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg-surface)' }}>
                <div className="preloader-ring" />
              </div>
            }>
              <Spline scene="https://prod.spline.design/5cICM08sJUeEdxX8/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </Suspense>
            {/* Overlay gradient */}
            <div className="absolute bottom-0 left-0 right-0" style={{
              height: 100,
              background: 'linear-gradient(180deg, transparent, rgba(3,0,20,0.8))',
              pointerEvents: 'none',
            }} />
            <div className="absolute bottom-4 left-6 z-[2]">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                INTERACTIVE 3D • HOVER TO EXPLORE
              </p>
            </div>
          </div>
        </div>

        {/* Achievements highlight */}
        <div style={{ marginTop: 56 }}>
          <h3 className="proj-heading" style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 600, marginBottom: 24, color: 'var(--text-primary)',
          }}>
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { text: 'Secured FTE offers from Flipkart and Cisco through competitive off-campus hiring', highlight: 'Flipkart & Cisco FTE', color: '#f59e0b' },
              { text: '4th rank in National Finals of Flipkart GRID 7.0 among 160,000+ participants', highlight: '#4 National', color: '#f43f5e' },
              { text: 'Qualified Meta Hacker Cup Round 2 for two consecutive years', highlight: 'Meta Hacker Cup', color: '#8b5cf6' },
              { text: 'Global Rank 264 and AIR 3 in Codeforces Round 1093 (Div. 2)', highlight: 'AIR 3', color: '#06b6d4' },
            ].map((ach, i) => (
              <motion.div
                key={i}
                className="proj-card glass-sm flex items-start gap-4"
                whileHover={{ borderColor: `${ach.color}33`, x: 4 }}
                style={{ padding: '18px 20px', cursor: 'default', transition: 'all 0.3s ease' }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: `${ach.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={14} style={{ color: ach.color }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600, color: ach.color, marginBottom: 4 }}>
                    {ach.highlight}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {ach.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
