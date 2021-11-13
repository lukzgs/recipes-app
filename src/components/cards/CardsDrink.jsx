import React, { useContext } from 'react';
import RevenuesContex from '../../context/RevenuesContex';

const MAX_LENGTH = 11;

function CardsDrink() {
  const { drinks } = useContext(RevenuesContex);
  const revenuesTwelve = drinks.filter((revenue, index) => index <= MAX_LENGTH);

  return (
    revenuesTwelve.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
      <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          style={ { height: '5em' } }
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <p data-testid={ `${index}-card-name` }>{strDrink}</p>
      </div>
    ))
  );
}

export default CardsDrink;
