import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Post {
  id: string;
  title: string;
  author: string;
  tag: string;
  published: boolean;
  created_at: string;
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, author, tag, published, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat posts.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.map(p => 
        p.id === id ? { ...p, published: !currentStatus } : p
      ));

      toast({
        title: 'Berhasil',
        description: `Post ${!currentStatus ? 'dipublish' : 'disembunyikan'}.`,
      });
    } catch (error) {
      console.error('Error toggling publish:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengubah status post.',
        variant: 'destructive',
      });
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== id));

      toast({
        title: 'Berhasil',
        description: 'Post berhasil dihapus.',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus post.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/admin/posts/new">
          <Button className="flex items-center gap-2">
            <Plus size={20} />
            Tambah Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Belum ada post. Klik tombol di atas untuk membuat post baru.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{post.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.tag}</span>
                  <span>•</span>
                  <span>{new Date(post.created_at).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePublish(post.id, post.published)}
                  title={post.published ? 'Sembunyikan' : 'Publish'}
                >
                  {post.published ? <Eye size={18} /> : <EyeOff size={18} />}
                </Button>
                <Link to={`/admin/posts/${post.id}`}>
                  <Button variant="ghost" size="icon">
                    <Edit size={18} />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 size={18} className="text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Post?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Post "{post.title}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deletePost(post.id)}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
