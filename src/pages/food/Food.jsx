import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../index.css';
import CardsFood from '../../components/CardsFood';
import { MealsCatBtn } from '../../components/CategoryBtn';

export default function Food() {
  return (
    <div>
      <Header title="Comidas" />
      <MealsCatBtn />
      <CardsFood param="meals" />
      <Footer />
    </div>
  );
}
