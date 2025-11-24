const VideoSection = () => {
  // Extract video ID from YouTube URL
  const embedUrl = `https://www.youtube.com/watch?v=YDcvkm3pAgE`;

  return (
    <section className="max-w-6xl mx-auto my-10 px-4 md:px-6">
      <div className="bg-[#151718] rounded-xl shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#ffcc66] mb-6 text-center">
          Presentation Video
        </h2>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={embedUrl}
            title="Presentation Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;


