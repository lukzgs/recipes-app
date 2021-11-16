import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreFood() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <h1>ExploreFood </h1>
      <Footer data-testid="food-bottom-btn" />
    </div>
  );
}

export default ExploreFood;
