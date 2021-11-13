import React, { useContext, useEffect } from 'react';
import RevenuesContex from '../../context/RevenuesContex';
import shareIcon from '../../images/shareIcon.svg';

function CardsMade() {
  const { finishedRecipes, setFinishedRecipes } = useContext(RevenuesContex);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else setFinishedRecipes(doneRecipes);
  }, [setFinishedRecipes]);

  return (
    finishedRecipes.map((recipe, index) => (
      recipe.area !== '' ? (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.area} - ${recipe.category}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            // onClick={ handleClickShare }
            type="button"
            style={ { backgroundColor: 'Transparent', border: 'none' } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
          {recipe.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))}
        </div>
      ) : (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            // onClick={ handleClickShare }
            type="button"
            style={ { backgroundColor: 'Transparent', border: 'none' } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
          {recipe.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))}
        </div>
      )
    ))
  );
}

export default CardsMade;
