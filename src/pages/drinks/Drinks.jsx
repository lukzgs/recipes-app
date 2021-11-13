import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardsDrink from '../../components/cards/CardsDrink';
import { DrinksCatBtn } from '../../components/CategoryBtn';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" />
      <DrinksCatBtn />
      <CardsDrink />
      <Footer data-testid="drinks-bottom-btn" />
    </div>
  );
}

export default Drinks;
