
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import Countdown from '../components/home/Countdown';
import Welcome from '../components/home/Welcome';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Countdown />
      <Welcome />
    </Layout>
  );
};

export default Index;
