import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../../context/RevenuesContex';

import { ONE_SECOND } from '../../global/constantesGlobais';

import shareIcon from '../../images/shareIcon.svg';

import blackHeartIcon from '../../images/blackHeartIcon.svg';

import '../../css/cardsMade.css';
import '../../css/btn.css';

function CardsFavorites({ filter }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteRecipes, setFilterRecipes] = useState([]);
  const { setCopy, copy, clipboard } = useContext(RevenuesContex);

  useEffect(() => {
    const chosenRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (chosenRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else setFavoriteRecipes(chosenRecipes);
  }, [setFavoriteRecipes]);

  const handleClickFavorite = (idCard) => {
    const delFavorite = favoriteRecipes.filter((fav) => fav.id !== idCard);
    localStorage.setItem('favoriteRecipes', JSON.stringify(delFavorite));
    setFavoriteRecipes(delFavorite);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (filter === 'food') {
      const filterFood = favoriteRecipes.filter((reci) => reci.alcoholicOrNot === '');
      setFilterRecipes(filterFood);
    } else if (filter === 'drink') {
      const filterDrink = favoriteRecipes.filter((reci) => reci.area === '');
      setFilterRecipes(filterDrink);
    } else {
      setFilterRecipes(favoriteRecipes);
    }
  }, [filter, favoriteRecipes]);

  const handleClickShare = (name, id) => {
    clipboard(`http://localhost:3000/${name}/${id}`);
    setCopy(false);
    setTimeout(() => {
      setCopy(true);
    }, ONE_SECOND);
  };
  if (filteRecipes.length === null) {
    return (
      <div>
        Carregando ....
      </div>
    );
  }
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
                className="text-horizontal"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.area} - ${recipe.category}`}
              </span>
            </div>
            <Link to={ `comidas/${recipe.id}` }>
              <h5
                className="my-3"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h5>
            </Link>
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
            <button
              type="button"
              className="ml-3 border-none"
              onClick={ () => handleClickFavorite(recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="heartIcon"
              />
            </button>
            <p className="font ml-3" hidden={ copy }>Link copiado!</p>
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
            <p
              className="text-horizontal"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}
            </p>
            <Link to={ `bebidas/${recipe.id}` }>
              <h5
                className="my-3"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h5>
            </Link>
            <button
              onClick={ () => handleClickShare('bebidas', recipe.id) }
              type="button"
              className="ml-3 border-none"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
            <button
              type="button"
              className="ml-3 border-none"
              onClick={ () => handleClickFavorite(recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="heartIcon"
              />
            </button>
            <p className="font ml-3" hidden={ copy }>Link copiado!</p>
          </div>
        </div>
      )
    ))
  );
}

CardsFavorites.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default CardsFavorites;
