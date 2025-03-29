
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserCircle, KeyRound } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock login - seria substituído pelo backend real
const MOCK_EMAIL = "admin@casamento.com";
const MOCK_PASSWORD = "casamento2024";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulando uma chamada de API
    setTimeout(() => {
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        // Simula um token de autenticação
        localStorage.setItem('wedding_auth', 'true');
        localStorage.setItem('wedding_user', JSON.stringify({ name: 'Carol & Allan' }));
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo à área administrativa!",
          variant: "default",
        });
        
        navigate('/admin');
      } else {
        toast({
          title: "Erro ao fazer login",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="pt-28 pb-20 bg-wedding-cream">
        <div className="container-wedding max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-wedding-rose/10">
            <div className="text-center mb-6">
              <h1 className="font-playfair text-2xl mb-2">Área dos Noivos</h1>
              <p className="text-muted-foreground">Faça login para acessar o painel administrativo</p>
            </div>
            
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
                {loading ? "Entrando..." : "Entrar"}
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
