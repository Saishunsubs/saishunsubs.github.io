import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const { user, isAdmin, loading, signInWithGitHub } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin/posts', { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const handleGitHubLogin = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      toast({
        title: 'Login Gagal',
        description: 'Gagal masuk dengan GitHub. Silakan coba lagi.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <img
              src="https://blogger.googleusercontent.com/img/a/AVvXsEiGpy2Ot5A7Y2pDl0jgLhygflz-HM0AifEmwbEMnoeHHBzQXG4tu-Z-nSOdkr8NSXUGXajn46OHb6ZnJPFcRB6oYR3fX7IFc7TMCUN06Lb7jyQ_UszrzPpUxLm2gY7i1MqVraAYGReaHIzB1djG0zeXMfopFoxhWwSZYu8Y8NLDOqPqwwDlNLaWMmIdwKua=s150"
              alt="Saishun Subs"
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-muted-foreground mt-2">
              Masuk untuk mengelola blog Saishun Subs
            </p>
          </div>

          <Button
            onClick={handleGitHubLogin}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
          >
            <Github size={20} />
            Masuk dengan GitHub
          </Button>

          {user && !isAdmin && (
            <p className="mt-4 text-center text-sm text-destructive">
              Akun Anda tidak memiliki akses admin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
