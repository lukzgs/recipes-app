import React, { useContext } from 'react';
import RevenuesContex from '../context/RevenuesContex';

const MAX_LENGTH = 11;

function CardsFood() {
  const { revenues } = useContext(RevenuesContex);
  const revenuesTwelve = revenues.filter((revenue, index) => index <= MAX_LENGTH);
  return (
    revenuesTwelve.map(({ idMeal, strMealThumb, strMeal }, index) => (
      <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          style={ { height: '5em' } }
          src={ strMealThumb }
          alt={ strMeal }
        />
        <p data-testid={ `${index}-card-name` }>{strMeal}</p>
      </div>
    ))
  );
}

export default CardsFood;
