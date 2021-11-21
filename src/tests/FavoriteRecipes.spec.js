import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste dos Cards', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');
  });

  it('Verificando se os cards aparecem na tela do All', () => {
    const btnfilterall = screen.getByTestId('filter-by-all-btn');
    userEvent.click(btnfilterall);
    expect(btnfilterall).toBeInTheDocument();
  });
  it('Verificando se os cards aparecem na tela do Food', () => {
    const btnfilterfood = screen.getByTestId('filter-by-food-btn');
    userEvent.click(btnfilterfood);
    expect(btnfilterfood).toBeInTheDocument();
  });
  it('Verificando se os cards aparecem na tela do Drink', () => {
    const btnfilterdrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnfilterdrink);
    expect(btnfilterdrink).toBeInTheDocument();
  });
});
