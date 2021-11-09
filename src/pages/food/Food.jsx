import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../index.css';
import CardsFood from '../../components/CardsFood';

export default function Food() {
  return (
    <div>
      <Header title="Comidas" />
      <CardsFood />
      <Footer />
    </div>
  );
}
