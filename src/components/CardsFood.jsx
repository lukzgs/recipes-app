import React, { useContext } from 'react';
import RevenuesContex from '../context/RevenuesContex';

function CardsFood() {
  const { revenues } = useContext(RevenuesContex);
  return (
    revenues.map(({ idMeal, strMealThumb, strMeal }) => (
      <div key={ idMeal } data-testid={ `${idMeal}-recipe-card` }>
        <img
          data-testid={ `${idMeal}-card-img` }
          style={ { height: '5em' } }
          src={ strMealThumb }
          alt={ strMeal }
        />
        <p data-testid={ `${idMeal}-card-name` }>{strMeal}</p>
      </div>
    ))
  );
}

export default CardsFood;
