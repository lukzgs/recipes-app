import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RevenuesContex from '../../context/RevenuesContex';
import { ONE_SECOND } from '../../global/constantesGlobais';
import shareIcon from '../../images/shareIcon.svg';

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

  // if (filter === 'all') {
  return (
    filteRecipes.map((recipe, index) => (
      recipe.alcoholicOrNot === '' ? (
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
          <p hidden={ copy }>Link copiado!</p>
          {recipe.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))}
        </div>
      )
    ))
  );
  // } if (filter === 'food') {
  //   return (
  //     finishedRecipes.map((recipe, index) => {
  //       if (recipe.alcoholicOrNot === '') {
  //         return (
  //           <div key={ recipe.id }>
  //             <img
  //               data-testid={ `${index}-horizontal-image` }
  //               src={ recipe.image }
  //               alt={ recipe.name }
  //             />
  //             <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
  //             <p data-testid={ `${index}-horizontal-top-text` }>
  //               {`${recipe.area} - ${recipe.category}`}
  //             </p>
  //             <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
  //             <button
  //               onClick={ () => handleClickShare('comidas', recipe.id) }
  //               type="button"
  //               style={ { backgroundColor: 'Transparent', border: 'none' } }
  //             >
  //               <img
  //                 data-testid={ `${index}-horizontal-share-btn` }
  //                 src={ shareIcon }
  //                 alt="shareIcon"
  //               />
  //             </button>
  //             <p hidden={ copy }>Link copiado!</p>
  //             {recipe.tags.map((tag, i) => (
  //               <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))}
  //           </div>
  //         );
  //       }
  //       return null;
  //     }));
  // }
  // return (
  //   finishedRecipes.map((recipe, index) => {
  //     if (recipe.area === '') {
  //       return (
  //         <div key={ recipe.id }>
  //           <img
  //             data-testid={ `${index}-horizontal-image` }
  //             src={ recipe.image }
  //             alt={ recipe.name }
  //           />
  //           <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
  //           <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
  //           <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
  //           <button
  //             onClick={ () => handleClickShare('bebidas', recipe.id) }
  //             type="button"
  //             style={ { backgroundColor: 'Transparent', border: 'none' } }
  //           >
  //             <img
  //               data-testid={ `${index}-horizontal-share-btn` }
  //               src={ shareIcon }
  //               alt="shareIcon"
  //             />
  //           </button>
  //           <p hidden={ copy }>Link copiado!</p>
  //           {recipe.tags.map((tag, i) => (
  //             <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))}
  //         </div>
  //       );
  //     }
  //     return null;
  //   }));
}

CardsMade.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default CardsMade;
