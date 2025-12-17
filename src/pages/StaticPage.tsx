import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const pageData: Record<string, { title: string; description: string }> = {
  variety: {
    title: 'Variety Show',
    description: 'Kumpulan subtitle variety show Jepang terjemahan Indonesia.',
  },
  blog: {
    title: 'Blog Translate',
    description: 'Terjemahan blog member idol Jepang ke Bahasa Indonesia.',
  },
  'music-video': {
    title: 'Music Video',
    description: 'Subtitle musik video dan performance dari idol Jepang.',
  },
  other: {
    title: 'Other Projects',
    description: 'Proyek-proyek lain dari Saishun Subs.',
  },
};

const StaticPage = () => {
  const { slug } = useParams();
  const page = pageData[slug || ''] || {
    title: 'Page Not Found',
    description: 'Halaman yang kamu cari tidak ditemukan.',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[68px] min-h-[80vh]">
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              {page.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              {page.description}
            </p>
            
            <div className="bg-card rounded-lg p-8 border border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Coming Soon
              </h2>
              <p className="text-muted-foreground">
                Halaman ini sedang dalam pengembangan. Silakan kembali lagi nanti!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StaticPage;
