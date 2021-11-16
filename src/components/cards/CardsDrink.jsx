import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../../context/RevenuesContex';
import { MAX_LENGTH } from '../../global/constantesGlobais';

function CardsDrink() {
  const { drinks } = useContext(RevenuesContex);

  const drinksTwelve = drinks.filter((revenue, index) => index <= MAX_LENGTH);

  return (
    drinksTwelve.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
      <Link to={ `/bebidas/${idDrink}` } key={ idDrink }>
        <div data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            style={ { height: '5em' } }
            src={ strDrinkThumb }
            alt={ strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{strDrink}</p>
        </div>
      </Link>
    ))
  );
}

export default CardsDrink;
