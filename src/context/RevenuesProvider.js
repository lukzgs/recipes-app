import PropTypes from 'prop-types';
import React from 'react';
import RevenuesContex from './RevenuesContex';

function RevenuesProvider({ children }) {
  const value = {};
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
