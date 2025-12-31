import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
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

interface StaticPage {
  id: string;
  slug: string;
  title: string;
  created_at: string;
}

const AdminPages = () => {
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('static_pages')
        .select('id, slug, title, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat halaman.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const deletePage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('static_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPages(pages.filter(p => p.id !== id));

      toast({
        title: 'Berhasil',
        description: 'Halaman berhasil dihapus.',
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus halaman.',
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
        <h1 className="text-2xl font-bold">Static Pages</h1>
        <Link to="/admin/pages/new">
          <Button className="flex items-center gap-2">
            <Plus size={20} />
            Tambah Halaman
          </Button>
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Belum ada halaman statis. Klik tombol di atas untuk membuat halaman baru.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pages.map(page => (
            <div 
              key={page.id} 
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{page.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>/pages/{page.slug}</span>
                  <span>•</span>
                  <span>{new Date(page.created_at).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link to={`/admin/pages/${page.id}`}>
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
                      <AlertDialogTitle>Hapus Halaman?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Halaman "{page.title}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deletePage(page.id)}>
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

export default AdminPages;
