import { screen, waitForElementToBeRemoved } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import { mockAreaFoodExplore } from './utils/mock';
import renderWithRouter from './utils/renderWithRouter';

describe('Página Explorar Area Comida', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');
  });

  afterEach(() => jest.clearAllMocks());

  it('Verifica se a imagem do usuário aparece na tela', () => {
    const profile = screen.getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
  });
  it('Verifica se o títtulo esta na página', () => {
    const title = screen.getByText(/explorar origem/i);
    expect(title).toBeInTheDocument();
  });
  it('Verifica se o ícone de pesquisa esta na tela', () => {
    const icon = screen.getByTestId('search-top-btn');
    expect(icon).toBeInTheDocument();
  });
  it('Verifica se "ExploreAreaFood" esta na tela', () => {
    const exploreArea = screen.getByText(/explore area food/i);
    expect(exploreArea).toBeInTheDocument();
  });
  it('Verifica se o dropdownSelect esta na tela', () => {
    const dropdownSelect = screen.getByTestId('explore-by-area-dropdown');
    expect(dropdownSelect).toBeInTheDocument();
  });
  it('Verifica se renderiza receitas', async () => {
    await waitForElementToBeRemoved(() => screen.getAllByText('Carregando..'),
      { timeout: 3000 });
    const INGREDIENTS_LENGTH = 11;
    const recipes = mockAreaFoodExplore.map((recipe, index) => {
      const show = screen.getByTestId(`${index}-recipe-card`);
      return show;
    });
    expect(recipes).toHaveLength(INGREDIENTS_LENGTH);
  });
});
