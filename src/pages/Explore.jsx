import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../css/explorer/index.css';

function Explore() {
  return (
    <div>
      <Header title="Explorar" className="titleExplore" />
      <div className="d-flex align-items-center flex-column bd-highlight mb-3 center-top">
        <Link to="/explorar/comidas">
          <button
            className="my-5 btn btn-dark larg-btn"
            type="submit"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="mb-5 btn btn-dark larg-btn"
            type="submit"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer data-testid="explore-bottom-btn" />
    </div>
  );
}

export default Explore;
