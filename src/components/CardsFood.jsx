import React, { useContext } from 'react';
import RevenuesContex from '../context/RevenuesContex';

export const control = true;
const MAX_LENGTH = 11;

export function MapMeals(meals) {
  return (
    meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
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

export default function CardsFood() {
  const { revenues } = useContext(RevenuesContex);

  const revenuesTwelve = revenues.filter((revenue, index) => index <= MAX_LENGTH);

  // descobrir como arrumar esse segundo parametro
  return control ? MapMeals(revenuesTwelve) : MapMeals('valueFood');
}
