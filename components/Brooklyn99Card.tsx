'use client';

import { useState } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';

export default function Brooklyn99Card() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setShowResult(true);

    // Reset after 5 seconds
    setTimeout(() => {
      setShowResult(false);
      setSelectedOption(null);
    }, 5000);
  };

  return (
    <section className="section" data-section="brooklyn99">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-heading mb-4">
                {content.brooklyn99.title}
              </h2>
              <p className="text-primary-300 text-lg">
                {content.brooklyn99.question}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {content.brooklyn99.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedOption === index
                      ? 'border-primary-500 bg-primary-800/50 scale-105'
                      : 'border-primary-700/50 hover:border-primary-600 hover:bg-primary-800/30'
                  }`}
                  disabled={showResult}
                >
                  <p className="font-medium text-lg">{option.text}</p>
                </button>
              ))}
            </div>

            {/* Result */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                showResult ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {selectedOption !== null && (
                <div className="bg-primary-800/50 rounded-xl p-6 border border-primary-600/50">
                  <p className="text-lg text-center text-primary-200">
                    {content.brooklyn99.options[selectedOption].result}
                  </p>
                </div>
              )}
            </div>

            {/* Fun line */}
            <div className="mt-8 text-center">
              <p className="text-primary-400 italic">
                {content.brooklyn99.funLine}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScrollArrow />
    </section>
  );
}
