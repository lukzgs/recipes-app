import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <h1>ExploreDrinks</h1>
      <Footer data-testid="drinks-bottom-btn" />
    </div>
  );
}

export default ExploreDrinks;
