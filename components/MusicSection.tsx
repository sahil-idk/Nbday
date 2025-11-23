'use client';

import { useState, useRef, useEffect } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoPlayed = useRef(false);

  // Autoplay when entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoPlayed.current) {
          // Show title animation first
          setShowTitle(true);

          // Start playing after title animation
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.play().catch(err => {
                console.log('Autoplay prevented:', err);
                // Autoplay might be blocked by browser, user can click play
              });
              hasAutoPlayed.current = true;
            }
          }, 2000); // Wait 2s for title animation
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden"
      data-section="shayari"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className="text-center mb-12">
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading mb-6 text-white transition-all duration-1000 ${
                showTitle
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-10'
              }`}
            >
              {content.lyricsSection.title}
            </h2>
          </div>

          {/* Very Transparent Music Player */}
          <div className="mb-12">
            <div className="backdrop-blur-sm bg-primary-900/10 border border-primary-400/20 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="flex-shrink-0 w-14 h-14 rounded-full bg-primary-600/40 hover:bg-primary-500/60 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-base sm:text-lg truncate">
                    {content.lyricsSection.songTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-primary-200 truncate">
                    {content.lyricsSection.songArtist}
                  </p>
                </div>

                {/* Visualizer */}
                {isPlaying && (
                  <div className="flex gap-1 items-end h-10">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-arcane-gold rounded-full"
                        style={{
                          animation: `wave ${0.5 + i * 0.1}s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={content.lyricsSection.songUrl}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            height: 20%;
          }
          50% {
            height: 100%;
          }
        }
      `}</style>
      <ScrollArrow />
    </section>
  );
}
