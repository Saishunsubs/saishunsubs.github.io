import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const fansubLinks = [
  { name: 'Runsubs', url: 'https://runsubs.blogspot.com/' },
  { name: 'KinoKonoka', url: 'https://kinokonoka.blogspot.com/' },
  { name: 'Moefang', url: 'https://moefangsubs.github.io/' },
  { name: 'Wibu Subs', url: 'https://www.wibusubs.moe/' },
  { name: 'Sakamichi Station', url: 'https://sakamichistation46.blogspot.com/' },
  { name: 'Hikamisubs', url: 'https://hikamisubs.wordpress.com' },
];

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <img
              src="https://blogger.googleusercontent.com/img/a/AVvXsEiGpy2Ot5A7Y2pDl0jgLhygflz-HM0AifEmwbEMnoeHHBzQXG4tu-Z-nSOdkr8NSXUGXajn46OHb6ZnJPFcRB6oYR3fX7IFc7TMCUN06Lb7jyQ_UszrzPpUxLm2gY7i1MqVraAYGReaHIzB1djG0zeXMfopFoxhWwSZYu8Y8NLDOqPqwwDlNLaWMmIdwKua=s150"
              alt="Saishun Subs"
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground mb-4">
              Nyantai bikin subs, sambil belajar bahasa jepang.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pages/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog Translate
                </Link>
              </li>
              <li>
                <Link to="/pages/music-video" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Music Video
                </Link>
              </li>
              <li>
                <Link to="/pages/variety" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Variety Show
                </Link>
              </li>
            </ul>
          </div>

          {/* Indonesia-Japan Fansubber */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase">
              Indonesia-Japan Fansubber
            </h4>
            <div className="flex flex-wrap gap-2">
              {fansubLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container py-4">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Saishun Subs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
