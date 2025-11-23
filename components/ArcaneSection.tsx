'use client';

import { useEffect, useRef, useState } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';
import SimpleCrystal from '@/components/SimpleCrystal';

export default function ArcaneSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden"
      data-section="arcane"
    >
      {/* Parallax layers */}
      <div className="absolute inset-0">
        {/* Layer 1 - Far back */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollProgress * 50}px)`,
          }}
        />

        {/* Layer 2 - Mid */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollProgress * 100}px)`,
          }}
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-arcane-gold/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(40px)',
              }}
            />
          ))}
        </div>

        {/* Arcane glyph effect */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            opacity: scrollProgress,
            transform: `translate(-50%, -50%) scale(${0.5 + scrollProgress * 0.5}) rotate(${scrollProgress * 180}deg)`,
          }}
        >
          <div className="w-64 h-64 rounded-full border-2 border-arcane-gold/30 relative">
            <div className="absolute inset-4 rounded-full border border-arcane-gold/20" />
            <div className="absolute inset-8 rounded-full border border-arcane-gold/10" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <div
          style={{
            opacity: 1 - scrollProgress * 0.5,
            transform: `translateY(${scrollProgress * -50}px)`,
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading mb-6 px-4">
            {content.arcaneSection.title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-primary-300 max-w-2xl mx-auto px-4 mb-8">
            {content.arcaneSection.subtitle}
          </p>

          {/* Simple Crystal */}
          <SimpleCrystal />

          <p className="text-sm text-primary-400 italic mt-4 mb-8">
            ✨ Click the crystal ✨
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-arcane-gold"
                style={{
                  animation: `pulse ${1 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <ScrollArrow />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </section>
  );
}
