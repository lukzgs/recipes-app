import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardsDrink from '../../components/CardsDrink';
import DrinksCatBtn from '../../components/DrinksCatBtn';

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
