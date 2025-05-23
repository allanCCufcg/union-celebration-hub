
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  UserCircle, 
  KeyRound, 
  Loader2, 
  AlertCircle,
  Github,
  Mail,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Verificar se o usuário já está autenticado
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/rsvp');
      }
    }
    setCheckingSession(false);
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando...",
      });
      
    } catch (error: any) {
      console.error("Erro de login:", error);
      setErrorMessage(error.message === "Invalid login credentials" 
        ? "Email ou senha incorretos"
        : error.message || "Ocorreu um erro ao fazer login");
      
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    setSocialLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error(`Erro no login com ${provider}:`, error);
      toast({
        title: `Erro ao fazer login com ${provider}`,
        description: error.message || `Não foi possível fazer login com ${provider}`,
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSignUp = async () => {
    navigate('/signup');
  };

  if (checkingSession) {
    return (
      <Layout>
        <div className="pt-28 pb-20 bg-wedding-cream min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-wedding-gold" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-28 pb-20 bg-wedding-cream">
        <div className="container-wedding max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-wedding-rose/10">
            <div className="text-center mb-6">
              <h1 className="font-playfair text-2xl mb-2">Login</h1>
              <p className="text-muted-foreground">Faça login para acessar sua área</p>
            </div>
            
            {errorMessage && (
              <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <KeyRound className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wedding-gold hover:bg-wedding-gold/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : "Entrar"}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-muted-foreground">Ou continue com</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialLogin('google')}
                  disabled={!!socialLoading}
                  className="w-full"
                >
                  {socialLoading === 'google' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Mail className="h-5 w-5" />
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={!!socialLoading}
                  className="w-full"
                >
                  {socialLoading === 'facebook' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Smartphone className="h-5 w-5" />
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialLogin('github')}
                  disabled={!!socialLoading}
                  className="w-full"
                >
                  {socialLoading === 'github' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Github className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-wedding-gold"
                    onClick={handleSignUp}
                  >
                    Cadastre-se
                  </Button>
                </p>
              </div>
              
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Para demonstração:</p>
                <p>Email: admin@casamento.com</p>
                <p>Senha: casamento2024</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
