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
          <div className="flex justify-center items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#ffcc66] text-center">
              10 Things I Can't Live Without
            </h1>
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

