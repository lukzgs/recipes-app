import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <h1>Explore</h1>
      <Footer data-testid="explore-bottom-btn" />
    </div>
  );
}

export default Explore;
