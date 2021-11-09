import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RevenuesContex from './RevenuesContex';

function RevenuesProvider({ children }) {
  const [revenues, setRevenues] = useState([]);

  const value = {
    revenues,
    setRevenues,
  };

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
