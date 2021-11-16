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
      <h1>FavoriteRecipes</h1>
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
      <CardsFavorites filter={ filter } />
    </div>
  );
}

export default FavoriteRecipes;
