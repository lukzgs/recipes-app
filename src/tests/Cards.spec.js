import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsFood from '../components/CardsFood';
import CardsDrink from '../components/CardsDrink';
import RevenuesContex from '../context/RevenuesContex';

const mockFood = [{
  idMeal: '52768',
  strMeal: 'Apple Frangipan Tart',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
}, {
  idMeal: '52893',
  strMeal: 'Apple & Blackberry Crumble',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
}];

const mockDrink = [{
  idDrink: '17222',
  strDrink: 'A1',
  strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
}, {
  idDrink: '13501',
  strDrink: 'ABC',
  strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
},
];

describe('Teste dos Cards', () => {
  it('Verificando se os cards aparecem na tela do Food', () => {
    render(
      <RevenuesContex.Provider value={ { revenues: mockFood } }>
        <CardsFood />
      </RevenuesContex.Provider>,
    );
    const mockRevenues = mockFood.map((revenue, index) => screen
      .getByTestId(`${index}-recipe-card`));
    expect(mockRevenues).toHaveLength(2);
  });

  it('Verificando se os cards aparecem na tela do Food', () => {
    render(
      <RevenuesContex.Provider value={ { revenues: mockDrink } }>
        <CardsDrink />
      </RevenuesContex.Provider>,
    );
    const mockRevenues = mockDrink.map((revenue, index) => screen
      .getByTestId(`${index}-recipe-card`));
    expect(mockRevenues).toHaveLength(2);
  });
});
