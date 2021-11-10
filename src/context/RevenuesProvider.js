import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RevenuesContex from './RevenuesContex';
import { SearchFood } from '../services/SearchFood';
import { SearchDrink } from '../services/SearchDrink';

function RevenuesProvider({ children }) {
  const [revenues, setRevenues] = useState([]);
  const [drinks, setDrinks] = useState([]);
  // usados em categorias
  const [drinksCat, setDrinksCat] = useState([]);
  const [mealsCat, setMealsCat] = useState([]);

  const value = {
    revenues,
    setRevenues,
    drinks,
    setDrinks,
    mealsCat,
    setMealsCat,
    drinksCat,
    setDrinksCat,
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

  // usados em categorias
  useEffect(() => {
    const fetchApiMealsCat = async () => {
      const response = await SearchFood('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setMealsCat(response.meals);
    };
    fetchApiMealsCat();
  }, []);

  useEffect(() => {
    const fetchApiDrinksCat = async () => {
      const response = await SearchDrink('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setDrinksCat(response.drinks);
    };
    fetchApiDrinksCat();
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
