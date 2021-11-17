import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RevenuesContex from '../../context/RevenuesContex';
import { ONE_SECOND } from '../../global/constantesGlobais';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

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
        <div key={ recipe.id }>
          <Link to={ `comidas/${recipe.id}` }>
            <img
              style={ { height: '20em' } }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.area} - ${recipe.category}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            onClick={ () => handleClickShare('comidas', recipe.id) }
            type="button"
            style={ { backgroundColor: 'Transparent', border: 'none' } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
          <p hidden={ copy }>Link copiado!</p>
          <button
            type="button"
            style={ { backgroundColor: 'Transparent', border: 'none' } }
            onClick={ () => handleClickFavorite(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="heartIcon"
            />
          </button>
        </div>
      ) : (
        <div key={ recipe.id }>
          <Link to={ `bebidas/${recipe.id}` }>
            <img
              style={ { height: '20em' } }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            onClick={ () => handleClickShare('bebidas', recipe.id) }
            type="button"
            style={ { backgroundColor: 'Transparent', border: 'none' } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
          <button
            type="button"
            style={ { backgroundColor: 'Transparent', border: 'none' } }
            onClick={ () => handleClickFavorite(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="heartIcon"
            />
          </button>
          <p hidden={ copy }>Link copiado!</p>
        </div>
      )
    ))
  );
}

CardsFavorites.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default CardsFavorites;
