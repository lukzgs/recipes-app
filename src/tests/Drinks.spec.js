import React from 'react';
import { screen } from '@testing-library/dom';
import Drinks from '../pages/drinks/Drinks';
import renderWithRouter from './utils/renderWithRouter';
import DrinksInProgress from '../pages/drinks/DrinksInProgress';
import DrinksRecipes from '../pages/drinks/DrinksRecipes';
import ExploreDrinksIngre from '../pages/drinks/ExploreDrinksIngre';
import ExploreDrinks from '../pages/drinks/ExploreDrinks';

describe('Testes para passar no requisito 1 componente Drinks', () => {
  it('Verificando se existe um h1 no componente Drinks', () => {
    renderWithRouter(<Drinks />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'Drinks',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente DrinksInProgress', () => {
  it('Verificando se existe um h1 no componente DrinksInProgress', () => {
    renderWithRouter(<DrinksInProgress />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'DrinksInProgress',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente DrinksRecipes', () => {
  it('Verificando se existe um h1 no componente DrinksRecipes', () => {
    renderWithRouter(<DrinksRecipes />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'DrinksRecipes',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente ExploreDrinks', () => {
  it('Verificando se existe um h1 no componente ExploreDrinks', () => {
    renderWithRouter(<ExploreDrinks />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'ExploreDrinks',
    });
    expect(h1).toBeInTheDocument();
  });
});

describe('Testes para passar no requisito 1 componente ExploreDrinksIngre', () => {
  it('Verificando se existe um h1 no componente ExploreDrinksIngre', () => {
    renderWithRouter(<ExploreDrinksIngre />);

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'ExploreDrinksIngre',
    });
    expect(h1).toBeInTheDocument();
  });
});

// describe('Testes para passar no requisito 1 componente ', () => {
//   it('Verificando se existe um h1 no componente ', () => {
//     renderWithRouter();

//     const h1 = screen.getByRole('heading', {
//       level: 1,
//       name: '',
//     });
//     expect(h1).toBeInTheDocument();
//   });
// });
