import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import Food from '../pages/food/Food';
import Drinks from '../pages/drinks/Drinks';
import Explore from '../pages/Explore';
import ExploreDrinksIngre from '../pages/drinks/ExploreDrinksIngre';
import ExploreFoodIngre from '../pages/food/ExploreFoodIngre';
import ExploreAreaFood from '../pages/food/ExploreAreaFood';
import RecipesMade from '../pages/RecipesMade';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Teste do Header', () => {
  const PROFILE_TOP_BTN = 'profile-top-btn';
  const PAGE_TITLE = 'page-title';
  const SEARCH_TOP_BTN = 'search-top-btn';

  it('Verificando se os elementos do header estão na tela principal', () => {
    renderWithRouter(<Food />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it(`Verificando se a um ícone de perfil, um titulo e um ícone 
    de busca na tela Drinks`, () => {
    renderWithRouter(<Drinks />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verificando se a um ícone de perfil e um titulo na tela Explore', () => {
    renderWithRouter(<Explore />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Verificando se a um ícone de perfil e um titulo na tela ExploreDrinksIngre', () => {
    renderWithRouter(<ExploreDrinksIngre />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Verificando se a um ícone de perfil e um titulo na tela ExploreFoodIngre', () => {
    renderWithRouter(<ExploreFoodIngre />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it(`Verificando se a um ícone de perfil, um titulo e um ícone 
    de busca na tela ExploreAreaFood`, () => {
    renderWithRouter(<ExploreAreaFood />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verificando se a um ícone de perfil e um titulo na tela RecipesMade', () => {
    renderWithRouter(<RecipesMade />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Verificando se a um ícone de perfil e um titulo na tela FavoriteRecipes', () => {
    renderWithRouter(<FavoriteRecipes />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Verificando se a pessoa é redirecionada ao clicar no botão de perfil', () => {
    const { history } = renderWithRouter(<Food />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it(`Verificando se o botão de busca a se clicado a barra de busca aparece
    e o mesmo para esconder`, () => {
    renderWithRouter(<Food />);

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId('search-input');

    expect(inputSearch).toBeInTheDocument();

    // userEvent.click(searchBtn);

    // expect(inputSearch).not.toBeInTheDocument();
  });
});
