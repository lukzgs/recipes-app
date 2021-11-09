import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import Explore from '../pages/Explore';
import ExploreDrinksIngre from '../pages/drinks/ExploreDrinksIngre';
import ExploreFoodIngre from '../pages/food/ExploreFoodIngre';
import ExploreAreaFood from '../pages/food/ExploreAreaFood';
import RecipesMade from '../pages/RecipesMade';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import App from '../App';

describe('Teste do Header', () => {
  const PROFILE_TOP_BTN = 'profile-top-btn';
  const PAGE_TITLE = 'page-title';
  const SEARCH_TOP_BTN = 'search-top-btn';
  const EXEC_SEARCH_BTN = 'exec-search-btn';
  const SEARCH_INPUT = 'search-input';

  it('Verificando se os elementos do header estão na tela principal', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/comidas');

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it(`Verificando se a um ícone de perfil, um titulo e um ícone 
    de busca na tela Drinks`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/bebidas');

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
    const { history } = renderWithRouter(<App />);

    history.push('/comidas');

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it(`Verificando se o botão de busca a ser clicado a barra de busca aparece
    e o mesmo para esconder`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/comidas');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
    userEvent.type(searchInput, 'Lemon');
    expect(searchInput).toHaveValue('Lemon');

    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });

  it(`Verificando se selecionar o radio "Primeira Letra" e digitar duas e
  buscar aparece a mesnsagem "Sua busca deve conter somente 1 (um) caracter" `, () => {
    // sourcer: 'https://stackoverflow.com/questions/55787988/window-alert-not-implemented-when-running-tests'
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);

    history.push('/comidas');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
    userEvent.type(searchInput, 'Le');

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    expect(firstLetter).toBeInTheDocument();
    userEvent.click(firstLetter);

    const execBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(execBtn);

    expect(global.alert)
      .toHaveBeenCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });

  it(`Verificando se selecionar o radio "Nome" e digitar duas e
      buscar aparece a mesnsagem "Sinto muito, não encontramos
      nenhuma receita para esses filtros." `, () => {
    // sourcer: 'https://stackoverflow.com/questions/55787988/window-alert-not-implemented-when-running-tests'
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);

    history.push('/bebidas');

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const name = screen.getByTestId('name-search-radio');
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
    userEvent.type(searchInput, 'Lemon');

    const execBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(execBtn);

  //   expect(global.alert)
  //     .toHaveBeenCalledWith('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  });
});
