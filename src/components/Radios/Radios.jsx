import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SwitchFood } from '../../services/SearchFood';
import { SwitchDrink } from '../../services/SwitchDrink';
import RevenuesContex from '../../context/RevenuesContex';

function Radios({ value }) {
  const [name, setName] = useState('');

  const history = useHistory();

  const { setRevenues, revenues } = useContext(RevenuesContex);

  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/comidas') {
      return revenues.length === 1
        ? history.push(`/comidas/${revenues[0].idMeal}`) : undefined;
    }
    if (pathname === '/bebidas') {
      return revenues.length === 1
        ? history.push(`/bebidas/${revenues[0].idDrink}`) : undefined;
    }
  }, [history, revenues, pathname]);

  const handleClick = async () => {
    if (name === 'first-letter' && value.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const response = pathname === '/comidas'
      ? await SwitchFood(name, value)
      : await SwitchDrink(name, value);

    if (pathname === '/comidas') await setRevenues(response.meals);
    if (pathname === '/bebidas') await setRevenues(response.drinks);
  };

  return (
    <form>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          id="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          name="filter"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          data-testid="name-search-radio"
          type="radio"
          value="name"
          name="filter"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          id="first-letter"
          data-testid="first-letter-search-radio"
          type="radio"
          value="first-letter"
          name="filter"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar

      </button>
    </form>
  );
}

Radios.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Radios;
