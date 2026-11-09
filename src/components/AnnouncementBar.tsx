import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MESSAGES = [
  'Little things, big happiness ♡',
  'Free shipping across India on orders above ₹999.',
  'Discover something cute today — hand-stitched with love!'
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? MESSAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  return (
    <div className="relative bg-[#FCE8E2] border-b border-[#F8CCD7] text-[#573B35] text-xs font-medium py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navigation arrows for accessibility */}
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-[#A76E69] hover:text-[#573B35] transition-colors p-0.5 rounded-full hover:bg-white/40"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Dynamic rotating message */}
        <div className="flex items-center gap-2 text-center overflow-hidden h-5">
          <Sparkles className="w-3 h-3 text-[#D98DA4] animate-pulse shrink-0 hidden sm:inline-block" />
          <span 
            key={currentIndex}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 tracking-wide font-nunito"
          >
            {MESSAGES[currentIndex]}
          </span>
          <span className="text-[#D98DA4] hidden sm:inline-block">♡</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="text-[#A76E69] hover:text-[#573B35] transition-colors p-0.5 rounded-full hover:bg-white/40"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-[#A76E69] hover:text-[#573B35] transition-colors p-0.5 rounded-full hover:bg-white/40 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
