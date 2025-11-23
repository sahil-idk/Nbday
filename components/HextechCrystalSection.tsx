'use client';

import { useEffect, useRef, useState } from 'react';

export default function HextechCrystalSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const crystalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !crystalRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      crystalRef.current.style.setProperty('--mouse-x', `${x * 20}deg`);
      crystalRef.current.style.setProperty('--mouse-y', `${-y * 20}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 800);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950"
      data-section="hextech-crystal"
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${10 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Crystal Container - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={crystalRef}
          className={`crystal-wrapper ${isHovered ? 'hovered' : ''} ${isPulsing ? 'pulsing' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          {/* Outer Glow Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glow-ring glow-ring-1" />
            <div className="glow-ring glow-ring-2" />
            <div className="glow-ring glow-ring-3" />
          </div>

          {/* 3D Crystal Polyhedron */}
          <div className="crystal-container">
            {/* Front Face */}
            <div className="crystal-face front">
              <div className="face-inner" />
            </div>

            {/* Back Face */}
            <div className="crystal-face back">
              <div className="face-inner" />
            </div>

            {/* Left Face */}
            <div className="crystal-face left">
              <div className="face-inner" />
            </div>

            {/* Right Face */}
            <div className="crystal-face right">
              <div className="face-inner" />
            </div>

            {/* Top Face */}
            <div className="crystal-face top">
              <div className="face-inner" />
            </div>

            {/* Bottom Face */}
            <div className="crystal-face bottom">
              <div className="face-inner" />
            </div>

            {/* Corner Pyramids for Geodesic Effect */}
            <div className="crystal-face corner-tl">
              <div className="face-inner" />
            </div>
            <div className="crystal-face corner-tr">
              <div className="face-inner" />
            </div>
            <div className="crystal-face corner-bl">
              <div className="face-inner" />
            </div>
            <div className="crystal-face corner-br">
              <div className="face-inner" />
            </div>

            {/* Edge Pyramids */}
            <div className="crystal-face edge-t">
              <div className="face-inner" />
            </div>
            <div className="crystal-face edge-b">
              <div className="face-inner" />
            </div>
            <div className="crystal-face edge-l">
              <div className="face-inner" />
            </div>
            <div className="crystal-face edge-r">
              <div className="face-inner" />
            </div>
          </div>

          {/* Energy Particles Orbiting */}
          <div className="orbit-container">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="energy-particle"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="absolute bottom-20 left-0 right-0 text-center z-10">
        <p className="text-primary-300 text-sm sm:text-base animate-pulse-slow">
          ✨ Hover and click the Hextech crystal ✨
        </p>
      </div>

      <style jsx>{`
        .crystal-wrapper {
          position: relative;
          width: 300px;
          height: 300px;
          perspective: 1200px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .crystal-wrapper.hovered {
          transform: scale(1.1);
        }

        .glow-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          animation: expand-ring 3s ease-out infinite;
        }

        .glow-ring-1 {
          width: 200px;
          height: 200px;
          animation-delay: 0s;
        }

        .glow-ring-2 {
          width: 200px;
          height: 200px;
          animation-delay: 1s;
        }

        .glow-ring-3 {
          width: 200px;
          height: 200px;
          animation-delay: 2s;
        }

        .crystal-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) rotateX(20deg) rotateY(20deg);
          animation: float-rotate 8s ease-in-out infinite;
        }

        .crystal-wrapper.hovered .crystal-container {
          animation: float-rotate-hover 8s ease-in-out infinite;
        }

        .crystal-wrapper.pulsing .crystal-container {
          animation: pulse-crystal 0.8s ease-out;
        }

        .crystal-face {
          position: absolute;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.4) 0%,
            rgba(37, 99, 235, 0.6) 50%,
            rgba(29, 78, 216, 0.4) 100%
          );
          border: 1px solid rgba(147, 197, 253, 0.3);
          box-shadow:
            0 0 30px rgba(59, 130, 246, 0.4),
            inset 0 0 30px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .crystal-wrapper.hovered .crystal-face {
          box-shadow:
            0 0 60px rgba(59, 130, 246, 0.8),
            inset 0 0 40px rgba(255, 255, 255, 0.2);
        }

        .face-inner {
          position: absolute;
          inset: 20px;
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          border-radius: 10%;
        }

        /* Main Cube Faces */
        .front  { transform: translateZ(75px); }
        .back   { transform: translateZ(-75px) rotateY(180deg); }
        .left   { transform: rotateY(-90deg) translateZ(75px); }
        .right  { transform: rotateY(90deg) translateZ(75px); }
        .top    { transform: rotateX(90deg) translateZ(75px); }
        .bottom { transform: rotateX(-90deg) translateZ(75px); }

        /* Corner Pyramids for Geodesic Effect */
        .corner-tl {
          width: 75px;
          height: 75px;
          transform: translate(-37.5px, -37.5px) rotateX(45deg) rotateY(45deg) translateZ(106px);
        }

        .corner-tr {
          width: 75px;
          height: 75px;
          transform: translate(112.5px, -37.5px) rotateX(45deg) rotateY(-45deg) translateZ(106px);
        }

        .corner-bl {
          width: 75px;
          height: 75px;
          transform: translate(-37.5px, 112.5px) rotateX(-45deg) rotateY(45deg) translateZ(106px);
        }

        .corner-br {
          width: 75px;
          height: 75px;
          transform: translate(112.5px, 112.5px) rotateX(-45deg) rotateY(-45deg) translateZ(106px);
        }

        /* Edge Pyramids */
        .edge-t {
          width: 150px;
          height: 50px;
          transform: translateY(-25px) rotateX(45deg) translateZ(106px);
        }

        .edge-b {
          width: 150px;
          height: 50px;
          transform: translateY(125px) rotateX(-45deg) translateZ(106px);
        }

        .edge-l {
          width: 50px;
          height: 150px;
          transform: translateX(-25px) rotateY(45deg) translateZ(106px);
        }

        .edge-r {
          width: 50px;
          height: 150px;
          transform: translateX(125px) rotateY(-45deg) translateZ(106px);
        }

        /* Orbit Container */
        .orbit-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
        }

        .energy-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(96, 165, 250, 1) 0%, rgba(59, 130, 246, 0) 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          animation: orbit 4s linear infinite;
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.8);
        }

        /* Animations */
        @keyframes float-rotate {
          0%, 100% {
            transform: translate(-50%, -50%)
              rotateX(calc(20deg + var(--mouse-y, 0deg)))
              rotateY(calc(0deg + var(--mouse-x, 0deg)))
              translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%)
              rotateX(calc(20deg + var(--mouse-y, 0deg)))
              rotateY(calc(180deg + var(--mouse-x, 0deg)))
              translateY(-20px);
          }
        }

        @keyframes float-rotate-hover {
          0%, 100% {
            transform: translate(-50%, -50%)
              rotateX(calc(30deg + var(--mouse-y, 0deg)))
              rotateY(calc(0deg + var(--mouse-x, 0deg)))
              translateY(-10px);
          }
          50% {
            transform: translate(-50%, -50%)
              rotateX(calc(30deg + var(--mouse-y, 0deg)))
              rotateY(calc(180deg + var(--mouse-x, 0deg)))
              translateY(-30px);
          }
        }

        @keyframes pulse-crystal {
          0%, 100% {
            transform: translate(-50%, -50%)
              rotateX(20deg) rotateY(20deg) scale(1);
            filter: brightness(1);
          }
          50% {
            transform: translate(-50%, -50%)
              rotateX(20deg) rotateY(20deg) scale(1.2);
            filter: brightness(1.5) drop-shadow(0 0 40px rgba(59, 130, 246, 0.8));
          }
        }

        @keyframes expand-ring {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes orbit {
          0% {
            transform: rotateZ(0deg) translateX(150px) rotateZ(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: rotateZ(360deg) translateX(150px) rotateZ(-360deg);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes float-particle {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .crystal-wrapper {
            width: 200px;
            height: 200px;
          }

          .crystal-container {
            width: 100px;
            height: 100px;
          }

          .crystal-face {
            width: 100px;
            height: 100px;
          }

          .front  { transform: translateZ(50px); }
          .back   { transform: translateZ(-50px) rotateY(180deg); }
          .left   { transform: rotateY(-90deg) translateZ(50px); }
          .right  { transform: rotateY(90deg) translateZ(50px); }
          .top    { transform: rotateX(90deg) translateZ(50px); }
          .bottom { transform: rotateX(-90deg) translateZ(50px); }
        }
      `}</style>
    </section>
  );
}
