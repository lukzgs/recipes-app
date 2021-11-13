import React, { useState, useEffect, useContext } from 'react';
import '../RecipeProgress.css';
import { useHistory } from 'react-router';
import { SearchDrink } from '../services/SearchDrink';
import { handleChecked, checkedDefault, checkedLocal } from '../global/checked';
import Btns from './buttons/Btns';
import RevenuesContex from '../context/RevenuesContex';
import { favorite, inProgress, recipesDone, recipesMade } from '../global/localStorage';

function RecipeProgressDrink() {
  const [saveMade, setSaveMade] = useState([]);
  const [ability, setAbility] = useState(0);
  const [made, setMade] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinkId, setDrinkId] = useState('');
  const { recipes, setRecipes,
    setStorageFavorites, setIconHeart } = useContext(RevenuesContex);

  const history = useHistory();
  const path = history.location.pathname.split('/');
  const id = path[2];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchDrink(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipes(response.drinks);
      setDrinkId(response.drinks[0].idDrink);
    };

    fetchApi();
    favorite(setStorageFavorites, drinkId, setIconHeart);
    inProgress(id, setSaveMade, setMade, setMeals);
    recipesDone();
  }, [id, drinkId, setIconHeart, setRecipes, setStorageFavorites]);

  if (recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');

  const handleClick = ({ target }) => {
    setAbility(ability + 1);
    const { value } = target;
    setMade([...made, value]);

    const progress = {
      cocktails: {
        [id]: [...made, value],
      },
      meals,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  };

  const handleClickFinished = () => {
    let tags = [];
    if (recipes[0].strTags === null) {
      tags = [];
    } else {
      tags = recipes[0].strTags.includes(',') ? recipes[0].strTags.split(',')
        : [recipes[0].strTags];
    }

    const data = new Date();
    const finishedDrink = {
      id: recipes[0].idDrink,
      type: recipes[0].strGlass,
      area: '',
      category: recipes[0].strCategory,
      alcoholicOrNot: recipes[0].strAlcoholic,
      name: recipes[0].strDrink,
      image: recipes[0].strDrinkThumb,
      doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
      tags,
    };
    recipesMade(finishedDrink);
    return history.push('/receitas-feitas');
  };

  return (
    <div>
      <img
        style={ { height: '20em' } }
        data-testid="recipe-photo"
        src={ recipes[0].strDrinkThumb }
        alt={ recipes[0].strDrink }
      />
      <h1 data-testid="recipe-title">{recipes[0].strDrink}</h1>
      <Btns pathname={ id } name="bebidas" />
      <span data-testid="recipe-category">{recipes[0].strCategory}</span>
      <form>
        {
          ingrendients.map((ingredient, i) => (
            <label
              data-testid={ `${i}-ingredient-step` }
              className={ checkedLocal(ingredient, saveMade) }
              key={ i }
              htmlFor={ ingredient[1] }
            >
              {ingredient[1]}
              <input
                type="checkbox"
                name="ingredient"
                id={ ingredient[1] }
                value={ ingredient[1] }
                onChange={ (e) => handleChecked(e) }
                onClick={ handleClick }
                defaultChecked={ checkedDefault(ingredient, saveMade) }
              />
            </label>
          ))
        }
        <div>
          <span data-testid="instructions">{recipes[0].strInstructions}</span>
        </div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ ability !== ingrendients.length }
          onClick={ handleClickFinished }
        >
          Finalizar receita
        </button>
      </form>
    </div>
  );
}

export default RecipeProgressDrink;
