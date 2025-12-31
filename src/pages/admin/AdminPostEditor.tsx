import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const AdminPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: 'Saishun',
    tag: 'Blog',
    image: '',
    content: '',
    published: false,
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchPost(id);
    }
  }, [id, isNew]);

  const fetchPost = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        author: data.author,
        tag: data.tag,
        image: data.image || '',
        content: data.content,
        published: data.published,
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat post.',
        variant: 'destructive',
      });
      navigate('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: 'Validasi Error',
        description: 'Title dan Content wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      if (isNew) {
        const { error } = await supabase
          .from('posts')
          .insert([{
            title: formData.title,
            author: formData.author,
            tag: formData.tag,
            image: formData.image || null,
            content: formData.content,
            published: formData.published,
          }]);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Post berhasil dibuat.',
        });
      } else {
        const { error } = await supabase
          .from('posts')
          .update({
            title: formData.title,
            author: formData.author,
            tag: formData.tag,
            image: formData.image || null,
            content: formData.content,
            published: formData.published,
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Post berhasil diupdate.',
        });
      }

      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: 'Gagal menyimpan post.',
        variant: 'destructive',
      });
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
        onClick={() => navigate('/admin/posts')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft size={20} />
        Kembali ke Posts
      </button>

      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Tambah Post Baru' : 'Edit Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Judul post"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Nama author"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="tag">Tag</Label>
            <Input
              id="tag"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="Tag post"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="content">Content (HTML/Markdown) *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Isi post..."
            rows={15}
            className="mt-1 font-mono text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="published"
            checked={formData.published}
            onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
          />
          <Label htmlFor="published">Publish post ini</Label>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving} className="flex items-center gap-2">
            <Save size={18} />
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/posts')}
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPostEditor;
