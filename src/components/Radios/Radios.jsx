import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { switchRadios } from '../../services/SeachFood';

function Radios({ value }) {
  const [name, setName] = useState('');
  // const alert = useAlert();

  const handleClick = () => {
    if (name === 'first-letter'
    && value.length > 1) alert('Sua busca deve conter somente 1 (um) caracter');
    switchRadios(name, value);
    console.log(value);
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
