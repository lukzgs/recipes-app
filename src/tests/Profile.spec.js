import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando componente Profile', () => {
  it('Testando se no componente Profile ao clicar no botão sair.', () => {
    const { history } = renderWithRouter(<Profile />);
    const btn = screen.getByTestId('profile-logout-btn');
    userEvent.click(btn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Verificando se o botão profile-done-btn está na pagina', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnDone = screen.getByTestId('profile-done-btn');
    expect(btnDone).toBeInTheDocument();

    userEvent.click(btnDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });

  it('Verificando se o botão receitas-favoritas está na pagina', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnFavoritas = screen.getByTestId('profile-favorite-btn');
    expect(btnFavoritas).toBeInTheDocument();

    userEvent.click(btnFavoritas);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });
  it('Verificando se na tela de perfil aparece o localStorage com email', () => {
    renderWithRouter(<Profile />);

    const userLocal = { email: 'email@email.com' };

    localStorage.setItem('user', JSON.stringify(userLocal));
    const user = localStorage.getItem('user');

    expect(user).toStrictEqual('{"email":"email@email.com"}');
  });
  it('Verificando se ao o perfil email será criado com null', () => {
    renderWithRouter(<Profile />);

    const userLocal = { '': '' };

    localStorage.setItem('user', JSON.stringify(userLocal));
    const user = localStorage.getItem('user');
    console.log(user);

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument(false);
  });
});
