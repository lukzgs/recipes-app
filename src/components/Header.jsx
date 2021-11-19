import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../context/RevenuesContex';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Radios from './Radios/Radios';

function Header({ title }) {
  const [change, setChange] = useState('');
  const { search, setSearch } = useContext(RevenuesContex);

  if (title === 'Comidas' || title === 'Bebidas' || title === 'Explorar Origem') {
    if (search === true) {
      return (
        <header
          className="d-flex justify-content-around py-2 border-bottom header"
        >
          <Link to="/perfil">
            <img
              style={ { marginTop: '0.5rem' } }
              src={ profileIcon }
              alt="provile"
              data-testid="profile-top-btn"
            />
          </Link>
          <h4 style={ { marginTop: '0.5rem' } } data-testid="page-title">{title}</h4>
          <button
            style={ { backgroundColor: 'Transparent', border: 'none' } }
            type="button"
            onClick={ () => setSearch(!search) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
          </button>
        </header>
      );
    }
    return (
      <div>
        <header
          className="d-flex justify-content-around py-2 border-bottom header"
        >
          <Link to="/perfil">
            <img src={ profileIcon } alt="provile" data-testid="profile-top-btn" />
          </Link>
          <h4 data-testid="page-title">{title}</h4>
          <button
            style={ { backgroundColor: 'Transparent', border: 'none' } }
            type="button"
            onClick={ () => setSearch(!search) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
          </button>
        </header>
        <div className="row d-flex justify-content-center m-3 header">
          <input
            style={ { outline: '0', borderWidth: '0 0 2px' } }
            data-testid="search-input"
            type="text"
            name="search"
            id="search"
            placeholder="Buscar Receita"
            value={ change }
            onChange={ (e) => setChange(e.target.value) }
          />
        </div>
        <Radios value={ change } />
      </div>
    );
  }
  return (
    <header className="d-flex justify-content-around py-2 border-bottom header">
      <Link to="/perfil">
        <img src={ profileIcon } alt="provile" data-testid="profile-top-btn" />
      </Link>
      <h5 className="col-7" data-testid="page-title">{title}</h5>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
