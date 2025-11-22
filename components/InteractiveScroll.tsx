'use client';

import { useState, useRef, useEffect } from 'react';
import content from '@/content.json';

export default function InteractiveScroll() {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isDragging) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const scrollProgress = Math.min(Math.max(scrolled / sectionHeight, 0), 1);

      setProgress(scrollProgress * 100);

      // Update current location based on progress
      const locationIndex = Math.floor(scrollProgress * content.interactiveScroll.locations.length);
      setCurrentLocation(Math.min(locationIndex, content.interactiveScroll.locations.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProgress(value);

    const locationIndex = Math.floor((value / 100) * content.interactiveScroll.locations.length);
    setCurrentLocation(Math.min(locationIndex, content.interactiveScroll.locations.length - 1));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <section ref={sectionRef} className="section relative overflow-hidden" data-section="journey">
      {/* Background waves */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d={`M0,${500 + Math.sin(progress / 10) * 100} Q250,${400 + Math.sin(progress / 15) * 80} 500,${500 + Math.sin(progress / 12) * 100} T1000,${500 + Math.sin(progress / 10) * 100} V1000 H0 Z`}
            fill="currentColor"
            className="text-primary-600"
          />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-heading mb-4">
            {content.interactiveScroll.title}
          </h2>
          <p className="text-xl text-primary-300">
            {content.interactiveScroll.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Interactive journey map */}
          <div className="card p-8">
            {/* Progress track */}
            <div ref={trackRef} className="relative h-32 mb-8">
              {/* Track line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary-700 -translate-y-1/2 rounded-full" />

              {/* Progress line */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary-500 to-arcane-gold -translate-y-1/2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />

              {/* Location markers */}
              {content.interactiveScroll.locations.map((location, index) => (
                <div
                  key={index}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${location.position}%` }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      progress >= location.position
                        ? 'bg-arcane-gold border-arcane-gold scale-125'
                        : 'bg-primary-800 border-primary-600'
                    }`}
                  />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        progress >= location.position
                          ? 'text-arcane-gold font-medium'
                          : 'text-primary-400'
                      }`}
                    >
                      {location.name}
                    </p>
                  </div>
                </div>
              ))}

              {/* Boat icon */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
                style={{ left: `${progress}%` }}
              >
                <div className="text-4xl transform -translate-y-2">
                  🚗
                </div>
              </div>
            </div>

            {/* Slider control */}
            <div className="mt-12">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSliderChange}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="w-full h-2 bg-primary-700 rounded-full appearance-none cursor-pointer slider"
                aria-label="Journey progress slider"
              />
            </div>

            {/* Current location display */}
            <div className="mt-6 text-center">
              <p className="text-lg text-primary-300">
                Currently at:{' '}
                <span className="text-arcane-gold font-medium">
                  {content.interactiveScroll.locations[currentLocation]?.name}
                </span>
              </p>
            </div>

            {/* Easter egg audio */}
            <div className="mt-8 flex justify-center gap-4">
              {['🎵', '💙', '🌙'].map((emoji, index) => (
                <button
                  key={index}
                  className="text-3xl hover:scale-125 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
                  onClick={() => {
                    // Placeholder for audio - user can add later
                    console.log(`Easter egg ${index + 1} clicked!`);
                  }}
                  aria-label={`Easter egg ${index + 1}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #d4af37);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #d4af37);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </section>
  );
}
