import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Variety', href: '/pages/variety' },
    { name: 'Blog', href: '/pages/blog' },
    { name: 'Music Video', href: '/pages/music-video' },
    { name: 'Other', href: '/pages/other' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[68px] z-[1010] transition-all duration-300 ${
        isScrolled ? 'header-scrolled bg-background' : 'bg-secondary/80'
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center h-12">
          <img
            src="https://blogger.googleusercontent.com/img/a/AVvXsEiGpy2Ot5A7Y2pDl0jgLhygflz-HM0AifEmwbEMnoeHHBzQXG4tu-Z-nSOdkr8NSXUGXajn46OHb6ZnJPFcRB6oYR3fX7IFc7TMCUN06Lb7jyQ_UszrzPpUxLm2gY7i1MqVraAYGReaHIzB1djG0zeXMfopFoxhWwSZYu8Y8NLDOqPqwwDlNLaWMmIdwKua=s150"
            alt="Saishun Subs"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="px-4 py-2 text-xs font-semibold uppercase text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[68px] left-0 w-full bg-secondary border-t border-border">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold uppercase text-foreground hover:text-primary hover:bg-muted rounded transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
