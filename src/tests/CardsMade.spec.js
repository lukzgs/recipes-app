import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import RevenuesContex from '../context/RevenuesContex';
import RecipesMade from '../pages/RecipesMade';

const mockCardsMade = [{
  alcoholicOrNot: '',
  area: 'Turkish',
  category: 'Side',
  doneDate: '19/10/2021',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  tags: ['Soup'],
}, {
  alcoholicOrNot: 'Optional alcohol',
  area: '',
  category: 'Ordinary Drink',
  doneDate: '19/10/2021',
  id: '15997',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  name: 'GG',
  tags: [],
  type: 'Collins Glass',
},
];

describe('Cobertura do componente CardsMade', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Verificando se os botões estao na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/receitas-feitas');

    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnFood = screen.getByTestId('filter-by-food-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });

  it('verificando se os cards estao na tela', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockCardsMade));

    renderWithRouter(
      <RevenuesContex.Provider value>
        <RecipesMade />
      </RevenuesContex.Provider>,
    );

    const card0 = screen.getByTestId('0-horizontal-name');
    const card1 = screen.getByTestId('1-horizontal-name');
    expect(card0).toBeInTheDocument();
    expect(card1).toBeInTheDocument();
  });

  it('Verificando se o botão de filtro food esta funcionando', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockCardsMade));

    renderWithRouter(
      <RevenuesContex.Provider value>
        <RecipesMade />
      </RevenuesContex.Provider>,
    );

  });

  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
