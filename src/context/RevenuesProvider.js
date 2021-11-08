import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RevenuesContex from './RevenuesContex';

function RevenuesProvider({ children }) {
  const [responseDrink, setResponseDrink] = useState([]);
  const [responseFood, setResponseFood] = useState([]);

  const value = {
    responseDrink,
    responseFood,
    setResponseDrink,
    setResponseFood,
  };

  return (
    <RevenuesContex.Provider value={ value }>
      {children}
    </RevenuesContex.Provider>
  );
}

RevenuesProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RevenuesProvider;
