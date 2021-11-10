import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RevenuesContex from './RevenuesContex';
import { SearchFood } from '../services/SearchFood';
import { SearchDrink } from '../services/SearchDrink';

function RevenuesProvider({ children }) {
  const [revenues, setRevenues] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const value = {
    revenues,
    setRevenues,
    drinks,
    setDrinks,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRevenues(response.meals);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApiDrinks = async () => {
      const response = await SearchDrink('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinks(response.drinks);
    };
    fetchApiDrinks();
  }, []);

  return (
    <RevenuesContex.Provider value={ value }>
      {children}
    </RevenuesContex.Provider>
  );
}

RevenuesProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RevenuesProvider;
