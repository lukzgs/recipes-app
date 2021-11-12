import React, { useState, useEffect, useContext } from 'react';
import '../RecipeProgress.css';
import { useHistory } from 'react-router';
import { SearchDrink } from '../services/SearchDrink';
import { handleChecked, checkedDefault, checkedLocal } from '../global/checked';
import Btns from './buttons/Btns';
import RevenuesContex from '../context/RevenuesContex';

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

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          [id]: [],
        },
      }));
    } else if (inProgressRecipes.cocktails === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          [id]: [],
        },
        ...inProgressRecipes,
      }));
    } else if (inProgressRecipes !== null && inProgressRecipes.cocktails !== undefined) {
      setSaveMade(inProgressRecipes.cocktails[id]);
      setMade(inProgressRecipes.cocktails[id]);
      setMeals({ meals: inProgressRecipes.meals });
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else setStorageFavorites(favoriteRecipes);

    if (favoriteRecipes !== null) {
      const trueFavorite = favoriteRecipes.some((fav) => fav.id === drinkId);
      setIconHeart(!trueFavorite);
    }
  }, [id, drinkId, setIconHeart, setRecipes, setStorageFavorites]);

  if (recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');

  const handleClick = ({ target }) => {
    setAbility(ability + 1);
    const { value } = target;
    setMade([...made, value]);

    console.log(meals);
    const progress = {
      cocktails: {
        [id]: [...made, value],
      },
      meals,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  };

  return (
    <div>
      <img
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
          onClick={ () => history.push('/receitas-feitas') }
        >
          Finalizar receita
        </button>
      </form>
    </div>
  );
}

export default RecipeProgressDrink;
