
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserCircle, KeyRound, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Verificar se o usuário já está autenticado e é admin
    if (user && isAdmin) {
      navigate('/admin');
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

      // O redirecionamento será feito pelo useEffect quando isAdmin for atualizado
      toast({
        title: "Login bem-sucedido",
        description: "Verificando suas permissões...",
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
      setLoading(false);
    }
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
              <h1 className="font-playfair text-2xl mb-2">Área dos Noivos</h1>
              <p className="text-muted-foreground">Faça login para acessar o painel administrativo</p>
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
