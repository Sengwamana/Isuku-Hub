import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import FeatureCards from '../components/FeatureCards';
import PhoneShowcase from '../components/PhoneShowcase';
import SmartManagement from '../components/SmartManagement';
import Impact from '../components/Impact';
import CTA from '../components/CTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeatureCards />
      <PhoneShowcase />
      <SmartManagement />
      <Impact />
      <CTA />
    </>
  );
};

export default Home;