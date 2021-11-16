import React, { useContext, useState } from 'react';
import RevenuesContex from '../context/RevenuesContex';
import { SearchFood } from '../services/SearchFood';

const MAX_LENGTH = 4;

export default function MealsCatBtn() {
  const { mealsCat, setRevenues, revenues } = useContext(RevenuesContex);
  const [toggle, setToggle] = useState('');
  const [unToggle, setUnToggle] = useState([]);
  // os comments abaixo são para evitar que o usuário aperte o botão mais de uma vez
  // e chame de novo a api com o conteúdo com que já foi chamado anteriormente.
  // const [previousFood, setPreviousFood] = useState([]);

  const eventHandler = async ({ target }) => {
    const { value } = target;
    setToggle(value);

    if (toggle === value || value === 'All') {
      setRevenues(unToggle);
      setToggle('');
    } else {
      // if (value === response.meals) {
      //   setRevenues(previousFood);
      // }
      const response = await SearchFood(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`,
      );
      // setPreviousFood(response.meals);
      setUnToggle(revenues);
      setRevenues(response.meals);
    }
  };

  const meals = mealsCat.filter((meal, index) => index <= MAX_LENGTH);
  return (
    <form>
      { meals.map(({ strCategory }, index) => (
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
      ))}
      <button
        type="button"
        id="All-category-btn"
        value="All"
        data-testid="All-category-filter"
        onClick={ eventHandler }
      >
        All
      </button>
    </form>
  );
}
