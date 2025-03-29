
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Gift, 
  Users, 
  MessageSquare, 
  LogOut, 
  Plus,
  Edit,
  Trash,
  Save,
  X,
  Loader2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Gift {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  price: number;
  purchased: boolean;
  purchased_by: string | null;
  purchased_at: string | null;
}

interface Guest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  attending: boolean | null;
  number_of_guests: number;
  message: string | null;
  created_at: string;
}

interface Message {
  id: string;
  name: string;
  email: string | null;
  message: string;
  created_at: string;
}

const Admin: React.FC = () => {
  const { isAdmin, isLoading: authLoading, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [newGift, setNewGift] = useState<Omit<Gift, 'id'>>({
    name: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    price: 0,
    purchased: false,
    purchased_by: null,
    purchased_at: null
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Carregar presentes
      const { data: giftsData, error: giftsError } = await supabase
        .from('gifts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (giftsError) {
        throw giftsError;
      }
      
      setGifts(giftsData);
      
      // Carregar convidados
      const { data: guestsData, error: guestsError } = await supabase
        .from('guests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (guestsError) {
        throw guestsError;
      }
      
      setGuests(guestsData);
      
      // Carregar mensagens
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (messagesError) {
        throw messagesError;
      }
      
      setMessages(messagesData);
      
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error.message);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleEditGift = (gift: Gift) => {
    setEditingGift({ ...gift });
  };

  const handleSaveGift = async () => {
    if (!editingGift) return;
    
    try {
      const { error } = await supabase
        .from('gifts')
        .update({
          name: editingGift.name,
          description: editingGift.description,
          image: editingGift.image,
          price: editingGift.price
        })
        .eq('id', editingGift.id);
      
      if (error) {
        throw error;
      }
      
      setGifts(gifts.map(gift => 
        gift.id === editingGift.id ? editingGift : gift
      ));
      setEditingGift(null);
      
      toast({
        title: "Presente atualizado",
        description: "O presente foi atualizado com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar presente",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteGift = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setGifts(gifts.filter(gift => gift.id !== id));
      
      toast({
        title: "Presente removido",
        description: "O presente foi removido com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover presente",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddNew = async () => {
    try {
      const { data, error } = await supabase
        .from('gifts')
        .insert({
          name: newGift.name,
          description: newGift.description,
          image: newGift.image,
          price: newGift.price,
          purchased: false
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      setGifts([data, ...gifts]);
      setNewGift({
        name: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
        price: 0,
        purchased: false,
        purchased_by: null,
        purchased_at: null
      });
      setIsAddingNew(false);
      
      toast({
        title: "Presente adicionado",
        description: "O novo presente foi adicionado com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar presente",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-wedding-gold" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null; // Redirecionado pelo useEffect
  }

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-wedding-cream">
        <div className="container-wedding">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="heading-lg mb-2">Painel Admin</h1>
              <p className="text-muted-foreground">
                Gerencie presentes, convidados e mensagens
              </p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Sair</span>
            </Button>
          </div>
          
          <Tabs defaultValue="gifts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gifts" className="flex items-center gap-2">
                <Gift size={16} />
                <span>Presentes</span>
              </TabsTrigger>
              <TabsTrigger value="guests" className="flex items-center gap-2">
                <Users size={16} />
                <span>Convidados</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span>Mensagens</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="gifts" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-playfair text-xl">Lista de Presentes</h2>
                  {!isAddingNew && (
                    <Button 
                      onClick={() => setIsAddingNew(true)}
                      className="flex items-center gap-2 bg-wedding-gold hover:bg-wedding-gold/90"
                    >
                      <Plus size={16} />
                      <span>Adicionar Presente</span>
                    </Button>
                  )}
                </div>
                
                {isAddingNew && (
                  <div className="mb-6 p-4 border border-wedding-gold/20 rounded-lg bg-wedding-cream/20">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Novo Presente</h3>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setIsAddingNew(false)}
                      >
                        <X size={18} />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nome</label>
                        <Input 
                          value={newGift.name} 
                          onChange={(e) => setNewGift({...newGift, name: e.target.value})}
                          placeholder="Jogo de Panelas"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                        <Input 
                          type="number" 
                          value={newGift.price.toString()} 
                          onChange={(e) => setNewGift({...newGift, price: parseFloat(e.target.value) || 0})}
                          placeholder="299.90"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <Input 
                          value={newGift.description || ''} 
                          onChange={(e) => setNewGift({...newGift, description: e.target.value})}
                          placeholder="Um lindo conjunto de panelas para o novo lar"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                        <Input 
                          value={newGift.image || ''} 
                          onChange={(e) => setNewGift({...newGift, image: e.target.value})}
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleAddNew}
                        disabled={!newGift.name || newGift.price <= 0}
                        className="bg-wedding-gold hover:bg-wedding-gold/90"
                      >
                        Adicionar Presente
                      </Button>
                    </div>
                  </div>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gifts.map((gift) => (
                      <TableRow key={gift.id}>
                        {editingGift && editingGift.id === gift.id ? (
                          <>
                            <TableCell>
                              <Input 
                                value={editingGift.name} 
                                onChange={(e) => setEditingGift({...editingGift, name: e.target.value})}
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                value={editingGift.description || ''} 
                                onChange={(e) => setEditingGift({...editingGift, description: e.target.value})}
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                value={editingGift.price} 
                                onChange={(e) => setEditingGift({...editingGift, price: parseFloat(e.target.value) || 0})}
                              />
                            </TableCell>
                            <TableCell>
                              {gift.purchased ? "Adquirido" : "Disponível"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={handleSaveGift}
                                >
                                  <Save size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setEditingGift(null)}
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{gift.name}</TableCell>
                            <TableCell className="max-w-xs truncate">{gift.description}</TableCell>
                            <TableCell>R$ {gift.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                gift.purchased 
                                  ? 'bg-gray-200 text-gray-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {gift.purchased ? "Adquirido" : "Disponível"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleEditGift(gift)}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="icon"
                                  onClick={() => handleDeleteGift(gift.id)}
                                >
                                  <Trash size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {gifts.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Nenhum presente cadastrado ainda</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="guests" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="font-playfair text-xl mb-6">Lista de Convidados</h2>
                
                {guests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Presença</TableHead>
                        <TableHead>Acompanhantes</TableHead>
                        <TableHead>Mensagem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guests.map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell>{guest.name}</TableCell>
                          <TableCell>
                            {guest.email && <div>{guest.email}</div>}
                            {guest.phone && <div>{guest.phone}</div>}
                          </TableCell>
                          <TableCell>
                            {guest.attending === null ? (
                              <span className="text-amber-600">Não respondeu</span>
                            ) : guest.attending ? (
                              <span className="text-green-600">Confirmado</span>
                            ) : (
                              <span className="text-red-600">Não comparecerá</span>
                            )}
                          </TableCell>
                          <TableCell>{guest.number_of_guests}</TableCell>
                          <TableCell className="max-w-xs truncate">{guest.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Nenhum convidado confirmou presença ainda</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="font-playfair text-xl mb-6">Mensagens Recebidas</h2>
                
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{message.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        {message.email && (
                          <div className="text-sm text-muted-foreground mb-2">{message.email}</div>
                        )}
                        <p className="text-sm">{message.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Nenhuma mensagem recebida ainda</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
