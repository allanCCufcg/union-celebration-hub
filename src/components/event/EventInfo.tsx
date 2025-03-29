
import React from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

const EventInfo: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container-wedding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Cerimônia */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-wedding-rose/20 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wedding-rose/20 mb-4">
                <Calendar className="w-7 h-7 text-wedding-rose" />
              </div>
              <h3 className="font-playfair text-2xl mb-2">Cerimônia</h3>
              <div className="w-12 h-0.5 bg-wedding-gold mx-auto"></div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="w-5 h-5 mt-0.5 mr-3 text-wedding-gold" />
                <div>
                  <p className="font-medium">Horário</p>
                  <p className="text-muted-foreground">16:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-0.5 mr-3 text-wedding-gold" />
                <div>
                  <p className="font-medium">Local</p>
                  <p className="text-muted-foreground">Igreja Nossa Senhora do Carmo</p>
                  <p className="text-muted-foreground text-sm">
                    Av. Paulista, 1000 - São Paulo, SP
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Sparkles className="w-5 h-5 mt-0.5 mr-3 text-wedding-gold" />
                <div>
                  <p className="font-medium">Dress Code</p>
                  <p className="text-muted-foreground">Traje Social</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recepção */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-wedding-rose/20 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wedding-gold/20 mb-4">
                <Sparkles className="w-7 h-7 text-wedding-gold" />
              </div>
              <h3 className="font-playfair text-2xl mb-2">Recepção</h3>
              <div className="w-12 h-0.5 bg-wedding-gold mx-auto"></div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="w-5 h-5 mt-0.5 mr-3 text-wedding-gold" />
                <div>
                  <p className="font-medium">Horário</p>
                  <p className="text-muted-foreground">18:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-0.5 mr-3 text-wedding-gold" />
                <div>
                  <p className="font-medium">Local</p>
                  <p className="text-muted-foreground">Espaço Jardins</p>
                  <p className="text-muted-foreground text-sm">
                    Rua das Flores, 500 - São Paulo, SP
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Sparkles className="w-5 h-5 mt-0.5 mr-3 text-wedding-gold" />
                <div>
                  <p className="font-medium">Detalhes</p>
                  <p className="text-muted-foreground">Música ao vivo, jantar e muita celebração!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mapa - placeholder para futura implementação com mapas interativos */}
        <div className="mt-16 rounded-lg overflow-hidden shadow-lg border border-wedding-rose/20">
          <div className="bg-wedding-cream h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mb-4 text-wedding-gold mx-auto" />
              <h3 className="font-playfair text-2xl mb-2">Mapa Interativo</h3>
              <p className="text-muted-foreground">
                Um mapa interativo será implementado aqui, permitindo aos convidados localizar facilmente os locais da cerimônia e recepção.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInfo;
