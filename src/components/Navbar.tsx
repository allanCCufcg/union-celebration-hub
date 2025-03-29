
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `relative px-3 py-2 transition-all duration-300 hover:text-wedding-gold ${
      isActive ? 'text-wedding-gold' : 'text-foreground'
    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-wedding-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left`;

  return (
    <nav className={navbarClasses}>
      <div className="container-wedding flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-wedding-rose" fill="currentColor" />
          <span className="font-playfair text-xl font-medium">Júlia & Miguel</span>
        </NavLink>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-1">
          <NavLink to="/" className={navLinkClasses}>
            Início
          </NavLink>
          <NavLink to="/our-story" className={navLinkClasses}>
            Nossa História
          </NavLink>
          <NavLink to="/event" className={navLinkClasses}>
            O Evento
          </NavLink>
          <NavLink to="/gifts" className={navLinkClasses}>
            Presentes
          </NavLink>
          <NavLink to="/rsvp" className={navLinkClasses}>
            RSVP
          </NavLink>
          <NavLink to="/gallery" className={navLinkClasses}>
            Galeria
          </NavLink>
          <NavLink to="/messages" className={navLinkClasses}>
            Mensagens
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 animate-fade-in">
          <div className="container-wedding flex flex-col space-y-2">
            <NavLink to="/" className="px-3 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Início
            </NavLink>
            <NavLink to="/our-story" className="px-3 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Nossa História
            </NavLink>
            <NavLink to="/event" className="px-3 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              O Evento
            </NavLink>
            <NavLink to="/gifts" className="px-3 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Presentes
            </NavLink>
            <NavLink to="/rsvp" className="px-3 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              RSVP
            </NavLink>
            <NavLink to="/gallery" className="px-3 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Galeria
            </NavLink>
            <NavLink to="/messages" className="px-3 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Mensagens
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
