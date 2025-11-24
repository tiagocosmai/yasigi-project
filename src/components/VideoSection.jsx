const VideoSection = () => {
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
            src="https://www.youtube.com/embed/YDcvkm3pAgE?si=zc90sWUXVPDZ9KvJ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg w-full max-w-[560px] aspect-video"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;


