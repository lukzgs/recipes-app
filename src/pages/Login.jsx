import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const CARACTER_MIN = 6;
  const VALIDATE_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <div>
      <form onSubmit={ handleClick }>
        <input
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={
            password.length <= CARACTER_MIN
            || email.search(VALIDATE_EMAIL) !== 0
          }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
