import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onComplete?.(), 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ textAlign: 'center' }}>
            {/* Animated rings */}
            <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 32px' }}>
              <motion.div
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '2px solid transparent', borderTopColor: '#8b5cf6', borderRightColor: '#06b6d4',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                style={{
                  position: 'absolute', inset: 8, borderRadius: '50%',
                  border: '2px solid transparent', borderBottomColor: '#06b6d4', borderLeftColor: '#10b981',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                style={{
                  position: 'absolute', inset: 16, borderRadius: '50%',
                  border: '1px solid transparent', borderTopColor: '#f59e0b',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Name */}
            <motion.p
              style={{ fontFamily: 'var(--font-heading)', fontSize: 14, letterSpacing: '0.3em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 24 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Aditya Srivastava
            </motion.p>

            {/* Progress bar */}
            <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, margin: '0 auto', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', borderRadius: 1, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <motion.p
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
