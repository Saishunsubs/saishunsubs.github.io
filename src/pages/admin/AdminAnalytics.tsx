import { useState, useEffect } from 'react';
import { BarChart3, Eye, FileText, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch posts count
        const { count: totalPosts } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true });

        const { count: publishedPosts } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);

        // Fetch pages count
        const { count: totalPages } = await supabase
          .from('static_pages')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalPosts: totalPosts || 0,
          publishedPosts: publishedPosts || 0,
          draftPosts: (totalPosts || 0) - (publishedPosts || 0),
          totalPages: totalPages || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { 
      title: 'Total Posts', 
      value: stats.totalPosts, 
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-500'
    },
    { 
      title: 'Published', 
      value: stats.publishedPosts, 
      icon: Eye,
      color: 'bg-green-500/10 text-green-500'
    },
    { 
      title: 'Draft', 
      value: stats.draftPosts, 
      icon: FileText,
      color: 'bg-yellow-500/10 text-yellow-500'
    },
    { 
      title: 'Static Pages', 
      value: stats.totalPages, 
      icon: Users,
      color: 'bg-purple-500/10 text-purple-500'
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 size={24} />
        Trafik Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div 
            key={stat.title}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Informasi</h2>
        <p className="text-muted-foreground">
          Fitur analytics lengkap akan segera tersedia. Untuk saat ini, Anda dapat melihat statistik dasar blog Anda di atas.
        </p>
        <p className="text-muted-foreground mt-2">
          Untuk tracking yang lebih detail, pertimbangkan mengintegrasikan Google Analytics atau layanan serupa.
        </p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
