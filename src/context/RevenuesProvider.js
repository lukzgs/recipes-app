import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RevenuesContex from './RevenuesContex';

function RevenuesProvider({ children }) {
  const [reve, setReve] = useState([]);

  const value = {
    reve,
    setReve,
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
