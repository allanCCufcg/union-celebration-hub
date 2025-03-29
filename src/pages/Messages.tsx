
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Heart, Send } from 'lucide-react';

// Mensagens de exemplo
const initialMessages = [
  {
    id: 1,
    name: 'Ana e Carlos',
    message: 'Muita felicidade para vocês nessa nova jornada! Contem sempre conosco!',
    date: '15/03/2024'
  },
  {
    id: 2,
    name: 'Família Silva',
    message: 'Desejamos todas as bênçãos do mundo para o casal! Que o amor de vocês seja eterno!',
    date: '12/03/2024'
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    message: 'Parabéns pelo casamento! Que essa união seja repleta de momentos felizes e muito companheirismo!',
    date: '10/03/2024'
  }
];

const Messages: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState({
    name: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você implementaria a lógica para enviar a mensagem para o seu backend
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    
    const message = {
      id: messages.length + 1,
      name: newMessage.name,
      message: newMessage.message,
      date: formattedDate
    };
    
    setMessages([message, ...messages]);
    setNewMessage({ name: '', message: '' });
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <Layout>
      <div className="pt-24 pb-12 bg-wedding-cream">
        <div className="container-wedding">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Mural de Mensagens</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deixe uma mensagem carinhosa para os noivos.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container-wedding max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h3 className="font-playfair text-2xl mb-6 text-center">Deixe sua mensagem</h3>
            
            {submitted && (
              <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md">
                Sua mensagem foi enviada com sucesso! Obrigado pelo carinho.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newMessage.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={newMessage.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center bg-wedding-gold text-white px-6 py-3 rounded-full font-medium hover:bg-wedding-gold/90 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-playfair text-2xl mb-6 text-center">Mensagens de Carinho</h3>
            
            {messages.map((message) => (
              <div 
                key={message.id} 
                className="bg-white p-6 rounded-lg shadow-md border border-wedding-rose/10"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-wedding-rose mr-2" fill="currentColor" />
                    <h4 className="font-medium">{message.name}</h4>
                  </div>
                  <span className="text-sm text-muted-foreground">{message.date}</span>
                </div>
                <p className="text-muted-foreground">{message.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Messages;
