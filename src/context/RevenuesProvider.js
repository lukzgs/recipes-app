import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RevenuesContex from './RevenuesContex';
import { SearchDrink } from '../services/SearchDrink';

function RevenuesProvider({ children }) {
  const [revenues, setRevenues] = useState([]);

  const value = {
    revenues,
    setRevenues,
  };
  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchDrink('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRevenues(response.meals);
    };
    fetchApi();
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
