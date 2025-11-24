import { useState, useEffect } from 'react';
import Slideshow from './components/Slideshow';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('slideshow'); // 'slideshow' or 'video'
  const [mode, setMode] = useState('presentation'); // 'presentation' or 'scripting'

  // Keyboard shortcut: CTRL+SHIFT+B to toggle mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'B') {
        e.preventDefault();
        setMode((prev) => (prev === 'presentation' ? 'scripting' : 'presentation'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1112] text-[#e9eef2]">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-10">
        <div className="bg-[#151718] rounded-xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[#ffcc66]">
              10 Things I Can't Live Without
            </h1>
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center md:justify-end">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSection('slideshow')}
                  className={`px-3 py-2 sm:px-4 rounded-lg border border-white/10 transition-colors text-sm sm:text-base ${
                    activeSection === 'slideshow'
                      ? 'bg-[#ffcc66] text-[#0f1112]'
                      : 'bg-transparent text-[#e9eef2] hover:bg-white/5'
                  }`}
                >
                  Slideshow
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-8">
        {activeSection === 'slideshow' ? (
          <Slideshow mode={mode} onNavigateToVideo={() => setActiveSection('video')} />
        ) : (
          <VideoSection />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

