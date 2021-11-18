import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Página "Explorar Comidas"', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
  });
  it('Verifica se existe uma imagem de perfil', () => {
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  it('Verifica se existe o título "Explorar Comidas" na tela', () => {
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
  it('Verifica se a área de Explorar Comidas está na tela,'
    + ' e os botões "Por Ingredientes", "Por Local de Origem","Me surpreenda"', () => {
    expect(screen.getByTestId('explore-food')).toBeInTheDocument();
    const ingredients = screen.getByTestId('explore-by-ingredient');
    const originLocal = screen.getByTestId('explore-by-area');
    const surprise = screen.getByTestId('explore-surprise');
    expect(ingredients).toBeInTheDocument();
    expect(originLocal).toBeInTheDocument();
    expect(surprise).toBeInTheDocument();
  });
  it('Verifica se ao clicar em "Por Ingredientes" muda a rota', () => {
    const button = screen.getByTestId('explore-by-ingredient');
    userEvent.click(button);
    expect(screen.getByText(/explorar ingredientes/i)).toBeInTheDocument();
  });
  it('Verifica se ao clicar em "Por Local de Origem" muda a rota', () => {
    const button = screen.getByTestId('explore-by-area');
    userEvent.click(button);
    expect(screen.getByText(/explorar origem/i)).toBeInTheDocument();
  });
  it('Verifica se ao clicar em "Me Surpreenda" muda a rota', () => {
    const button = screen.getByTestId('explore-surprise');
    userEvent.click(button);
  });
});
