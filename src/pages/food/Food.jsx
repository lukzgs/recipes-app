import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../index.css';
import MealsCatBtn from '../../components/MealsCatBtn';
import CardsFood from '../../components/cards/CardsFood';

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
