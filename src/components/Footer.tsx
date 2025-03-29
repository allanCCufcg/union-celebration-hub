
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wedding-cream py-12 border-t border-wedding-rose-dark/20">
      <div className="container-wedding">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-wedding-rose w-16"></div>
            <Heart className="h-8 w-8 mx-4 text-wedding-rose" fill="currentColor" />
            <div className="h-px bg-wedding-rose w-16"></div>
          </div>
          
          <h3 className="font-playfair text-2xl mb-4">Júlia & Miguel</h3>
          <p className="text-muted-foreground mb-6">12 de Dezembro de 2024</p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <a href="#" className="text-muted-foreground hover:text-wedding-gold transition-colors">
              Início
            </a>
            <a href="#" className="text-muted-foreground hover:text-wedding-gold transition-colors">
              RSVP
            </a>
            <a href="#" className="text-muted-foreground hover:text-wedding-gold transition-colors">
              Presentes
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} · Júlia & Miguel · Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
