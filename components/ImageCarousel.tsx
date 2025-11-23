'use client';

import { useState, useEffect, useRef } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = content.carousel.images;

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 4000); // Change image every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <section className="section" data-section="playlist">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading mb-3">
              {content.carousel.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-primary-300">
              {content.carousel.subtitle}
            </p>
          </div>

          {/* Carousel Container */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-arcane-gold/30 bg-primary-900/30 backdrop-blur-sm">
              {/* Birthday Confetti Effect */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full opacity-50"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: ['#3b82f6', '#d4af37', '#60a5fa', '#c084fc'][Math.floor(Math.random() * 4)],
                      animation: `float-confetti ${3 + Math.random() * 2}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Image Display */}
              <div className="relative aspect-[16/11] md:aspect-[16/10]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentIndex
                        ? 'opacity-100 scale-100'
                        : direction === 'right'
                        ? index === (currentIndex - 1 + images.length) % images.length
                          ? 'opacity-0 -translate-x-full scale-95'
                          : 'opacity-0 translate-x-full scale-95'
                        : index === (currentIndex + 1) % images.length
                        ? 'opacity-0 translate-x-full scale-95'
                        : 'opacity-0 -translate-x-full scale-95'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-2xl"
                    />

                    {/* Image Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-950/90 via-primary-950/60 to-transparent p-4 md:p-5 rounded-b-2xl">
                      <p className="text-base sm:text-lg md:text-xl font-heading text-white mb-1">
                        {image.caption}
                      </p>
                      {image.series && (
                        <p className="text-xs sm:text-sm text-primary-300">
                          From: {image.series}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary-900/80 backdrop-blur-md border border-primary-600/50 flex items-center justify-center hover:bg-primary-800/90 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-arcane-gold"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary-900/80 backdrop-blur-md border border-primary-600/50 flex items-center justify-center hover:bg-primary-800/90 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-arcane-gold"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full focus:outline-none ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-arcane-gold'
                      : 'w-3 h-3 bg-primary-600 hover:bg-primary-500'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-6">
              <p className="text-sm text-primary-400">
                {isHovered ? '⏸️ Paused' : '▶️ Auto-playing'} • {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Birthday Decoration */}
          <div className="flex justify-center gap-4 mt-8">
            {['🎂', '🎉', '🎁', '✨', '💙'].map((emoji, i) => (
              <div
                key={i}
                className="text-3xl md:text-4xl"
                style={{
                  animation: `bounce-emoji ${1 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-confetti {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
          }
        }

        @keyframes bounce-emoji {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
      `}</style>
      <ScrollArrow />
    </section>
  );
}
