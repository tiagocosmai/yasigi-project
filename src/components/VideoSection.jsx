const VideoSection = ({ onNavigateToSlideshow }) => {
  // Get video URL from environment variable, fallback to default if not set
  const videoUrl = import.meta.env.VITE_VIDEO_URL || 'https://www.youtube.com/embed/YDcvkm3pAgE?si=zc90sWUXVPDZ9KvJ';

  return (
    <section className="max-w-6xl mx-auto my-10 px-4 md:px-6">
      <div className="bg-[#151718] rounded-xl shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#ffcc66] mb-6 text-center">
          Presentation Video
        </h2>
        <div className="flex justify-center">
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg w-full max-w-[560px] aspect-video"
          />
        </div>

        {/* Navigation Controls */}
        {onNavigateToSlideshow && (
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6">
            <button
              onClick={onNavigateToSlideshow}
              className="px-3 py-2 sm:px-4 rounded-lg bg-transparent border border-white/10 text-[#e9eef2] hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              ← Slideshow
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;


