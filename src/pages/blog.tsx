import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MemberData {
  name_romaji: string;
  name_jp?: string;
  img: string;
}

interface BlogEntry {
  title: { $t: string };
  link: { rel: string; href: string }[];
  content?: { $t: string };
  media$thumbnail?: { url: string };
}

const activeMembers: Record<string, string> = {
  "haru_katsumata": "Haru",
  "asai_konomi": "Konomi",
  "ui_yamakawa": "Ui"
};

const BlogPage = () => {
  const [members, setMembers] = useState<Record<string, MemberData>>({});
  const [posts, setPosts] = useState<Record<string, BlogEntry[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://raw.githubusercontent.com/ReMineral/saishunsubs/blog-file/blogprofil.json");
        const data = await res.json();
        setMembers(data);

        // Fetch posts for each member
        for (const key in activeMembers) {
          const label = activeMembers[key];
          try {
            const postRes = await fetch(
              `https://saishunsubs.blogspot.com/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json`
            );
            const postData = await postRes.json();
            const entries = postData.feed?.entry || [];
            
            // Sort by date extracted from title
            const sortedEntries = entries.sort((a: BlogEntry, b: BlogEntry) => {
              const extractDate = (title: string) => {
                const match = title.match(/\[(\d{4})\.(\d{2})\.(\d{2})/);
                if (!match) return 0;
                return new Date(`${match[1]}-${match[2]}-${match[3]}`).getTime();
              };
              return extractDate(b.title.$t) - extractDate(a.title.$t);
            });
            
            setPosts(prev => ({ ...prev, [key]: sortedEntries }));
          } catch (error) {
            console.error(`Error fetching posts for ${key}:`, error);
          }
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getThumb = (entry: BlogEntry) => {
    if (entry.media$thumbnail?.url) {
      return entry.media$thumbnail.url.replace(/s\d+-c/, "w400-h400-c");
    }
    const content = entry.content?.$t || "";
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : "https://via.placeholder.com/150?text=No+Image";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Titillium Web' }}>
          BLOG TRANSLATE
        </h1>
        <hr className="border-border w-1/2 mx-auto mb-8" />
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#e67a9e' }}>
          Sakurazaka46
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-5 px-2" style={{ minWidth: 'max-content' }}>
              {Object.entries(activeMembers).map(([key, label]) => {
                const member = members[key];
                if (!member) return null;

                return (
                  <div 
                    key={key}
                    className="flex-shrink-0 w-72 bg-card border border-border rounded-2xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-[#e67a9e]"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#e67a9e]">
                        <img 
                          src={member.img} 
                          alt={member.name_romaji}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{member.name_romaji}</h3>
                        {member.name_jp && (
                          <p className="text-muted-foreground">{member.name_jp}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
                      {!posts[key] || posts[key].length === 0 ? (
                        <p className="text-sm text-muted-foreground">Belum ada postingan.</p>
                      ) : (
                        posts[key].map((entry, idx) => {
                          const link = entry.link.find(l => l.rel === 'alternate')?.href || '#';
                          return (
                            <a
                              key={idx}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-1 rounded-lg bg-muted/50 border border-[#e67a9e]/30 hover:bg-[#e67a9e] hover:text-white transition-colors group"
                            >
                              <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={getThumb(entry)} 
                                  alt="thumb"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-xs font-semibold leading-tight group-hover:text-white">
                                {entry.title.$t}
                              </span>
                            </a>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
