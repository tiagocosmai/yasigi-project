import { useState, useEffect, useRef, useCallback } from 'react';
import { slidesData } from '../data/slidesData';

const Slideshow = ({ language = 'en', mode = 'presentation', onNavigateToVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideshowRef = useRef(null);
  const slides = Object.values(slidesData.en.slides);

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

  // Reset to first slide when language or mode changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [language, mode]);

  const currentSlide = slides[currentIndex];
  // Get icons array - normalize to array format
  const icons = Array.isArray(currentSlide.icon) ? currentSlide.icon : [currentSlide.icon];
  const hasMultipleIcons = icons.length > 1;

  // Presentation mode: only title and image(s)
  if (mode === 'presentation') {
    // Calculate grid layout based on number of images
    const getGridLayout = (count) => {
      if (count === 1) return { cols: 1, rows: 1, special: null };
      if (count === 2) return { cols: 2, rows: 1, special: null };
      if (count === 3) return { cols: 3, rows: 1, special: null };
      if (count === 4) return { cols: 2, rows: 2, special: null };
      if (count === 5) return { cols: 3, rows: 2, special: 'five' }; // Special layout for 5
      if (count === 6) return { cols: 3, rows: 2, special: null };
      // For more than 6, use a flexible grid
      return { cols: 3, rows: Math.ceil(count / 3), special: null };
    };

    const gridLayout = hasMultipleIcons ? getGridLayout(icons.length) : { cols: 1, rows: 1, special: null };

    return (
      <div
        ref={slideshowRef}
        className={`bg-[#151718] rounded-xl shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none m-0 p-4 md:p-8'
            : 'max-w-6xl mx-auto my-10 p-6 md:p-8'
        }`}
        style={isFullscreen ? { height: '100vh' } : { minHeight: 'calc(100vh - 200px)' }}
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffcc66] mb-6 md:mb-8 text-center flex-shrink-0">
          {currentSlide.title}
        </h2>

        {/* Images - Mosaic layout that fills available space */}
        <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
          {hasMultipleIcons ? (
            <div 
              className="w-full h-full grid gap-2 md:gap-4"
              style={{
                gridTemplateColumns: `repeat(${gridLayout.cols}, 1fr)`,
                gridTemplateRows: `repeat(${gridLayout.rows}, 1fr)`,
              }}
            >
              {icons.map((icon, idx) => {
                // Special layout for 5 images: 3 on top row, 2 on bottom row
                let gridArea = '';
                if (gridLayout.special === 'five') {
                  if (idx < 3) {
                    // First 3 images on top row
                    gridArea = `1 / ${idx + 1} / 2 / ${idx + 2}`;
                  } else {
                    // Last 2 images on bottom row, centered
                    const bottomIdx = idx - 3;
                    gridArea = `2 / ${bottomIdx + 2} / 3 / ${bottomIdx + 3}`;
                  }
                }
                
                return (
                  <div 
                    key={idx} 
                    className="w-full h-full overflow-hidden"
                    style={gridArea ? { gridArea } : {}}
                  >
                    <img
                      src={`/new-icons/${icon}`}
                      alt={`${currentSlide.title} - ${idx + 1}`}
                      className="w-full h-full rounded-lg shadow-lg object-cover"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={`/new-icons/${icons[0]}`}
                alt={currentSlide.title}
                className="w-full h-full rounded-lg shadow-lg object-cover max-h-full"
              />
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6 flex-shrink-0">
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
          {onNavigateToVideo && (
            <button
              onClick={onNavigateToVideo}
              className="px-3 py-2 sm:px-4 rounded-lg bg-transparent border border-white/10 text-[#e9eef2] hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              Video
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-4 text-xs sm:text-sm text-[#9aa4ad] px-2">
          Use arrow keys to navigate • Press F for fullscreen
        </div>
      </div>
    );
  }

  // Scripting mode: original layout with title, image, and body text
  const iconPath = icons[0];

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
            src={`/new-icons/${iconPath}`}
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
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6 flex-shrink-0">
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
        {onNavigateToVideo && (
          <button
            onClick={onNavigateToVideo}
            className="px-3 py-2 sm:px-4 rounded-lg bg-transparent border border-white/10 text-[#e9eef2] hover:bg-white/5 transition-colors text-sm sm:text-base"
          >
            Video
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 text-xs sm:text-sm text-[#9aa4ad] px-2">
        Use arrow keys to navigate • Press F for fullscreen
      </div>
    </div>
  );
};

export default Slideshow;

