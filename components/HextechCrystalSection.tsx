'use client';

import { useState } from 'react';

export default function HextechCrystalSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center"
      data-section="hextech-crystal"
    >
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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

      {/* Simple 3D Cube */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <div
          className={`cube-container ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="cube">
            {/* Front Face - Bright Blue */}
            <div className="cube-face front">
              <div className="face-label">FRONT</div>
            </div>

            {/* Back Face - Purple */}
            <div className="cube-face back">
              <div className="face-label">BACK</div>
            </div>

            {/* Left Face - Cyan */}
            <div className="cube-face left">
              <div className="face-label">LEFT</div>
            </div>

            {/* Right Face - Teal */}
            <div className="cube-face right">
              <div className="face-label">RIGHT</div>
            </div>

            {/* Top Face - Light Blue */}
            <div className="cube-face top">
              <div className="face-label">TOP</div>
            </div>

            {/* Bottom Face - Dark Blue */}
            <div className="cube-face bottom">
              <div className="face-label">BOTTOM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-white text-lg font-bold">
          ✨ Testing 3D Cube - Hover to see it ✨
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Should see a rotating cube with labeled faces
        </p>
      </div>

      <style jsx>{`
        .cube-container {
          width: 250px;
          height: 250px;
          position: relative;
          cursor: pointer;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-cube 10s linear infinite;
        }

        .cube-container.hovered .cube {
          animation: rotate-cube-fast 3s linear infinite;
        }

        .cube-face {
          position: absolute;
          width: 250px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: white;
          border: 3px solid rgba(255, 255, 255, 0.8);
          box-shadow:
            0 0 20px rgba(59, 130, 246, 0.5),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .face-label {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
          font-size: 32px;
          letter-spacing: 4px;
        }

        /* Different colors for each face */
        .front {
          background: rgba(59, 130, 246, 0.9);
          transform: rotateY(0deg) translateZ(125px);
        }

        .back {
          background: rgba(139, 92, 246, 0.9);
          transform: rotateY(180deg) translateZ(125px);
        }

        .left {
          background: rgba(6, 182, 212, 0.9);
          transform: rotateY(-90deg) translateZ(125px);
        }

        .right {
          background: rgba(20, 184, 166, 0.9);
          transform: rotateY(90deg) translateZ(125px);
        }

        .top {
          background: rgba(96, 165, 250, 0.9);
          transform: rotateX(90deg) translateZ(125px);
        }

        .bottom {
          background: rgba(30, 64, 175, 0.9);
          transform: rotateX(-90deg) translateZ(125px);
        }

        /* Animations */
        @keyframes rotate-cube {
          0% {
            transform: rotateX(20deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(20deg) rotateY(360deg);
          }
        }

        @keyframes rotate-cube-fast {
          0% {
            transform: rotateX(30deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(30deg) rotateY(360deg) rotateZ(20deg);
          }
        }

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
