'use client';

import { useState } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';

export default function DateCard() {
  const [selectedIdea, setSelectedIdea] = useState<number | null>(null);
  const [isConfetti, setIsConfetti] = useState(false);

  const handleSelectIdea = (index: number) => {
    setSelectedIdea(index);
    setIsConfetti(true);
    setTimeout(() => setIsConfetti(false), 3000);
  };

  return (
    <section className="section relative overflow-hidden" data-section="date">
      {/* Confetti effect */}
      {isConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#3b82f6', '#d4af37', '#60a5fa', '#ffb89d'][Math.floor(Math.random() * 4)],
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-heading mb-4">
              {content.dateCard.title}
            </h2>
            <p className="text-xl text-primary-300">
              {content.dateCard.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.dateCard.ideas.map((idea, index) => (
              <div
                key={index}
                className={`card cursor-pointer transition-all duration-300 ${
                  selectedIdea === index
                    ? 'border-arcane-gold bg-primary-800/70 scale-105'
                    : 'hover:scale-105'
                }`}
                onClick={() => handleSelectIdea(index)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{idea.icon}</div>
                  <h3 className="text-2xl font-heading mb-3 text-primary-100">
                    {idea.title}
                  </h3>
                  <p className="text-primary-300">{idea.description}</p>

                  {selectedIdea === index && (
                    <div className="mt-4 pt-4 border-t border-primary-700/50">
                      <p className="text-arcane-gold font-medium">
                        ✓ Let&apos;s make this happen!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedIdea !== null && (
            <div className="mt-8 text-center">
              <div className="inline-block card bg-primary-800/70 border-arcane-gold/50">
                <p className="text-lg text-primary-200">
                  Perfect choice! Can&apos;t wait to make more memories with you 💙
                </p>
              </div>
            </div>
          )}

          {/* Calendar hint */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-800/50 rounded-full border border-primary-700/50">
              <svg className="w-5 h-5 text-arcane-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-primary-300">After exams - we&apos;ve got all the time in the world</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      <ScrollArrow />
    </section>
  );
}
