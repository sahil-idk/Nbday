'use client';

import { useState } from 'react';
import content from '@/content.json';
import ScrollArrow from '@/components/ScrollArrow';

type QuizState = 'intro' | 'quiz' | 'results';
type PersonalityScores = {
  ultraOrganized: number;
  spreadsheetQueen: number;
  reformationCaptain: number;
  laidBackSantiago: number;
};

export default function AmySantiagoQuiz() {
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<PersonalityScores>({
    ultraOrganized: 0,
    spreadsheetQueen: 0,
    reformationCaptain: 0,
    laidBackSantiago: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = content.amyQuiz.questions;
  const personalities = content.amyQuiz.personalities;

  const handleStartQuiz = () => {
    setQuizState('quiz');
    setCurrentQuestion(0);
    setScores({
      ultraOrganized: 0,
      spreadsheetQueen: 0,
      reformationCaptain: 0,
      laidBackSantiago: 0,
    });
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);

    // Add points based on answer
    const answer = questions[currentQuestion].answers[answerIndex];
    const newScores = { ...scores };
    newScores[answer.type as keyof PersonalityScores] += answer.points;
    setScores(newScores);

    // Move to next question after a brief delay
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz complete!
        setQuizState('results');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 800);
  };

  const getTopPersonality = () => {
    const maxScore = Math.max(...Object.values(scores));
    const topType = Object.keys(scores).find(
      key => scores[key as keyof PersonalityScores] === maxScore
    ) as keyof PersonalityScores;

    return personalities.find(p => p.type === topType) || personalities[0];
  };

  const handleRestart = () => {
    setQuizState('intro');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  return (
    <section className="section relative overflow-hidden" data-section="brooklyn99">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#3b82f6', '#d4af37', '#60a5fa', '#fbbf24', '#10b981'][Math.floor(Math.random() * 5)],
                animation: `confetti-fall ${2 + Math.random() * 3}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* INTRO STATE */}
          {quizState === 'intro' && (
            <div className="card">
              <div className="text-center">
                <div className="text-4xl md:text-5xl mb-4">📋</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading mb-4">
                  {content.amyQuiz.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-primary-200 mb-6 max-w-xl mx-auto">
                  {content.amyQuiz.subtitle}
                </p>

                {/* Character Intro */}
                <div className="bg-primary-800/50 rounded-xl p-4 mb-6 border-l-4 border-arcane-gold">
                  <p className="text-base italic text-primary-100 mb-2">
                    &quot;{content.amyQuiz.amyIntro}&quot;
                  </p>
                  <p className="text-xs text-primary-400">— Amy Santiago</p>
                </div>

                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-arcane-gold hover:bg-yellow-500 text-primary-950 font-bold rounded-full text-base transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  Start the Quiz! 🎂
                </button>

                <p className="text-sm text-primary-400 mt-4">
                  {questions.length} questions • Takes less than 3 minutes
                </p>
              </div>
            </div>
          )}

          {/* QUIZ STATE */}
          {quizState === 'quiz' && (
            <div className="card">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-primary-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-arcane-gold font-medium">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-primary-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-arcane-gold transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-heading mb-4 text-center">
                  {questions[currentQuestion].question}
                </h3>

                {/* Character Comment */}
                {questions[currentQuestion].characterComment && (
                  <div className="bg-primary-900/50 rounded-lg p-3 mb-4 border border-primary-700/50">
                    <p className="text-xs sm:text-sm italic text-primary-300">
                      <span className="font-bold text-arcane-gold">
                        {questions[currentQuestion].characterComment.character}:
                      </span>{' '}
                      &quot;{questions[currentQuestion].characterComment.text}&quot;
                    </p>
                  </div>
                )}

                {/* Answers */}
                <div className="space-y-2">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedAnswer === index
                          ? 'border-arcane-gold bg-arcane-gold/20 scale-105 shadow-lg'
                          : 'border-primary-700/50 hover:border-primary-600 hover:bg-primary-800/30 hover:scale-102'
                      } ${selectedAnswer !== null && selectedAnswer !== index ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{answer.emoji}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm sm:text-base text-primary-100">
                            {answer.text}
                          </p>
                          {answer.subtext && (
                            <p className="text-xs text-primary-400 mt-1">{answer.subtext}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESULTS STATE */}
          {quizState === 'results' && (
            <div className="card">
              <div className="text-center">
                {/* Result Badge */}
                <div className="inline-block bg-arcane-gold/20 border-2 border-arcane-gold rounded-full px-4 py-1.5 mb-4">
                  <p className="text-arcane-gold font-bold text-xs sm:text-sm uppercase tracking-wide">
                    Case Closed!
                  </p>
                </div>

                {/* Personality Type */}
                <div className="text-4xl md:text-5xl mb-3">
                  {getTopPersonality().emoji}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading mb-3 text-arcane-gold">
                  {getTopPersonality().title}
                </h2>

                {/* Amy's Message */}
                <div className="bg-primary-900/70 rounded-xl p-4 sm:p-5 mb-4 border-l-4 border-arcane-gold">
                  <p className="text-base sm:text-lg text-primary-100 mb-3 leading-relaxed">
                    {getTopPersonality().description}
                  </p>
                  <p className="text-sm sm:text-base font-medium text-arcane-gold">
                    {getTopPersonality().birthdayMessage}
                  </p>
                </div>

                {/* Character Reactions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {getTopPersonality().reactions.map((reaction, index) => (
                    <div
                      key={index}
                      className="bg-primary-800/50 rounded-lg p-3 border border-primary-700/50"
                    >
                      <p className="text-xs sm:text-sm">
                        <span className="font-bold text-primary-200">{reaction.character}:</span>
                        <span className="text-primary-300 italic"> &quot;{reaction.text}&quot;</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* Final Birthday Message */}
                <div className="bg-gradient-to-r from-primary-800/50 to-arcane-gold/20 rounded-2xl p-4 sm:p-6 border-2 border-arcane-gold/50 mb-4">
                  <p className="text-lg sm:text-xl md:text-2xl font-heading text-white mb-2">
                    🎂 Happy Birthday! 🎉
                  </p>
                  <p className="text-sm sm:text-base text-primary-200">
                    {content.amyQuiz.finalMessage}
                  </p>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-primary-700 hover:bg-primary-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-105"
                >
                  Take Quiz Again 🔄
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      <ScrollArrow />
    </section>
  );
}
