
import React from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'Janeiro 2020',
    title: 'Nosso Primeiro Encontro',
    description: 'Nos conhecemos por acaso em um café no centro da cidade. Um encontro inesperado que mudaria nossas vidas para sempre.',
    imageUrl: 'https://images.unsplash.com/photo-1522057384400-681b421cfefc?auto=format&fit=crop&w=800&q=80'
  },
  {
    date: 'Junho 2021',
    title: 'Nosso Primeiro Aniversário',
    description: 'Celebramos um ano juntos com uma viagem memorável para a praia, onde tivemos momentos inesquecíveis.',
    imageUrl: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    date: 'Dezembro 2022',
    title: 'Mudamos Juntos',
    description: 'Decidimos dar um passo importante em nosso relacionamento e começamos a compartilhar o mesmo lar, transformando uma casa em nosso lar.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
  },
  {
    date: 'Abril 2023',
    title: 'O Pedido de Casamento',
    description: 'Em um jantar romântico sob as estrelas, Miguel se ajoelhou e pediu Júlia em casamento. Obviamente, ela disse sim!',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    date: 'Dezembro 2024',
    title: 'Nosso Casamento',
    description: 'E agora, estamos prestes a escrever o próximo capítulo da nossa história juntos, com vocês como testemunhas do nosso amor.',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
  }
];

const Timeline: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container-wedding">
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-wedding-gold"></div>
          
          {timelineEvents.map((event, index) => (
            <div 
              key={index}
              className={`relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 mb-20 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Foto */}
              <div className="w-full md:w-5/12">
                <div className="overflow-hidden rounded-lg shadow-md transform transition-transform hover:scale-[1.02] duration-300">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              
              {/* Ponto na linha do tempo */}
              <div className="relative flex items-center justify-center bg-white border-4 border-wedding-gold rounded-full w-12 h-12 z-20">
                <div className="bg-wedding-gold rounded-full w-4 h-4"></div>
              </div>
              
              {/* Conteúdo */}
              <div className="w-full md:w-5/12 text-center md:text-left">
                <span className="inline-block bg-wedding-gold-light text-wedding-gold text-sm font-medium px-3 py-1 rounded-full mb-3">
                  {event.date}
                </span>
                <h3 className="font-playfair text-2xl mb-3">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
