import React, { useContext, useState } from 'react';
import RevenuesContex from '../context/RevenuesContex';
import { SearchFood } from '../services/SearchFood';
import { SearchDrink } from '../services/SearchDrink';

const MAX_LENGTH = 4;

export function MealsCatBtn() {
  const { mealsCat, setRevenues } = useContext(RevenuesContex);
  const [toggle, setToggle] = useState('');

  const eventHandler = async ({ target }) => {
    const { value } = target;
    setToggle(value);

    if (toggle === value) {
      const response = await SearchFood(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      setRevenues(response.meals);
      setToggle('');
    } else {
      const response = await SearchFood(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`,
      );
      setRevenues(response.meals);
    }
  };

  const meals = mealsCat.filter((meal, index) => index <= MAX_LENGTH);

  return (
    meals.map(({ strCategory }, index) => (
      <div key={ index }>
        <button
          type="button"
          id={ `${strCategory}-category-btn` }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ eventHandler }
        >
          { strCategory }
        </button>
      </div>
    ))
  );
}

export function DrinksCatBtn() {
  const { drinksCat, setDrinks } = useContext(RevenuesContex);
  const [toggle, setToggle] = useState('');

  const eventHandler = async ({ target }) => {
    const { value } = target;
    setToggle(value);

    if (toggle === value) {
      const response = await SearchDrink(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      setDrinks(response.drinks);
      setToggle('');
    } else {
      const response = await SearchDrink(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`,
      );
      setDrinks(response.drinks);
    }
  };

  const drinks = drinksCat.filter((meal, i) => i <= MAX_LENGTH);

  return (
    drinks.map(({ strCategory }, i) => (
      <div key={ i }>
        <button
          type="button"
          id={ `${strCategory}-category-btn` }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ eventHandler }
        >
          { strCategory }
        </button>
      </div>
    ))
  );
}
