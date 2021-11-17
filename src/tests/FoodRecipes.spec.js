import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockFoodRecipe, mockFoodRecomendations } from './utils/mock';
import renderWithRouter from './utils/renderWithRouter';

describe('Receita de Comidas', () => {
  const pathWay = 'comidas/52771';
  const IMAGE_FOOD = 'recipe-photo';
  const TITLE_FOOD = 'recipe-title';
  const SHARE_BUTTON = 'share-btn';
  const FAVORITE_BUTTON = 'favorite-btn';
  const RECOMENDATIONS_LENGTH = 6;
  const INGREDIENTS_LENGTH = 8;
  const CONTINUE_RECIPE = 'start-recipe-btn';
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    history.push(pathWay);
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i),
      { timeout: 3000 });
  });
  it('Verfica se "Carregando..." aparece antes de mostar a receita', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pathWay);

    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });
  it('Verifica se a imagem e o título da comida aparece na tela', () => {
    const imageFood = screen.getByTestId(IMAGE_FOOD);
    const titleFood = screen.getByTestId(TITLE_FOOD);
    expect(imageFood).toBeInTheDocument();
    expect(titleFood).toBeInTheDocument();
  });
  it('Verifica se os botões "Compartilhar" e "Favoritar" estão na tela', () => {
    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON);
    const shareButton = screen.getByTestId(SHARE_BUTTON);
    expect(favoriteButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });
  it('Verifica se a categoria aparece na tela', () => {
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
  });
  it('Verifica se renderiza os ingredientes na tela', () => {
    const ingredients = mockFoodRecipe.map((food, index) => {
      const show = screen.getByTestId(`${index}-ingredient-name-and-measure`);
      return show;
    });
    expect(ingredients).toHaveLength(INGREDIENTS_LENGTH);
  });
  it('Verifica se as instruções estão na tela', () => {
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });
  it('Verifica se o vídeo aparece na Tela', () => {
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
  it('Verifica se as recomendações estão na tela', () => {
    const recomendations = mockFoodRecomendations.map((recomend, index) => {
      const recomende = screen.getByTestId(`${index}-recomendation-title`);
      return recomende;
    });
    expect(recomendations).toHaveLength(RECOMENDATIONS_LENGTH);
  });
  it(('Verifica se o botão "Continuar Receita" esta na tela'), () => {
    expect(screen.getByTestId(CONTINUE_RECIPE)).toBeInTheDocument();
  });
  it(('Verifica clique no botão'), () => {
    const continueButton = screen.getByTestId(CONTINUE_RECIPE);
    expect(continueButton).toBeInTheDocument();
    userEvent.click(continueButton);
    const finalButton = screen.getByTestId('finish-recipe-btn');
    expect(finalButton).toBeInTheDocument();
  });
});
