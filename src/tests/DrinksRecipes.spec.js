import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockDrinkRecipe, mockDrinkRecomendations } from './utils/mock';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Receita de Bebidas', () => {
  const IMAGE_DRINK = 'recipe-photo';
  const TITLE_DRINK = 'recipe-title';
  const FAVORITE_BUTTON = 'favorite-btn';
  const SHARE_BUTTON = 'share-btn';
  const CONTINUE_RECIPE = 'start-recipe-btn';
  const pathWay = '/bebidas/17222';
  const INGREDIENTS_LENGTH = 4;

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
  it('Verifica se a imagem e o título da bebida aparece na tela', () => {
    const imageDrink = screen.getByTestId(IMAGE_DRINK);
    const titleDrink = screen.getByTestId(TITLE_DRINK);
    expect(imageDrink).toBeInTheDocument();
    expect(titleDrink).toBeInTheDocument();
  });
  it('Verifica se os botões "Compartilhar" e "Favoritar" estão na tela', () => {
    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON);
    const shareButton = screen.getByTestId(SHARE_BUTTON);
    expect(favoriteButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });
  it('Verifica se a categoria da Receita esta na tela', async () => {
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
  });
  it('Verifica se renderiza os ingredientes na tela', () => {
    const ingredients = mockDrinkRecipe.map((drink, index) => {
      const show = screen.getByTestId(`${index}-ingredient-name-and-measure`);
      return show;
    });
    expect(ingredients).toHaveLength(INGREDIENTS_LENGTH);
  });
  it('Verifica se as instruções estão na tela', () => {
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });
  it('Verifica se as recomendações estão na tela', () => {
    mockDrinkRecomendations.map((recomend, index) => expect(screen
      .getByTestId(`${index}-recomendation-title`)).toBeInTheDocument());
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
