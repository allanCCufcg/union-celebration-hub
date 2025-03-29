
import React from 'react';
import Layout from '../components/Layout';

// Imagens de exemplo para a galeria
const galleryImages = [
  'https://images.unsplash.com/photo-1522057384400-681b421cfefc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
];

const Gallery: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-12 bg-wedding-cream">
        <div className="container-wedding">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Nossa Galeria</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Momentos especiais da nossa história e, em breve, do nosso grande dia.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container-wedding">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg transform hover:scale-[1.02] duration-300"
              >
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Após o casamento, compartilharemos aqui mais fotos da nossa celebração!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
