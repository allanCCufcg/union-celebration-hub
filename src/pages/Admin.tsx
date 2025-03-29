
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
  X
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

// Exemplo de dados para presentes
import { gifts as initialGifts } from '../data/gifts';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gifts, setGifts] = useState(initialGifts);
  const [editingGift, setEditingGift] = useState<any>(null);
  const [newGift, setNewGift] = useState({
    id: 0,
    name: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    price: 0,
    purchased: false
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar autenticação
    const auth = localStorage.getItem('wedding_auth');
    if (auth !== 'true') {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('wedding_auth');
    localStorage.removeItem('wedding_user');
    navigate('/login');
  };

  const handleEditGift = (gift: any) => {
    setEditingGift({ ...gift });
  };

  const handleSaveGift = () => {
    if (editingGift) {
      setGifts(gifts.map(gift => 
        gift.id === editingGift.id ? editingGift : gift
      ));
      setEditingGift(null);
      toast({
        title: "Presente atualizado",
        description: "O presente foi atualizado com sucesso!",
      });
    }
  };

  const handleDeleteGift = (id: number) => {
    setGifts(gifts.filter(gift => gift.id !== id));
    toast({
      title: "Presente removido",
      description: "O presente foi removido com sucesso!",
    });
  };

  const handleAddNew = () => {
    const newId = Math.max(...gifts.map(g => g.id), 0) + 1;
    const giftToAdd = {
      ...newGift,
      id: newId,
      price: Number(newGift.price)
    };
    
    setGifts([...gifts, giftToAdd]);
    setNewGift({
      id: 0,
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      price: 0,
      purchased: false
    });
    setIsAddingNew(false);
    
    toast({
      title: "Presente adicionado",
      description: "O novo presente foi adicionado com sucesso!",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
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
                          value={newGift.description} 
                          onChange={(e) => setNewGift({...newGift, description: e.target.value})}
                          placeholder="Um lindo conjunto de panelas para o novo lar"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                        <Input 
                          value={newGift.image} 
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
                                value={editingGift.description} 
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
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Lista de Convidados</h3>
                  <p className="text-muted-foreground">
                    Esta funcionalidade será implementada em breve...
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Mensagens Recebidas</h3>
                  <p className="text-muted-foreground">
                    Esta funcionalidade será implementada em breve...
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
