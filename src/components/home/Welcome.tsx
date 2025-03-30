
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-wedding">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl mb-6">
            Bem-vindos ao Nosso Site de Casamento
          </h2>
          
          <div className="w-20 h-1 bg-wedding-gold mx-auto mb-6"></div>
          
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Estamos muito felizes em compartilhar com vocês, nossos amigos e familiares queridos, 
            esta data tão especial. Criamos este site para manter todos informados sobre os detalhes 
            do nosso grande dia.
          </p>
          
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Aqui você encontrará informações sobre a cerimônia e recepção, nossa lista de presentes,
            confirmação de presença e muito mais. Esperamos que você possa se juntar a nós nesta 
            celebração de amor e alegria.
          </p>
          
          <p className="text-wedding-gold italic font-playfair text-xl">
            Com carinho, Carol & Allan
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
