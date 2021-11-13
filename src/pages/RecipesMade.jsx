import React from 'react';
import CardsMade from '../components/cards/CardsMade';
import Header from '../components/Header';

function RecipesMade() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      <CardsMade />
    </div>
  );
}

export default RecipesMade;
