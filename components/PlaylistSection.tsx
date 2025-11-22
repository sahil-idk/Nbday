'use client';

import { useState } from 'react';
import content from '@/content.json';

export default function PlaylistSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<number | null>(null);

  const handlePlaySong = (index: number) => {
    if (currentSong === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(index);
      setIsPlaying(true);
    }
  };

  return (
    <section className="section bg-primary-900">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-heading mb-4">
              {content.playlist.title}
            </h2>
            <p className="text-xl text-primary-300">
              {content.playlist.subtitle}
            </p>
          </div>

          <div className="card">
            <div className="space-y-3">
              {content.playlist.songs.map((song, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    currentSong === index
                      ? 'bg-primary-700/50 border-l-4 border-arcane-gold'
                      : 'bg-primary-800/30 hover:bg-primary-700/30'
                  }`}
                  onClick={() => handlePlaySong(index)}
                >
                  {/* Play button */}
                  <button
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-500 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label={`Play ${song.name}`}
                  >
                    {currentSong === index && isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Song info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-100 truncate">
                      {song.name}
                    </p>
                    <p className="text-sm text-primary-400 truncate">
                      {song.artist}
                    </p>
                  </div>

                  {/* Visualizer bars when playing */}
                  {currentSong === index && isPlaying && (
                    <div className="flex gap-1 items-end h-8">
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

                  {/* Track number */}
                  <div className="text-primary-500 text-sm font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>

            {/* Note about audio */}
            <div className="mt-6 p-4 bg-primary-800/30 rounded-xl border border-primary-700/50">
              <p className="text-sm text-primary-400 text-center">
                🎵 Add your actual song URLs to the content.json file to enable playback
              </p>
            </div>

            {/* Mood tags */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['Late Night Drives', 'Cozy Vibes', 'Road Trip', 'Chill Mode'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-primary-800/50 text-primary-300 text-sm rounded-full border border-primary-700/50"
                >
                  {tag}
                </span>
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
    </section>
  );
}
