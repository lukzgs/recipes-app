import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../../context/RevenuesContex';
import { ONE_SECOND } from '../../global/constantesGlobais';
import shareIcon from '../../images/shareIcon.svg';
import '../../css/cardsMade.css';
import '../../css/btn.css';

function CardsMade({ filter }) {
  const [finishedRecipes, setFinishedRecipes] = useState([]);
  const [filteRecipes, setFilterRecipes] = useState([]);

  const { setCopy, copy, clipboard } = useContext(RevenuesContex);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else setFinishedRecipes(doneRecipes);
  }, [setFinishedRecipes]);

  useEffect(() => {
    if (filter === 'food') {
      const filterFood = finishedRecipes.filter((reci) => reci.alcoholicOrNot === '');
      setFilterRecipes(filterFood);
    } else if (filter === 'drink') {
      const filterDrink = finishedRecipes.filter((reci) => reci.area === '');
      setFilterRecipes(filterDrink);
    } else {
      setFilterRecipes(finishedRecipes);
    }
  }, [filter, finishedRecipes]);

  const handleClickShare = (name, id) => {
    clipboard(`http://localhost:3000/${name}/${id}`);
    setCopy(false);
    setTimeout(() => {
      setCopy(true);
    }, ONE_SECOND);
  };

  return (
    filteRecipes.map((recipe, index) => (
      recipe.alcoholicOrNot === '' ? (
        <div key={ recipe.id } className="card container-card">
          <Link to={ `comidas/${recipe.id}` }>
            <img
              className="img-fluid rounded-start m-1 img-card"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <div className="p-3">
            <div className="d-flex flex-row">
              <span
                data-testid={ `${index}-horizontal-top-text` }
                className="text-horizontal"
              >
                {`${recipe.area} - ${recipe.category}`}
              </span>
              <button
                className="ml-3 border-none"
                onClick={ () => handleClickShare('comidas', recipe.id) }
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareIcon"
                />
              </button>
            </div>
            <span
              className="font"
              hidden={ copy }
            >
              Link copiado!
            </span>
            <Link to={ `comidas/${recipe.id}` }>
              <h5 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h5>
            </Link>
            <p
              className="font"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Feito em: ${recipe.doneDate}`}
            </p>
            {recipe.tags.map((tag, i) => (
              <button
                className="btn btn-primary btn-sm ml-1 font"
                type="button"
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </button>))}
          </div>
        </div>
      ) : (
        <div key={ recipe.id } className="card container-card">
          <Link to={ `bebidas/${recipe.id}` }>
            <img
              className="img-fluid rounded-start m-1 img-card"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <div className="p-3">
            <div className="d-flex flex-row">
              <span
                className="text-horizontal"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </span>
              <button
                onClick={ () => handleClickShare('bebidas', recipe.id) }
                type="button"
                className=" ml-3 border-none"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareIcon"
                />
              </button>
            </div>
            <p hidden={ copy }>Link copiado!</p>
            <Link to={ `bebidas/${recipe.id}` }>
              <h5 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h5>
            </Link>
            <p
              className="font"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Feito em: ${recipe.doneDate}`}
            </p>
            {recipe.tags.map((tag, i) => (
              <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))}
          </div>
        </div>
      )
    ))
  );
}

CardsMade.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default CardsMade;
