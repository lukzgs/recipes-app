import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../../context/RevenuesContex';
import { MAX_LENGTH } from '../../global/constantesGlobais';

function CardsFood() {
  const { revenues } = useContext(RevenuesContex);

  const revenuesTwelve = revenues.filter((revenue, index) => index <= MAX_LENGTH);

  return (
    <div className="row ml-3 mt-3 mb-5">
      {revenuesTwelve.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <Link className="col-5" key={ idMeal } to={ `/comidas/${idMeal}` }>
          <div
            className="card mb-2"
            style={ { width: '9rem' } }
            data-testid={ `${index}-recipe-card` }
          >
            <span
              className="ml-2 mt-2"
              data-testid={ `${index}-card-name` }
            >
              {strMeal}
            </span>
            <img
              className="card-img-bottom p-2"
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardsFood;
