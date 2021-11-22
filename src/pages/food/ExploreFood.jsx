import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SwitchFood } from '../../services/SearchFood';

import '../../css/explorer/index.css';

function ExploreFood() {
  const history = useHistory();

  const handleClickRandom = async () => {
    const result = await SwitchFood('random');
    const id = result.meals[0].idMeal;
    history.push(`/comidas/${id}`);
  };

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div
        className="d-flex align-items-center flex-column bd-highlight mb-3 center-top"
        data-testid="explore-food"
      >
        <Link to="/explorar/comidas/ingredientes">
          <button
            className="my-5 btn btn-dark larg-btn"
            type="submit"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            className="my-5 btn btn-dark larg-btn"
            type="submit"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to="/explorar/comidas/">
          <button
            className="my-5 btn btn-dark larg-btn"
            type="submit"
            data-testid="explore-surprise"
            onClick={ handleClickRandom }
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer data-testid="food-bottom-btn" />
    </div>
  );
}

export default ExploreFood;
