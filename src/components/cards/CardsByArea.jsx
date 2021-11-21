import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MAX_LENGTH } from '../../global/constantesGlobais';

function CardsByArea({ foodArea }) {
  if (foodArea === null) return <p>Carregando..</p>;

  const areas = foodArea.filter((area, index) => index <= MAX_LENGTH);

  return (
    <div className="row ml-3 mt-3 mb-5">
      {areas.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <Link className="col-5" to={ `/comidas/${idMeal}` } key={ idMeal }>
          <div
            className="card mb-2"
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
              style={ { height: '5em' } }
              src={ strMealThumb }
              alt={ strMeal }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

CardsByArea.propTypes = {
  foodArea: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardsByArea;
