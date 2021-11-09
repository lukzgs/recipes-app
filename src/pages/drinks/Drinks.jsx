import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardsDrink from '../../components/CardsDrink';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" />
      <CardsDrink />
      <Footer data-testid="drinks-bottom-btn" />
    </div>
  );
}

export default Drinks;
