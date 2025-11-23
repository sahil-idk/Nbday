'use client';

import content from '@/content.json';

export default function Footer() {
  return (
    <footer className="relative border-t border-primary-800/50" data-section="footer">
      <div className="container-custom py-16">
        {/* Main message */}
        <div className="text-center mb-12">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-primary-200 max-w-3xl mx-auto leading-relaxed px-4">
            {content.footer.message}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary-700" />
          <div className="w-2 h-2 rounded-full bg-arcane-gold" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary-700" />
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <a
            href={content.footer.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>View Source</span>
          </a>

          <div className="hidden sm:block w-1 h-1 rounded-full bg-primary-700" />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Back to Top</span>
          </button>
        </div>

        {/* Built by */}
        <div className="text-center">
          <p className="text-sm text-primary-500">
            {content.footer.builtBy}
          </p>
        </div>

        {/* Decorative hearts */}
        <div className="flex justify-center gap-3 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="text-2xl"
              style={{
                animation: `heartbeat ${1.5 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              💙
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
        }
      `}</style>
    </footer>
  );
}
