'use client';

import { useState, useRef, useEffect } from 'react';
import content from '@/content.json';

export default function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section" data-section="gallery">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading mb-4">
            {content.memoryGallery.title}
          </h2>
          <p className="text-xl text-primary-300">
            {content.memoryGallery.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.memoryGallery.photos.map((photo, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="group cursor-pointer"
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-primary-800/50 border border-primary-700/50 hover:border-primary-500/50 transition-all duration-300 hover:scale-105">
                  {/* Placeholder for photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-800 to-primary-900">
                    <div className="text-center p-6">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs text-primary-400">Photo {index + 1}</p>
                    </div>
                  </div>

                  {/* Caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-950 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm text-primary-200">{photo.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                className="absolute -top-12 right-0 text-white hover:text-primary-400 transition-colors"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="bg-primary-900 rounded-2xl p-6">
                <div className="aspect-video bg-gradient-to-br from-primary-800 to-primary-900 rounded-xl mb-4 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-center text-primary-200">
                  {content.memoryGallery.photos[selectedPhoto].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
