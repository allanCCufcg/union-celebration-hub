
import React from 'react';
import Layout from '../components/Layout';
import { Gift, Heart } from 'lucide-react';

// Dados de exemplo para os presentes
const gifts = [
  {
    id: 1,
    name: 'Lua de Mel em Paris',
    description: 'Contribua para nossa viagem dos sonhos à cidade do amor!',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    price: 500,
    purchased: false
  },
  {
    id: 2,
    name: 'Jogo de Jantar',
    description: 'Um lindo conjunto de pratos e talheres para nossos jantares especiais.',
    image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&w=800&q=80',
    price: 350,
    purchased: true
  },
  {
    id: 3,
    name: 'Churrasqueira Elétrica',
    description: 'Para nossos churrascos de domingo com a família e amigos.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    price: 280,
    purchased: false
  },
  {
    id: 4,
    name: 'Liquidificador',
    description: 'Para preparar deliciosos sucos e vitaminas no nosso dia a dia.',
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=800&q=80',
    price: 150,
    purchased: false
  },
  {
    id: 5,
    name: 'Smart TV',
    description: 'Para nossas noites de cinema em casa.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    price: 750,
    purchased: false
  },
  {
    id: 6,
    name: 'Kit para Home Office',
    description: 'Ajude-nos a montar um escritório em casa funcional e confortável.',
    image: 'https://images.unsplash.com/photo-1585373683920-671438c82bfa?auto=format&fit=crop&w=800&q=80',
    price: 420,
    purchased: false
  }
];

const Gifts: React.FC = () => {
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
                      <button className="flex items-center gap-2 bg-wedding-gold text-white px-4 py-2 rounded-full text-sm hover:bg-wedding-gold/90 transition-colors">
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
            <button className="bg-wedding-gold text-white px-6 py-3 rounded-full font-medium hover:bg-wedding-gold/90 transition-colors">
              Fazer Contribuição
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gifts;
