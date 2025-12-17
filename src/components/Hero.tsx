import { useEffect, useState } from 'react';

const Hero = () => {
  const captions = [
    'APAPUN YANG DIMAU',
    'SAKURAZAKA46',
    'HINATAZAKA46',
    'NOGIZAKA46',
    'J-POP & K-POP',
  ];

  const [currentCaption, setCurrentCaption] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaption((prev) => (prev + 1) % captions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://github.com/ReMineral/saishunsubs/blob/main/background.gif?raw=true)',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight mb-4">
          SAISHUN SUBS
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 font-medium">
          BIKIN SUBS{' '}
          <span className="text-primary font-bold transition-all duration-500">
            {captions[currentCaption]}
          </span>
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
