import React, { useContext } from 'react';
import RevenuesContex from '../context/RevenuesContex';

const MAX_LENGTH = 4;

export function MealsCatBtn() {
  const { mealsCat } = useContext(RevenuesContex);
  // const mealsFilter = mealsCat.filter((meal, category, index) => {
  //   const
  //   index <= MAX_LENGTH && category === { strCategory } ;
  // });

  const meals = mealsCat.filter((meal, index) => index <= MAX_LENGTH);
  console.log(meals);
  console.log(mealsCat);

  return (
    meals.map(({ strCategory }, index) => (
      <div key={ index }>
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      </div>
    ))
  );
}

export function DrinksCatBtn() {
  const { drinksCat } = useContext(RevenuesContex);
  const drinks = drinksCat.filter((meal, i) => i <= MAX_LENGTH);

  return (
    drinks.map(({ strCategory }, i) => (
      <div key={ i }>
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          // onClick={  }
        >
          { strCategory }
        </button>
      </div>
    ))
  );
}
