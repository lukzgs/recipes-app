import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import RevenuesContex from '../../context/RevenuesContex';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function BtnRemove({ pathname }) {
  const { storageFavorites } = useContext(RevenuesContex);

  const handleClickFavorite = () => {
    const delFavorite = storageFavorites.filter((fav) => fav.id !== pathname);
    localStorage.setItem('favoriteRecipes', JSON.stringify(delFavorite));
  };

  return (
    <div>
      <button
        type="button"
        style={ { backgroundColor: 'Transparent', border: 'none' } }
        onClick={ handleClickFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="heartIcon"
        />
      </button>
    </div>
  );
}

BtnRemove.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default BtnRemove;
