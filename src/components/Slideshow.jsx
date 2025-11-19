import { useState, useEffect, useRef, useCallback } from 'react';
import { slidesData } from '../data/slidesData';

const Slideshow = ({ language = 'en' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideshowRef = useRef(null);
  const slides = Object.values(slidesData[language].slides);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        await slideshowRef.current?.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err);
      }
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      await document.exitFullscreen();
    } catch (err) {
      console.error('Error attempting to exit fullscreen:', err);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen, exitFullscreen, toggleFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Reset to first slide when language changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [language]);

  const currentSlide = slides[currentIndex];

  return (
    <div
      ref={slideshowRef}
      className={`bg-[#151718] rounded-xl shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none m-0 p-4 md:p-8'
          : 'max-w-6xl mx-auto my-10 p-6 md:p-8'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-start min-h-[420px]">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-auto md:flex-shrink-0">
          <img
            src={`/icons/${currentSlide.icon}`}
            alt={currentSlide.title}
            className="w-full md:w-[360px] rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ffcc66] mb-3 md:mb-4">
            {currentSlide.title}
          </h2>
          <div className="text-base md:text-lg text-[#e9eef2] whitespace-pre-wrap leading-relaxed">
            {currentSlide.body}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="px-3 py-2 sm:px-4 rounded-lg bg-transparent border border-white/10 text-[#e9eef2] hover:bg-white/5 transition-colors text-sm sm:text-base"
        >
          ◀ Prev
        </button>
        <span className="text-xs sm:text-sm text-[#9aa4ad] px-2">
          {currentIndex + 1} / {slides.length}
        </span>
        <button
          onClick={handleNext}
          className="px-3 py-2 sm:px-4 rounded-lg bg-transparent border border-white/10 text-[#e9eef2] hover:bg-white/5 transition-colors text-sm sm:text-base"
        >
          Next ▶
        </button>
        <button
          onClick={toggleFullscreen}
          className="px-3 py-2 sm:px-4 rounded-lg bg-transparent border border-white/10 text-[#e9eef2] hover:bg-white/5 transition-colors text-sm sm:text-base"
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? '⤓ Exit' : '⤢ Fullscreen'}
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 text-xs sm:text-sm text-[#9aa4ad] px-2">
        Use arrow keys to navigate • Press F for fullscreen
      </div>
    </div>
  );
};

export default Slideshow;

