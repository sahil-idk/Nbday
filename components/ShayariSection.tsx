'use client';

import { useState, useRef, useEffect } from 'react';
import content from '@/content.json';

export default function ShayariSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowSignature(true), 2000);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section bg-gradient-to-b from-primary-950 to-primary-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border border-arcane-gold rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-arcane-gold rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 text-arcane-gold">
              {content.shayari.title}
            </h2>
          </div>

          <div className="card bg-primary-900/70 backdrop-blur-md border-arcane-gold/30">
            <div className="space-y-6">
              {content.shayari.lines.map((line, index) => (
                <p
                  key={index}
                  className={`text-2xl md:text-3xl font-heading text-center text-primary-100 transition-all duration-1000 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 500}ms`,
                    lineHeight: '1.8',
                  }}
                >
                  {line}
                </p>
              ))}

              {/* Signature */}
              <div
                className={`text-right mt-8 transition-all duration-1000 ${
                  showSignature
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                }`}
              >
                <p className="text-xl md:text-2xl font-heading text-arcane-gold italic">
                  {content.shayari.signature}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative bottom accent */}
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-arcane-gold"
                style={{
                  animation: 'twinkle 2s ease-in-out infinite',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
