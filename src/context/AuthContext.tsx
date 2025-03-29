
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  isAdmin: false,
  isLoading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to check if a user is an admin
  const checkIfAdmin = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error in admin check:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Verificar se é admin usando setTimeout para evitar deadlocks
        if (currentSession?.user?.email) {
          setTimeout(async () => {
            const isUserAdmin = await checkIfAdmin(currentSession.user.email);
            setIsAdmin(isUserAdmin);
            
            if (event === 'SIGNED_IN' && !isUserAdmin) {
              // Se logou mas não é admin, fazer logout e mostrar mensagem
              await supabase.auth.signOut();
              toast({
                title: "Acesso negado",
                description: "Você não tem permissão para acessar a área administrativa.",
                variant: "destructive",
              });
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Verificar sessão inicial
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (initialSession?.user?.email) {
        const isUserAdmin = await checkIfAdmin(initialSession.user.email);
        setIsAdmin(isUserAdmin);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    isAdmin,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
