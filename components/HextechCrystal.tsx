'use client';

import { useEffect, useRef, useState } from 'react';

export default function HextechCrystal() {
  const crystalRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Idle floating animation
  useEffect(() => {
    if (!crystalRef.current) return;

    const crystal = crystalRef.current;
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Floating motion
      const floatY = Math.sin(time) * 10;
      const rotateY = time * 20; // Slow rotation

      if (!isHovered && !isPulsing) {
        crystal.style.transform = `
          translateY(${floatY}px)
          rotateY(${rotateY}deg)
          rotateX(15deg)
        `;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isHovered, isPulsing]);

  const handleHover = () => {
    setIsHovered(true);
    if (crystalRef.current) {
      crystalRef.current.style.transform = `
        scale(1.15)
        rotateY(25deg)
        rotateX(20deg)
      `;
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsPulsing(true);

    // Pulse animation
    if (crystalRef.current) {
      crystalRef.current.classList.add('pulse-animation');

      setTimeout(() => {
        crystalRef.current?.classList.remove('pulse-animation');
        setIsPulsing(false);
      }, 800);
    }
  };

  return (
    <div className="crystal-container">
      {/* Starry background particles */}
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Main Crystal */}
      <div
        ref={crystalRef}
        className="hextech-crystal"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        {/* Crystal facets */}
        <div className="crystal-facet front" />
        <div className="crystal-facet back" />
        <div className="crystal-facet left" />
        <div className="crystal-facet right" />
        <div className="crystal-facet top" />
        <div className="crystal-facet bottom" />

        {/* Inner glow core */}
        <div className="crystal-core" />

        {/* Outer glow rings */}
        <div className="glow-ring ring-1" />
        <div className="glow-ring ring-2" />
        <div className="glow-ring ring-3" />
      </div>

      {/* Energy particles */}
      <div className="energy-particles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .crystal-container {
          position: relative;
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          justify-center;
          perspective: 1000px;
          overflow: hidden;
          background: linear-gradient(180deg,
            rgba(10, 22, 40, 0.95) 0%,
            rgba(23, 37, 84, 0.9) 50%,
            rgba(30, 58, 138, 0.85) 100%
          );
          border-radius: 1.5rem;
        }

        /* Starry background */
        .stars {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .star {
          position: absolute;
          background: #70d6ff;
          border-radius: 50%;
          box-shadow: 0 0 8px #70d6ff;
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* Main Crystal */
        .hextech-crystal {
          position: relative;
          width: 180px;
          height: 180px;
          transform-style: preserve-3d;
          transform: rotateY(0deg) rotateX(15deg);
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          z-index: 10;
        }

        .hextech-crystal:hover {
          filter: brightness(1.3);
        }

        /* Crystal facets */
        .crystal-facet {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg,
            rgba(112, 214, 255, 0.4) 0%,
            rgba(37, 99, 235, 0.6) 50%,
            rgba(59, 130, 246, 0.3) 100%
          );
          border: 2px solid rgba(112, 214, 255, 0.5);
          box-shadow:
            0 0 30px rgba(112, 214, 255, 0.6),
            inset 0 0 30px rgba(112, 214, 255, 0.3);
          backdrop-filter: blur(8px);
        }

        .front  { transform: translateZ(90px); }
        .back   { transform: translateZ(-90px) rotateY(180deg); }
        .left   { transform: rotateY(-90deg) translateZ(90px); }
        .right  { transform: rotateY(90deg) translateZ(90px); }
        .top    { transform: rotateX(90deg) translateZ(90px); }
        .bottom { transform: rotateX(-90deg) translateZ(90px); }

        /* Inner glowing core */
        .crystal-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle,
            rgba(112, 214, 255, 1) 0%,
            rgba(59, 130, 246, 0.8) 40%,
            transparent 70%
          );
          border-radius: 50%;
          animation: pulse-glow 2s ease-in-out infinite;
          filter: blur(4px);
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
        }

        /* Glow rings */
        .glow-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 2px solid rgba(112, 214, 255, 0.4);
          animation: expand-ring 3s ease-out infinite;
        }

        .ring-1 {
          width: 100px;
          height: 100px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 120px;
          height: 120px;
          animation-delay: 1s;
        }

        .ring-3 {
          width: 140px;
          height: 140px;
          animation-delay: 2s;
        }

        @keyframes expand-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        /* Energy particles orbiting */
        .energy-particles {
          position: absolute;
          inset: 0;
          z-index: 5;
        }

        .particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: #70d6ff;
          border-radius: 50%;
          box-shadow: 0 0 12px #70d6ff;
          animation: orbit 8s linear infinite;
        }

        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg);
            opacity: 0;
          }
        }

        /* Pulse animation on click */
        :global(.pulse-animation) {
          animation: magical-pulse 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        @keyframes magical-pulse {
          0% {
            transform: scale(1) rotateY(0deg);
          }
          30% {
            transform: scale(1.4) rotateY(180deg);
            filter: brightness(2) saturate(1.5);
          }
          60% {
            transform: scale(0.9) rotateY(360deg);
          }
          100% {
            transform: scale(1) rotateY(360deg);
            filter: brightness(1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .crystal-container {
            height: 300px;
          }

          .hextech-crystal {
            width: 120px;
            height: 120px;
          }

          .front  { transform: translateZ(60px); }
          .back   { transform: translateZ(-60px) rotateY(180deg); }
          .left   { transform: rotateY(-90deg) translateZ(60px); }
          .right  { transform: rotateY(90deg) translateZ(60px); }
          .top    { transform: rotateX(90deg) translateZ(60px); }
          .bottom { transform: rotateX(-90deg) translateZ(60px); }

          .crystal-core {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}
