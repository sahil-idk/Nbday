'use client';

import { useState, useRef } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';

export default function BirthdayMessage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Set start time on first play
        if (!hasStarted.current && content.birthdayMessage.startTime) {
          audioRef.current.currentTime = content.birthdayMessage.startTime;
          hasStarted.current = true;
        }
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="section" data-section="birthday">
      <div className="container-custom">
        <div className="max-w-2xl">
          {/* Left-aligned content */}
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading mb-8 text-white">
              {content.birthdayMessage.heading}
            </h2>

            {/* Audio Player */}
            <div className="mb-8">
              <div className="card bg-primary-900/30 backdrop-blur-sm border border-primary-600/30">
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={handlePlayPause}
                    className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-600/80 hover:bg-primary-500 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-lg truncate">
                      {content.birthdayMessage.songTitle}
                    </p>
                    <p className="text-sm text-primary-300 truncate">
                      {content.birthdayMessage.songArtist}
                    </p>
                  </div>

                  {/* Visualizer Animation */}
                  {isPlaying && (
                    <div className="flex gap-1 items-end h-12">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-primary-400 rounded-full"
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

              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src={content.birthdayMessage.songUrl}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />
            </div>

            {/* Message Paragraphs */}
            <div className="space-y-4">
              {content.birthdayMessage.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-100 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
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
