
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Check } from 'lucide-react';

const Rsvp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: 'yes',
    guests: '0',
    dietaryRestrictions: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Aqui você implementaria a lógica para enviar os dados para o seu backend
  };
  
  return (
    <Layout>
      <div className="pt-24 pb-12 bg-wedding-cream">
        <div className="container-wedding">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Confirme sua Presença</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Por favor, preencha o formulário abaixo para confirmar sua presença no nosso casamento.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container-wedding max-w-3xl">
          {submitted ? (
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-playfair text-2xl mb-4">Obrigado pela sua confirmação!</h2>
              <p className="text-muted-foreground mb-6">
                Recebemos sua resposta e estamos felizes em saber que você fará parte deste momento tão especial.
                Se precisar fazer alguma alteração, entre em contato conosco.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-wedding-gold hover:underline"
              >
                Voltar ao formulário
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="attendance" className="block text-sm font-medium text-gray-700 mb-1">
                    Você irá comparecer? *
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                  >
                    <option value="yes">Sim, eu irei</option>
                    <option value="no">Infelizmente não poderei ir</option>
                    <option value="maybe">Ainda não tenho certeza</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    Número de acompanhantes
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                  >
                    <option value="0">Apenas eu</option>
                    <option value="1">1 acompanhante</option>
                    <option value="2">2 acompanhantes</option>
                    <option value="3">3 acompanhantes</option>
                    <option value="4">4 acompanhantes</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                    Restrições Alimentares
                  </label>
                  <input
                    type="text"
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    placeholder="Vegetariano, vegano, sem glúten, etc."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem para os Noivos (opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/50"
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-wedding-gold text-white px-8 py-3 rounded-full font-medium hover:bg-wedding-gold/90 transition-colors"
                >
                  Confirmar Presença
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Dúvidas? Entre em contato pelo e-mail: <a href="mailto:contato@juliamiguel.com" className="text-wedding-gold hover:underline">contato@juliamiguel.com</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rsvp;
