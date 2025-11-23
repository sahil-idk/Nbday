'use client';

import { useEffect, useRef, useState } from 'react';

export default function HextechCrystalSection() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Auto rotation
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      setRotateY(prev => prev + 0.5);
      setRotateX(prev => prev + 0.2);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    setRotateY(prev => prev + deltaX * 0.3);
    setRotateX(prev => prev - deltaY * 0.3);

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      className="relative w-full h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Scene */}
      <div
        className="scene"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          ref={cubeRef}
          className="cube"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          {/* Cube Faces */}
          <div className="face front">
            <div className="inner-glow" />
          </div>
          <div className="face back">
            <div className="inner-glow" />
          </div>
          <div className="face right">
            <div className="inner-glow" />
          </div>
          <div className="face left">
            <div className="inner-glow" />
          </div>
          <div className="face top">
            <div className="inner-glow" />
          </div>
          <div className="face bottom">
            <div className="inner-glow" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-10 text-center text-blue-300">
        <p className="text-lg font-bold">✨ Hextech Crystal ✨</p>
        <p className="text-sm text-blue-400/70 mt-2">Drag to rotate</p>
      </div>

      <style jsx>{`
        .scene {
          width: 400px;
          height: 400px;
          perspective: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cube {
          width: 250px;
          height: 250px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s linear;
        }

        .face {
          position: absolute;
          width: 250px;
          height: 250px;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.2),
            rgba(96, 165, 250, 0.3),
            rgba(37, 99, 235, 0.2)
          );
          border: 3px solid rgba(96, 165, 250, 0.7);
          box-shadow:
            0 0 40px rgba(59, 130, 246, 0.6),
            inset 0 0 60px rgba(147, 197, 253, 0.3);
          backdrop-filter: blur(10px);
        }

        .inner-glow {
          position: absolute;
          inset: 30px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 40%,
            transparent 70%
          );
          border-radius: 20%;
        }

        .front {
          transform: rotateY(0deg) translateZ(125px);
        }

        .back {
          transform: rotateY(180deg) translateZ(125px);
        }

        .right {
          transform: rotateY(90deg) translateZ(125px);
        }

        .left {
          transform: rotateY(-90deg) translateZ(125px);
        }

        .top {
          transform: rotateX(90deg) translateZ(125px);
        }

        .bottom {
          transform: rotateX(-90deg) translateZ(125px);
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .scene {
            width: 300px;
            height: 300px;
          }

          .cube {
            width: 180px;
            height: 180px;
          }

          .face {
            width: 180px;
            height: 180px;
          }

          .front { transform: rotateY(0deg) translateZ(90px); }
          .back { transform: rotateY(180deg) translateZ(90px); }
          .right { transform: rotateY(90deg) translateZ(90px); }
          .left { transform: rotateY(-90deg) translateZ(90px); }
          .top { transform: rotateX(90deg) translateZ(90px); }
          .bottom { transform: rotateX(-90deg) translateZ(90px); }
        }
      `}</style>
    </section>
  );
}
