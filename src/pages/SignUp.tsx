
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
  Smartphone,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/context/AuthContext';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Cadastro realizado com sucesso",
        description: "Verifique seu email para confirmar sua conta",
      });
      
      // Redirecionar para a página de login
      navigate('/login');
      
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      
      // Tratando mensagens de erro comuns
      let errorMsg = error.message;
      if (error.message.includes("already registered")) {
        errorMsg = "Este email já está cadastrado";
      } else if (error.message.includes("password")) {
        errorMsg = "A senha deve ter pelo menos 6 caracteres";
      }
      
      setErrorMessage(errorMsg);
      
      toast({
        title: "Erro ao criar conta",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'facebook' | 'github') => {
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
      console.error(`Erro no cadastro com ${provider}:`, error);
      toast({
        title: `Erro ao cadastrar com ${provider}`,
        description: error.message || `Não foi possível cadastrar com ${provider}`,
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const goToLogin = () => {
    navigate('/login');
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
              <h1 className="font-playfair text-2xl mb-2">Cadastro</h1>
              <p className="text-muted-foreground">Crie sua conta para participar do casamento</p>
            </div>
            
            {errorMessage && (
              <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nome completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
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
                    minLength={6}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <KeyRound className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
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
                    Cadastrando...
                  </>
                ) : "Criar conta"}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-muted-foreground">Ou cadastre-se com</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialSignUp('google')}
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
                  onClick={() => handleSocialSignUp('facebook')}
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
                  onClick={() => handleSocialSignUp('github')}
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
                <Button 
                  type="button"
                  variant="link" 
                  className="flex items-center justify-center gap-2 mx-auto text-wedding-gold"
                  onClick={goToLogin}
                >
                  <ArrowLeft size={16} />
                  <span>Voltar para o login</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
