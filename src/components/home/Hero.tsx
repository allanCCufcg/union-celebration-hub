
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-wedding-cream">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1000&q=80")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)'
        }}
      ></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-wedding-cream/70 to-wedding-cream/90"></div>
      
      <div className="container-wedding text-center relative z-10 animate-fade-up">
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl mb-4 tracking-wide">
          <span className="block">Carol</span>
          <span className="inline-block mx-2 md:mx-4 text-wedding-gold">&</span>
          <span className="block">Allan</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 font-light">Vamos nos casar!</p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-8">
          <button 
            onClick={() => navigate('/rsvp')}
            className="px-8 py-3 bg-wedding-gold text-white rounded-full shadow-md hover:bg-wedding-gold/90 transition-all hover:shadow-lg"
          >
            Confirmar Presença
          </button>
          
          <button 
            onClick={() => navigate('/our-story')}
            className="px-8 py-3 border border-wedding-gold/50 text-wedding-gold rounded-full hover:bg-wedding-gold/5 transition-all"
          >
            Nossa História
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
