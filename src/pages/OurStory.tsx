
import React from 'react';
import Layout from '../components/Layout';
import Timeline from '../components/our-story/Timeline';

const OurStory: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-12 bg-wedding-cream">
        <div className="container-wedding">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Nossa História</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Como tudo começou e os momentos especiais que nos trouxeram até aqui.
            </p>
          </div>
        </div>
      </div>
      
      <Timeline />
    </Layout>
  );
};

export default OurStory;
