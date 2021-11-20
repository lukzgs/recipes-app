import React, { useState } from 'react';
import Header from '../components/Header';
import CardsFavorites from '../components/cards/CardsFavorites';

function FavoriteRecipes() {
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
      <Header title="Receitas Favoritas" />
      <div className="d-flex justify-content-center my-2">
        <button
          data-testid="filter-by-all-btn"
          className="btn btn-primary mr-1 px-4"
          type="button"
          onClick={ handleClickAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          className="btn btn-primary mr-1 px-4"
          type="button"
          onClick={ handleClickFood }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          className="btn btn-primary px-4"
          type="button"
          onClick={ handleClickDrink }
        >
          Drinks
        </button>
      </div>
      <CardsFavorites filter={ filter } />
    </div>
  );
}

export default FavoriteRecipes;
