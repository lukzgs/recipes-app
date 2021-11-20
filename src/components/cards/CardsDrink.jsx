import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../../context/RevenuesContex';
import { MAX_LENGTH } from '../../global/constantesGlobais';

function CardsDrink() {
  const { drinks } = useContext(RevenuesContex);

  const drinksTwelve = drinks.filter((revenue, index) => index <= MAX_LENGTH);

  return (
    <div className="row ml-3 mt-3 mb-5">
      {drinksTwelve.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <Link className="col-5" to={ `/bebidas/${idDrink}` } key={ idDrink }>
          <div
            className="card mb-2"
            style={ { width: '9rem' } }
            data-testid={ `${index}-recipe-card` }
          >
            <span
              className="ml-2 mt-2"
              data-testid={ `${index}-card-name` }
            >
              {strDrink}
            </span>
            <img
              className="card-img-bottom p-2"
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardsDrink;
