import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando componente Profile', () => {
  const EMAIL_VALIDAD = 'email@algo.com';
  const ID_EMAIL = 'email-input';
  const ID_PASSWORD = 'password-input';
  const ID_BTN = 'login-submit-btn';
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
  // it('Verificando If/else', () => {
  //   renderWithRouter(<Profile />);
  //   localStorage.setItem('user', '{"email":"xxx@mail.com",}');

  //   const local = localStorage.getItem('user');
  //   console.log(local);

  //   const usuario = screen.getByText(local.email);

  //   expect(usuario).toBeInTheDocument();
  // });
  it('Verificando se ao o perfil NAme', () => {
    const { history } = renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    const inputPassword = screen.getByTestId(ID_PASSWORD);
    const btn = screen.getByTestId(ID_BTN);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(inputEmail, EMAIL_VALIDAD);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');

    // const perfil = screen.getByTestId('profile-top-btn');

    // userEvent.click(perfil);

    // expect(pathname).toBe('/perfil');

    // const nomePerfil = screen.getByTestId('profile-email');

    // expect(nomePerfil).toBeInTheDocument();
  });
});
