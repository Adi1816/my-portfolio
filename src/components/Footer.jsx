import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-container" style={{ padding: '40px 24px' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — Branding */}
          <div className="flex items-center gap-3">
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12, color: '#fff',
            }}>
              A
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>
              Aditya Srivastava
            </span>
          </div>

          {/* Center — Credit */}
          <p className="flex items-center gap-1.5" style={{
            fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)',
          }}>
            Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={12} style={{ color: '#f43f5e', fill: '#f43f5e' }} />
            </motion.span>
            using React, Three.js & GSAP
          </p>

          {/* Right — Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="glass-sm flex items-center gap-2"
            style={{
              padding: '10px 16px', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)', fontSize: 11,
            }}
          >
            <ArrowUp size={14} />
            Back to top
          </motion.button>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Aditya Srivastava. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
