import React, { useContext, useState } from 'react';
import RevenuesContex from '../context/RevenuesContex';
import { SearchFood } from '../services/SearchFood';

const MAX_LENGTH = 4;

export default function MealsCatBtn() {
  const [toggle, setToggle] = useState('');
  const [unToggle, setUnToggle] = useState([]);

  const { mealsCat, setRevenues, revenues, search } = useContext(RevenuesContex);

  const eventHandler = async ({ target }) => {
    const { value } = target;
    setToggle(value);

    if (toggle === value || value === 'All') {
      setRevenues(unToggle);
      setToggle('');
    } else {
      const response = await SearchFood(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`,
      );
      setUnToggle(revenues);
      setRevenues(response.meals);
    }
  };

  const meals = mealsCat.filter((meal, index) => index <= MAX_LENGTH);

  return search ? (
    <form className="mt-3 col-13 mx-auto">
      { meals.map(({ strCategory }, index) => (
        <button
          className=" ml-3 mb-2 btn-sm btn btn-primary"
          style={ { width: '7em' } }
          key={ index }
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
        className=" ml-3 mb-2 btn-sm btn btn-primary"
        style={ { width: '7em' } }
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
