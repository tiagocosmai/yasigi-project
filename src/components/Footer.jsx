const Footer = () => {
  const projects = [
    {
      name: 'Vamos Estudar',
      url: 'https://vamosestudar.vercel.app/',
    },
    {
      name: 'Jogo da forca',
      url: 'https://portinari-forca.vercel.app/',
    },
    {
      name: 'Spelling Bee',
      url: 'https://spellingbee-da-mali.vercel.app/',
    },
  ];

  return (
    <footer className="bg-[#151718] border-t border-white/10 mt-16 py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="text-xl font-bold text-[#ffcc66] mb-4 text-center">
          Other Projects
        </h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 flex-wrap">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-[#e9eef2] hover:bg-white/5 hover:text-[#ffcc66] transition-colors"
            >
              {project.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;


