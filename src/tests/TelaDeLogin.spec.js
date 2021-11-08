import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes da pagina de login', () => {
  const EMAIL_VALIDAD = 'email@algo.com';
  const ID_EMAIL = 'email-input';
  const ID_PASSWORD = 'password-input';
  const ID_BTN = 'login-submit-btn';

  it('verificando se a dois inputs e um botão na tela', () => {
    render(<Login />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    const inputPassword = screen.getByTestId(ID_PASSWORD);
    const btn = screen.getByTestId(ID_BTN);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('Verificando se da pra digitar no inputEmail', () => {
    render(<Login />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, 'email');
    expect(inputEmail.value).toBe('email');
  });

  it('Verificando se da pra digitar no inputPassword', () => {
    render(<Login />);

    const inputPassword = screen.getByTestId(ID_PASSWORD);
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputPassword, '12345');
    expect(inputPassword.value).toBe('12345');
  });

  it(`Verificando se o botão esta desabilidado caso 
    nao esteja preenchido corretamente`, () => {
    render(<Login />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    const inputPassword = screen.getByTestId(ID_PASSWORD);
    const btn = screen.getByTestId(ID_BTN);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(inputEmail, 'email');
    userEvent.type(inputPassword, '1234567');
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, EMAIL_VALIDAD);
    userEvent.type(inputPassword, '1234');
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, EMAIL_VALIDAD);
    userEvent.type(inputPassword, '1234567');
    expect(btn).toBeEnabled();
  });

  it('Verificando se salva o "mealsToken" ao logar no app receitas', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    const inputPassword = screen.getByTestId(ID_PASSWORD);
    const btn = screen.getByTestId(ID_BTN);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(inputEmail, EMAIL_VALIDAD);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btn);

    const local = JSON.parse(localStorage.getItem('mealsToken'));

    expect(local).toBe(1);
  });

  it('Verificando se salva o "cocktailsToken" ao logar no app receitas', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    const inputPassword = screen.getByTestId(ID_PASSWORD);
    const btn = screen.getByTestId(ID_BTN);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(inputEmail, EMAIL_VALIDAD);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btn);

    const local = JSON.parse(localStorage.getItem('cocktailsToken'));

    expect(local).toBe(1);
  });

  it('Verificando se salva o "user" ao logar no app receitas', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    const inputPassword = screen.getByTestId(ID_PASSWORD);
    const btn = screen.getByTestId(ID_BTN);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(inputEmail, EMAIL_VALIDAD);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btn);

    const local = JSON.parse(localStorage.getItem('user'));

    expect(local).toStrictEqual({ email: EMAIL_VALIDAD });
  });

  it('Verificando se ao clicar no botão é redirecionado para a "/comidas"', () => {
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
  });
});
