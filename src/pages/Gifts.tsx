
import React from 'react';
import Layout from '../components/Layout';
import { Gift, Heart } from 'lucide-react';
import { gifts } from '../data/gifts';
import { useToast } from '@/components/ui/use-toast';

const Gifts: React.FC = () => {
  const { toast } = useToast();

  const handlePurchase = (giftId: number, giftName: string) => {
    toast({
      title: "Obrigado pelo presente!",
      description: `Sua contribuição para "${giftName}" foi registrada. Carol e Allan agradecerão pessoalmente!`,
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-wedding-cream">
        <div className="container-wedding">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Lista de Presentes</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Se você deseja nos presentear, preparamos uma lista com itens que serão especiais para o início da nossa vida juntos.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container-wedding">
          <div className="mb-10 bg-white rounded-lg shadow-md p-6 border border-wedding-rose/20">
            <div className="flex items-start gap-4">
              <div className="bg-wedding-rose/20 p-3 rounded-full">
                <Heart className="h-6 w-6 text-wedding-rose" fill="currentColor" />
              </div>
              <div>
                <h3 className="font-playfair text-xl mb-2">Como funciona</h3>
                <p className="text-muted-foreground">
                  Nossa lista de presentes é simbólica. Ao "comprar" um presente, você faz uma contribuição financeira 
                  que nos ajudará a adquirir os itens para o nosso lar. Agradecemos imensamente por sua generosidade!
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift) => (
              <div 
                key={gift.id} 
                className={`bg-white rounded-lg overflow-hidden shadow-md border ${
                  gift.purchased ? 'border-gray-200' : 'border-wedding-rose/20'
                } transition-all hover:shadow-lg`}
              >
                <div className="relative">
                  <img 
                    src={gift.image} 
                    alt={gift.name} 
                    className={`w-full h-48 object-cover ${
                      gift.purchased ? 'opacity-50' : ''
                    }`}
                  />
                  
                  {gift.purchased && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="bg-white text-wedding-rose px-4 py-2 rounded-full font-medium">
                        Presente Adquirido
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="font-playfair text-xl mb-2">{gift.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{gift.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-wedding-gold font-medium">
                      R$ {gift.price.toFixed(2)}
                    </span>
                    
                    {!gift.purchased && (
                      <button 
                        className="flex items-center gap-2 bg-wedding-gold text-white px-4 py-2 rounded-full text-sm hover:bg-wedding-gold/90 transition-colors"
                        onClick={() => handlePurchase(gift.id, gift.name)}
                      >
                        <Gift className="w-4 h-4" />
                        <span>Presentear</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Não encontrou o que procurava? Você também pode fazer uma contribuição livre.
            </p>
            <button 
              className="bg-wedding-gold text-white px-6 py-3 rounded-full font-medium hover:bg-wedding-gold/90 transition-colors"
              onClick={() => toast({
                title: "Obrigado pela contribuição!",
                description: "Carol e Allan agradecerão pessoalmente por sua generosidade!",
              })}
            >
              Fazer Contribuição
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gifts;
