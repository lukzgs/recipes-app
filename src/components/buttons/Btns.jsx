import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import RevenuesContex from '../../context/RevenuesContex';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { ONE_SECOND } from '../../global/constantesGlobais';

function Btns({ pathname, name }) {
  const { copy, iconHeart, storageFavorites,
    recipes, setIconHeart, setCopy, clipboard } = useContext(RevenuesContex);

  const handleClickShare = () => {
    try {
      clipboard(`http://localhost:3000/${name}/${pathname}`);
    } catch (error) {
      clipboard(error);
    }
    setCopy(false);
    setTimeout(() => {
      setCopy(true);
    }, ONE_SECOND);
  };

  const handleClickFavorite = () => {
    setIconHeart(!iconHeart);
    let favorite = {};
    if (name === 'comidas') {
      const { idMeal, strArea, strMeal, strCategory, strMealThumb } = recipes[0];
      favorite = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb };
    }
    if (name === 'bebidas') {
      const { idDrink, strDrink, strCategory, strDrinkThumb, strAlcoholic } = recipes[0];
      favorite = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
    }
    if (iconHeart) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...storageFavorites, favorite]));
    } else {
      const delFavorite = storageFavorites.filter((fav) => fav.id !== pathname);
      localStorage.setItem('favoriteRecipes', JSON.stringify(delFavorite));
    }
  };

  return (
    <div>
      <button
        onClick={ handleClickShare }
        data-testid="share-btn"
        type="button"
        style={ { backgroundColor: 'Transparent', border: 'none' } }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button
        type="button"
        style={ { backgroundColor: 'Transparent', border: 'none' } }
        onClick={ handleClickFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ iconHeart ? whiteHeartIcon : blackHeartIcon }
          alt="heartIcon"
        />
      </button>
      <p hidden={ copy }>Link copiado!</p>
    </div>
  );
}

Btns.propTypes = {
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Btns;
