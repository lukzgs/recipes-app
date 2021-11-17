import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SwitchDrink } from '../../services/SearchDrink';

function ExploreDrinks() {
  const history = useHistory();

  const handleClickRandom = async () => {
    const result = await SwitchDrink('random');
    const id = result.drinks[0].idDrink;
    history.push(`/bebidas/${id}`);
  };
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div data-testid="explore-drinks">
        <h1>Explore Drinks</h1>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="submit"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/explorar/bebidas">
          <button
            type="submit"
            data-testid="explore-surprise"
            onClick={ handleClickRandom }
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer data-testid="drinks-bottom-btn" />
    </div>
  );
}

export default ExploreDrinks;
