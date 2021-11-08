import React from 'react';
import { screen } from '@testing-library/dom';
import ExploreAreaFood from '../pages/food/ExploreAreaFood';
import ExploreFood from '../pages/food/ExploreFood';
import ExploreFoodIngre from '../pages/food/ExploreFoodIngre';
import Food from '../pages/food/Food';
import FoodInProgress from '../pages/food/FoodInProgress';
import FoodRecipes from '../pages/food/FoodRecipes';
import Explore from '../pages/Explore';
import renderWithRouter from './utils/renderWithRouter';
import Profile from '../pages/Profile';
import RecipesMade from '../pages/RecipesMade';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testes para passar no requisito 1 componente ExploreAreaFood', () => {
  it('Verificando se existe um h1 no componente ExploreAreaFood', () => {
    renderWithRouter(<ExploreAreaFood />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'ExploreAreaFood',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente ExploreFood', () => {
  it('Verificando se existe um h1 no componente ExploreFood', () => {
    renderWithRouter(<ExploreFood />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'ExploreFood',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente ExploreFoodIngre', () => {
  it('Verificando se existe um h1 no componente ExploreFoodIngre', () => {
    renderWithRouter(<ExploreFoodIngre />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'ExploreFoodIngre',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente Food', () => {
  it('Verificando se existe um h1 no componente Food', () => {
    renderWithRouter(<Food />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'Food',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente FoodInProgress', () => {
  it('Verificando se existe um h1 no componente FoodInProgress', () => {
    renderWithRouter(<FoodInProgress />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'FoodInProgress',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente FoodRecipes', () => {
  it('Verificando se existe um h1 no componente FoodRecipes', () => {
    renderWithRouter(<FoodRecipes />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'FoodRecipes',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente Explore', () => {
  it('Verificando se existe um h1 no componente Explore', () => {
    renderWithRouter(<Explore />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'Explore',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente RecipesMade', () => {
  it('Verificando se existe um h1 no componente RecipesMade', () => {
    renderWithRouter(<RecipesMade />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'RecipesMade',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente Profile', () => {
  it('Verificando se existe um h1 no componente Profile', () => {
    renderWithRouter(<Profile />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'Profile',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente FavoriteRecipes', () => {
  it('Verificando se existe um h1 no componente FavoriteRecipes', () => {
    renderWithRouter(<FavoriteRecipes />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'FavoriteRecipes',
    });
    expect(h1).toBeInTheDocument();
  });
});
