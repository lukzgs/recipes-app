import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SwitchFood } from '../../services/SearchFood';
import { SwitchDrink } from '../../services/SearchDrink';
import RevenuesContex from '../../context/RevenuesContex';

function Radios({ value }) {
  const [name, setName] = useState('');

  const history = useHistory();

  const { setRevenues, revenues, setDrinks, drinks } = useContext(RevenuesContex);

  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/comidas') {
      return revenues.length === 1
        ? history.push(`/comidas/${revenues[0].idMeal}`) : undefined;
    }
    if (pathname === '/bebidas') {
      return drinks.length === 1
        ? history.push(`/bebidas/${drinks[0].idDrink}`) : undefined;
    }
  }, [history, revenues, pathname, drinks]);

  const handleClick = async () => {
    if (name === 'first-letter' && value.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const response = pathname === '/comidas'
      ? await SwitchFood(name, value)
      : await SwitchDrink(name, value);

    if (pathname === '/comidas') {
      if (response.meals === null) {
        return global
          .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      await setRevenues(response.meals);
    }

    if (pathname === '/bebidas') {
      if (response.drinks === null) {
        return global
          .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      await setDrinks(response.drinks);
    }
  };

  return (
    <div>
      <form className="form-check">
        <label className="form-check-inline form-check-label" htmlFor="ingredient">
          <input
            className="form-check-input"
            id="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            value="ingredient"
            name="filter"
            onChange={ (e) => setName(e.target.value) }
          />
          Ingrediente
        </label>

        <label className="form-check-inline form-check-label" htmlFor="name">
          <input
            className="form-check-input"
            id="name"
            data-testid="name-search-radio"
            type="radio"
            value="name"
            name="filter"
            onChange={ (e) => setName(e.target.value) }
          />
          Nome
        </label>
        <label
          className="form-check-inline form-check-label"
          htmlFor="first-letter"
        >
          <input
            className="form-check-input"
            id="first-letter"
            data-testid="first-letter-search-radio"
            type="radio"
            value="first-letter"
            name="filter"
            onChange={ (e) => setName(e.target.value) }
          />
          Primeira letra
        </label>
      </form>
      <button
        disabled={ name.length === 0 || value.length === 0 }
        className="ml-3 mb-2 btn-sm btn btn-primary"
        style={ { width: '9em' } }
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>

  );
}

Radios.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Radios;
