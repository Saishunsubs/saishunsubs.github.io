import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const tags = [
  '4th Saku', 'Blog', 'Haru', 'Hinatazaka46', 'Konomi',
  'Music Video', 'Nogizaka46', 'Saku', 'Sakurazaka46', 'Ui'
];

const popularPosts = [
  {
    id: '1',
    title: 'Asai Konomi Blog [2025.12.02]',
    date: 'December 03, 2025',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_tWMmDHw6kYEfduv7qzw-WwfspyBZBE8yZVj8YA_abAmYt8UH5W647-HXcxkQW4ZSDGOdQeGNO_S_Dv1b4DUbdaxf2cGZDUwNECo8t6q6Hyd0UQ9NeFtFMsu4unxN_Zt5u1E7SCv_yjfcftu2_HHA=w72-h72-p-k-no-nu',
  },
  {
    id: '3',
    title: 'Asai Konomi Blog [2025.11.17] Translate',
    date: 'November 21, 2025',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_sdaYn8MivKSD6HDOwYBbWPkdUMxl4bYWOczWzo-wEDFg-fN-gZ8-6HbCktOdUoMu4ki1m65RyNnlx5lIdNsDCOC-_z1OfRmyhGFQXRGBK_AZ-7T0_Wmp0NUro3260yyg7Hq9M8JO1JkAxmpGzjHG0=w72-h72-p-k-no-nu',
  },
];

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase">
          Apa yang kamu cari?
        </h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Search this blog"
            className="flex-1 h-10 px-3 bg-muted text-foreground text-sm rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="h-10 px-4 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Donate */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase">
          Mau Trakteer?
        </h3>
        <div className="flex items-center justify-center gap-4">
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocLDGVHWP9pC0EOJPRdU_gyo31DJ5Rvua81Y8KDMTQxD4Jmu4C4=s96-c"
            alt="Profile"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <a
            href="https://trakteer.id/Saishun.subs"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
          >
            <div className="absolute top-1 left-1 bg-background/80 text-foreground text-xs px-2 py-1 rounded z-10 group-hover:bg-primary transition-colors">
              KLIK DISINI!
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVNcdvMXS16WUf8bA0fS8eGJJ2kjvSE8RocRaZHOd9Mr2hcpG5kykIort&s=10"
              alt="Trakteer"
              className="w-16 h-16 rounded-lg object-cover"
            />
          </a>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/search?tag=${encodeURIComponent(tag)}`}
              className="tag-item px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded hover:bg-primary hover:text-primary-foreground"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3 uppercase">
          Most Popular
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="flex gap-3 group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-12 rounded object-cover flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
