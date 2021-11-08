import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" />
      <h1>Drinks</h1>
      <Footer data-testid="drinks-bottom-btn" />
    </div>
  );
}

export default Drinks;
