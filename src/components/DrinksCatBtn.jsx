import React, { useContext, useState } from 'react';
import RevenuesContex from '../context/RevenuesContex';
import { SearchDrink } from '../services/SearchDrink';

const MAX_LENGTH = 4;

function DrinksCatBtn() {
  const [toggle, setToggle] = useState('');

  const { drinksCat, setDrinks, search } = useContext(RevenuesContex);

  const eventHandler = async ({ target }) => {
    const { value } = target;
    setToggle(value);

    if (toggle === value || value === 'All') {
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

  const drinks = drinksCat.filter((drink, i) => i <= MAX_LENGTH);

  return search ? (
    <form className="mt-2 col-16 mx-auto">
      { drinks.map(({ strCategory }, i) => (
        <button
          className=" ml-1 mb-1 btn-sm btn btn-dark"
          style={ { width: '11.5em', fontSize: '10px' } }
          key={ i }
          type="button"
          id={ `${strCategory}-category-btn` }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ eventHandler }
        >
          { strCategory }
        </button>
      ))}
      <button
        className=" ml-1 mb-1 btn-sm btn btn-dark"
        style={ { width: '11.5em', fontSize: '10px' } }
        type="button"
        id="All-category-btn"
        value="All"
        data-testid="All-category-filter"
        onClick={ eventHandler }
      >
        All
      </button>
    </form>
  ) : (
    null
  );
}

export default DrinksCatBtn;
