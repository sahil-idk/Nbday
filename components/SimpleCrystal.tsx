'use client';

import { useState } from 'react';

export default function SimpleCrystal() {
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div
        onClick={handleClick}
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 ${
          isPulsing ? 'animate-pulse-once' : ''
        }`}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 blur-xl opacity-40 bg-arcane-gold/30 rounded-full scale-150" />

        {/* Crystal shape - hexagon */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 animate-float">
          {/* Main crystal */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/80 via-blue-500/60 to-blue-600/80 backdrop-blur-sm"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Inner highlight */}
            <div className="absolute inset-4 bg-gradient-to-br from-white/40 to-transparent"
              style={{
                clipPath: 'polygon(50% 10%, 90% 30%, 90% 70%, 50% 90%, 10% 70%, 10% 30%)'
              }}
            />
          </div>

          {/* Sparkle effects */}
          <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white rounded-full animate-sparkle" />
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white/80 rounded-full animate-sparkle-delayed" />
          <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-white/60 rounded-full animate-sparkle" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes sparkle-delayed {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }

        @keyframes pulse-once {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-sparkle-delayed {
          animation: sparkle-delayed 2.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-pulse-once {
          animation: pulse-once 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
