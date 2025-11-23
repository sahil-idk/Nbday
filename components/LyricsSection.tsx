'use client';

import { useState, useRef, useEffect } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';

export default function LyricsSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
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

  // Update current lyric based on audio time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateLyric = () => {
      const currentTime = audio.currentTime;
      const lyrics = content.lyricsSection.lyrics;

      // Find the current lyric based on time
      let index = -1;
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (currentTime >= lyrics[i].startTime) {
          index = i;
          break;
        }
      }
      setCurrentLyricIndex(index);
    };

    audio.addEventListener('timeupdate', updateLyric);
    return () => audio.removeEventListener('timeupdate', updateLyric);
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
              className={`text-5xl md:text-7xl font-heading mb-6 text-white transition-all duration-1000 ${
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
              <div className="flex items-center gap-4 mb-6">
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
                  <p className="font-medium text-white text-lg truncate">
                    {content.lyricsSection.songTitle}
                  </p>
                  <p className="text-sm text-primary-200 truncate">
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

          {/* Lyrics Display with Fade Animation */}
          <div className="space-y-6 min-h-[400px] flex flex-col justify-center">
            {content.lyricsSection.lyrics.map((lyric, index) => (
              <p
                key={index}
                className={`text-2xl md:text-4xl font-heading text-center text-white transition-all duration-1000 ${
                  index <= currentLyricIndex
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95'
                }`}
                style={{
                  lineHeight: '1.6',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {lyric.text}
              </p>
            ))}
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
