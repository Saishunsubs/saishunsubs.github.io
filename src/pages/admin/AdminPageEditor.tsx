import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminPageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchPage(id);
    }
  }, [id, isNew]);

  const fetchPage = async (pageId: string) => {
    try {
      const { data, error } = await supabase
        .from('static_pages')
        .select('*')
        .eq('id', pageId)
        .single();

      if (error) throw error;

      setFormData({
        slug: data.slug,
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      console.error('Error fetching page:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat halaman.',
        variant: 'destructive',
      });
      navigate('/admin/pages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.slug.trim() || !formData.title.trim() || !formData.content.trim()) {
      toast({
        title: 'Validasi Error',
        description: 'Semua field wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(formData.slug)) {
      toast({
        title: 'Validasi Error',
        description: 'Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      if (isNew) {
        const { error } = await supabase
          .from('static_pages')
          .insert([{
            slug: formData.slug,
            title: formData.title,
            content: formData.content,
          }]);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Halaman berhasil dibuat.',
        });
      } else {
        const { error } = await supabase
          .from('static_pages')
          .update({
            slug: formData.slug,
            title: formData.title,
            content: formData.content,
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Halaman berhasil diupdate.',
        });
      }

      navigate('/admin/pages');
    } catch (error: any) {
      console.error('Error saving page:', error);
      if (error.code === '23505') {
        toast({
          title: 'Error',
          description: 'Slug sudah digunakan. Pilih slug lain.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Gagal menyimpan halaman.',
          variant: 'destructive',
        });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <button 
        onClick={() => navigate('/admin/pages')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft size={20} />
        Kembali ke Pages
      </button>

      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Tambah Halaman Baru' : 'Edit Halaman'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Judul halaman"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug *</Label>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">/pages/</span>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
              placeholder="nama-halaman"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Hanya huruf kecil, angka, dan tanda hubung
          </p>
        </div>

        <div>
          <Label htmlFor="content">Content (HTML) *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Isi halaman..."
            rows={15}
            className="mt-1 font-mono text-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving} className="flex items-center gap-2">
            <Save size={18} />
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/pages')}
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPageEditor;
