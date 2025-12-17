import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import Footer from '@/components/Footer';
import { posts } from '@/data/posts';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Main Content */}
      <main className="py-16">
        <div className="container">
          {/* Section Title */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Postingan Terbaru
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Posts Grid - Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                {...post}
                delay={index * 100}
              />
            ))}
          </div>
          
          {/* Show More Button */}
          <div className="mt-10 text-center">
            <button className="btn-primary px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all">
              Show More
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
