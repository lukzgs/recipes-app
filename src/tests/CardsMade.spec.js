import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
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

const TEST_ID_FOOD = '0-horizontal-name';
const TEST_ID_DRINK = '1-horizontal-name';

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

    const cardFood = screen.getByTestId(TEST_ID_FOOD);
    const cardDrink = screen.getByTestId(TEST_ID_DRINK);
    expect(cardFood).toBeInTheDocument();
    expect(cardDrink).toBeInTheDocument();
  });

  it('Verificando se o botão de filtro food esta funcionando', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockCardsMade));

    renderWithRouter(
      <RevenuesContex.Provider value>
        <RecipesMade />
      </RevenuesContex.Provider>,
    );
    const cardFood = screen.getByTestId(TEST_ID_FOOD);
    const cardDrink = screen.getByTestId(TEST_ID_DRINK);
    const btnFood = screen.getByTestId('filter-by-food-btn');

    fireEvent.click(btnFood);
    expect(cardFood).toBeInTheDocument();
    expect(cardDrink).not.toBeInTheDocument();
  });

  it('Verificando se o botão de filtro drink esta funcionando', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockCardsMade));

    renderWithRouter(
      <RevenuesContex.Provider value>
        <RecipesMade />
      </RevenuesContex.Provider>,
    );
    const cardFood = screen.getByTestId(TEST_ID_FOOD);
    const cardDrink = screen.getByTestId(TEST_ID_DRINK);
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    const btnAll = screen.getByTestId('filter-by-all-btn');

    fireEvent.click(btnDrink);
    expect(cardFood).not.toBeInTheDocument();
    expect(cardDrink).toBeInTheDocument();
    fireEvent.click(btnAll);
  });
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
