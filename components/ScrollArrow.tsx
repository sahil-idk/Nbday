'use client';

interface ScrollArrowProps {
  className?: string;
}

export default function ScrollArrow({ className = '' }: ScrollArrowProps) {
  const scrollToNext = () => {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const nextSection = Math.ceil(currentScroll / windowHeight) * windowHeight;

    window.scrollTo({
      top: nextSection + windowHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 ${className}`}>
      <button
        onClick={scrollToNext}
        className="group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all duration-300"
        aria-label="Scroll to next section"
      >
        <span className="text-sm font-medium opacity-80 group-hover:opacity-100">
          Scroll
        </span>
        <div className="relative">
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          {/* Glow effect */}
          <div className="absolute inset-0 blur-md opacity-50 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
