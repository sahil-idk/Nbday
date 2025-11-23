'use client';

import { useEffect, useState, useRef } from 'react';

interface BackgroundConfig {
  id: string;
  image: string;
  gradient?: string;
  isAnimated?: boolean;
}

const backgrounds: BackgroundConfig[] = [
  {
    id: 'hero',
    image: '/backgrounds/hero.gif',
    gradient: 'linear-gradient(180deg, rgba(23, 37, 84, 0.6) 0%, rgba(30, 64, 175, 0.5) 100%)',
    isAnimated: true,
  },
  {
    id: 'arcane',
    image: '/backgrounds/arcane.gif',
    gradient: 'linear-gradient(135deg, rgba(10, 22, 40, 0.5) 0%, rgba(30, 58, 138, 0.4) 100%)', // Lighter
    isAnimated: true,
  },
  {
    id: 'brooklyn99',
    image: '/backgrounds/brooklyn99.gif',
    gradient: 'linear-gradient(180deg, rgba(30, 58, 138, 0.4) 0%, rgba(59, 130, 246, 0.35) 100%)', // Lighter
    isAnimated: true,
  },
  {
    id: 'birthday',
    image: '/backgrounds/gallery.gif',
    gradient: 'linear-gradient(180deg, rgba(23, 37, 84, 0.35) 0%, rgba(30, 64, 175, 0.3) 100%)', // Much lighter
    isAnimated: true,
  },
  {
    id: 'shayari',
    image: '/backgrounds/shayari.gif',
    gradient: 'linear-gradient(180deg, rgba(23, 37, 84, 0.4) 0%, rgba(30, 58, 138, 0.35) 100%)', // Lighter
    isAnimated: true,
  },
  {
    id: 'playlist',
    image: '/backgrounds/playlist.gif',
    gradient: 'linear-gradient(180deg, rgba(30, 58, 138, 0.4) 0%, rgba(59, 130, 246, 0.35) 100%)', // Lighter
    isAnimated: true,
  },
  {
    id: 'date',
    image: '/backgrounds/date.gif',
    gradient: 'linear-gradient(135deg, rgba(30, 58, 138, 0.45) 0%, rgba(139, 40, 92, 0.4) 100%)', // Lighter blue to reddish
    isAnimated: true,
  },
  {
    id: 'footer',
    image: '/backgrounds/footer.gif',
    gradient: 'linear-gradient(180deg, rgba(139, 40, 92, 0.5) 0%, rgba(190, 24, 93, 0.55) 100%)', // Lighter VI tones
    isAnimated: true,
  },
];

export default function BackgroundTransition() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Get all sections
    const sections = Array.from(document.querySelectorAll('[data-section]'));
    sectionsRef.current = sections as HTMLElement[];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Find which section is currently in view
      let currentSection = 0;
      let progress = 0;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          currentSection = i;

          // Calculate progress through this section (0 to 1)
          progress = (scrollPosition - sectionTop) / rect.height;
          break;
        } else if (scrollPosition < sectionTop) {
          currentSection = Math.max(0, i - 1);
          break;
        } else if (i === sections.length - 1) {
          currentSection = i;
        }
      }

      setActiveIndex(currentSection);

      // Set next index for smooth transition
      const next = Math.min(currentSection + 1, backgrounds.length - 1);
      setNextIndex(next);

      // Smooth transition progress
      setTransitionProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Current background */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: 1 - transitionProgress * 0.5,
        }}
      >
        {/* Background image/GIF */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgrounds[activeIndex].image}')`,
            backgroundColor: '#1e3a8a', // Fallback color if image doesn't load
          }}
        />

        {/* Gradient overlay - lighter for GIFs to show animation */}
        <div
          className="absolute inset-0"
          style={{
            background: backgrounds[activeIndex].gradient,
          }}
        />
      </div>

      {/* Next background (for smooth transition) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: transitionProgress * 0.5,
        }}
      >
        {/* Background image/GIF */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgrounds[nextIndex].image}')`,
            backgroundColor: '#2563eb', // Fallback color if image doesn't load
          }}
        />

        {/* Gradient overlay - lighter for GIFs to show animation */}
        <div
          className="absolute inset-0"
          style={{
            background: backgrounds[nextIndex].gradient,
          }}
        />
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translate(10px, -30px);
            opacity: 0.1;
          }
          75% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
