import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(onLoadComplete, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 bg-background flex justify-center items-center z-[99999] transition-all duration-800 ${
        isHiding ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      <img
        src="https://raw.githubusercontent.com/ReMineral/saishunsubs/blog-file/20251108_120216.png"
        alt="Saishun Subs Loading"
        className="loading-logo w-40 max-w-[40%]"
      />
    </div>
  );
};

export default LoadingScreen;
