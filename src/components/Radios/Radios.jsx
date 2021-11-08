import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import switchFood from '../../services/SeachFood';
import switchDrink from '../../services/SeachDrink';

function Radios({ value }) {
  const [name, setName] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  const handleClick = () => {
    if (name === 'first-letter' && value.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    return pathname === '/comidas' ? switchFood(name, value) : switchDrink(name, value);
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
