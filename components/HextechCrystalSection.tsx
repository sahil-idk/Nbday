'use client';

import { useEffect, useRef, useState } from 'react';

export default function HextechCrystalSection() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const rotationRef = useRef({ x: 20, y: 0, z: 0 });
  const velocityRef = useRef({ x: 0.3, y: 0.5, z: 0.2 });
  const mouseRef = useRef({ startX: 0, startY: 0, currentX: 0, currentY: 0 });
  const animationFrameRef = useRef<number>();

  // Continuous rotation with random wobble
  useEffect(() => {
    let time = 0;

    const animate = () => {
      if (!cubeRef.current || isDragging) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 0.01;

      // Add random wobble
      const wobbleX = Math.sin(time * 2) * 5;
      const wobbleZ = Math.cos(time * 1.5) * 5;

      // Different rotation speeds based on hover
      const speedMultiplier = isHovered ? 3 : 1;

      rotationRef.current.x += velocityRef.current.x * speedMultiplier + wobbleX * 0.1;
      rotationRef.current.y += velocityRef.current.y * speedMultiplier;
      rotationRef.current.z += velocityRef.current.z * speedMultiplier + wobbleZ * 0.1;

      cubeRef.current.style.transform = `
        rotateX(${rotationRef.current.x}deg)
        rotateY(${rotationRef.current.y}deg)
        rotateZ(${rotationRef.current.z}deg)
      `;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, isDragging]);

  // Mouse drag controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    mouseRef.current.startX = e.clientX;
    mouseRef.current.startY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cubeRef.current) return;

    const deltaX = e.clientX - mouseRef.current.startX;
    const deltaY = e.clientY - mouseRef.current.startY;

    rotationRef.current.y += deltaX * 0.5;
    rotationRef.current.x += deltaY * 0.5;

    mouseRef.current.startX = e.clientX;
    mouseRef.current.startY = e.clientY;

    cubeRef.current.style.transform = `
      rotateX(${rotationRef.current.x}deg)
      rotateY(${rotationRef.current.y}deg)
      rotateZ(${rotationRef.current.z}deg)
    `;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center"
      data-section="hextech-crystal"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animation: `float-up ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Cube with Perspective */}
      <div
        className="cube-scene"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
      >
        <div ref={cubeRef} className={`cube ${isHovered ? 'hovered' : ''} ${isDragging ? 'dragging' : ''}`}>
          {/* Front Face */}
          <div className="cube-face front" />

          {/* Back Face */}
          <div className="cube-face back" />

          {/* Left Face */}
          <div className="cube-face left" />

          {/* Right Face */}
          <div className="cube-face right" />

          {/* Top Face */}
          <div className="cube-face top" />

          {/* Bottom Face */}
          <div className="cube-face bottom" />
        </div>

        {/* Glowing edges overlay */}
        <div className="edge-glow-container">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`edge-glow edge-${i}`} />
          ))}
        </div>
      </div>

      {/* Info Text */}
      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
        <p className="text-blue-300 text-lg font-bold mb-2">
          ✨ Hextech Crystal ✨
        </p>
        <p className="text-blue-400/70 text-sm">
          Drag to rotate • Hover for chaos
        </p>
      </div>

      <style jsx>{`
        .cube-scene {
          width: 300px;
          height: 300px;
          perspective: 1000px;
          cursor: grab;
          position: relative;
        }

        .cube-scene:active {
          cursor: grabbing;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: filter 0.3s ease;
        }

        .cube.hovered {
          filter: brightness(1.3) drop-shadow(0 0 40px rgba(59, 130, 246, 0.8));
        }

        .cube.dragging {
          filter: brightness(1.5) drop-shadow(0 0 50px rgba(59, 130, 246, 1));
        }

        .cube-face {
          position: absolute;
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.15) 0%,
            rgba(96, 165, 250, 0.25) 50%,
            rgba(37, 99, 235, 0.15) 100%
          );
          border: 2px solid rgba(96, 165, 250, 0.6);
          box-shadow:
            0 0 30px rgba(59, 130, 246, 0.4),
            inset 0 0 40px rgba(147, 197, 253, 0.2),
            inset 0 0 80px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
        }

        .cube.hovered .cube-face {
          border-color: rgba(96, 165, 250, 1);
          box-shadow:
            0 0 50px rgba(59, 130, 246, 0.8),
            inset 0 0 60px rgba(147, 197, 253, 0.4),
            inset 0 0 100px rgba(255, 255, 255, 0.2);
        }

        /* Position faces */
        .front  {
          transform: rotateY(0deg) translateZ(150px);
        }

        .back   {
          transform: rotateY(180deg) translateZ(150px);
        }

        .left   {
          transform: rotateY(-90deg) translateZ(150px);
        }

        .right  {
          transform: rotateY(90deg) translateZ(150px);
        }

        .top    {
          transform: rotateX(90deg) translateZ(150px);
        }

        .bottom {
          transform: rotateX(-90deg) translateZ(150px);
        }

        /* Edge glow effects */
        .edge-glow-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .edge-glow {
          position: absolute;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(96, 165, 250, 0.8) 50%,
            transparent 100%
          );
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.8);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Horizontal edges */
        .edge-0, .edge-1, .edge-2, .edge-3 {
          width: 300px;
          height: 3px;
        }

        .edge-0 { top: 0; left: 0; }
        .edge-1 { bottom: 0; left: 0; }
        .edge-2 { top: 50%; left: 0; transform: translateY(-50%); }
        .edge-3 { top: 50%; right: 0; transform: translateY(-50%); }

        /* Vertical edges */
        .edge-4, .edge-5, .edge-6, .edge-7 {
          width: 3px;
          height: 300px;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(96, 165, 250, 0.8) 50%,
            transparent 100%
          );
        }

        .edge-4 { top: 0; left: 0; }
        .edge-5 { top: 0; right: 0; }
        .edge-6 { top: 0; left: 50%; transform: translateX(-50%); }
        .edge-7 { bottom: 0; left: 50%; transform: translateX(-50%); }

        /* Diagonal edges */
        .edge-8, .edge-9, .edge-10, .edge-11 {
          width: 424px;
          height: 3px;
          transform-origin: left center;
        }

        .edge-8 {
          top: 0;
          left: 0;
          transform: rotate(45deg);
          animation-delay: 0.5s;
        }

        .edge-9 {
          top: 0;
          right: 0;
          transform: rotate(-45deg);
          transform-origin: right center;
          animation-delay: 1s;
        }

        .edge-10 {
          bottom: 0;
          left: 0;
          transform: rotate(-45deg);
          animation-delay: 1.5s;
        }

        .edge-11 {
          bottom: 0;
          right: 0;
          transform: rotate(45deg);
          transform-origin: right center;
          animation-delay: 2s;
        }

        /* Animations */
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cube-scene {
            width: 200px;
            height: 200px;
          }

          .cube-face {
            width: 200px;
            height: 200px;
          }

          .front  { transform: rotateY(0deg) translateZ(100px); }
          .back   { transform: rotateY(180deg) translateZ(100px); }
          .left   { transform: rotateY(-90deg) translateZ(100px); }
          .right  { transform: rotateY(90deg) translateZ(100px); }
          .top    { transform: rotateX(90deg) translateZ(100px); }
          .bottom { transform: rotateX(-90deg) translateZ(100px); }
        }
      `}</style>
    </section>
  );
}
