import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../../context/RevenuesContex';
import { MAX_LENGTH } from '../../global/constantesGlobais';

function CardsFood() {
  const { revenues } = useContext(RevenuesContex);

  const revenuesTwelve = revenues.filter((revenue, index) => index <= MAX_LENGTH);

  return (
    revenuesTwelve.map(({ idMeal, strMealThumb, strMeal }, index) => (
      <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
        <div data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            style={ { height: '5em' } }
            src={ strMealThumb }
            alt={ strMeal }
          />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      </Link>
    ))
  );
}

export default CardsFood;
