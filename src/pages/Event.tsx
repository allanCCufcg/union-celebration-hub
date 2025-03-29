
import React from 'react';
import Layout from '../components/Layout';
import EventInfo from '../components/event/EventInfo';

const Event: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-12 bg-wedding-cream">
        <div className="container-wedding">
          <div className="text-center">
            <h1 className="heading-lg mb-4">O Evento</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todos os detalhes sobre a nossa cerimônia e recepção.
            </p>
          </div>
        </div>
      </div>
      
      <EventInfo />
    </Layout>
  );
};

export default Event;
