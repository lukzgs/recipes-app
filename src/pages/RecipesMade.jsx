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
      <div className="d-flex justify-content-center my-2">
        <button
          className="btn btn-primary mr-1 px-4"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleClickAll }
        >
          All
        </button>
        <button
          className="btn btn-primary mr-1 px-4"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ handleClickFood }
        >
          Food
        </button>
        <button
          className="btn btn-primary px-4"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleClickDrink }
        >
          Drinks
        </button>
      </div>
      <CardsMade filter={ filter } />
    </div>
  );
}

export default RecipesMade;
