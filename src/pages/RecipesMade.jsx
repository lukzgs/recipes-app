import React, { useState } from 'react';
import CardsMade from '../components/cards/CardsMade';
import Header from '../components/Header';

function RecipesMade() {
  const [filter, setFilter] = useState('all');

  const handleClickAll = () => {
    setFilter('all');
  };
  const handleClickFood = () => {
    setFilter('food');
  };
  const handleClickDrink = () => {
    setFilter('drink');
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ handleClickAll }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ handleClickFood }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ handleClickDrink }
      >
        Drinks
      </button>
      <CardsMade filter={ filter } />
    </div>
  );
}

export default RecipesMade;
