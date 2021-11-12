import React, { useState, useEffect, useContext } from 'react';
import '../RecipeProgress.css';
import { useHistory } from 'react-router';
import { SearchFood } from '../services/SearchFood';
import { handleChecked, checkedDefault, checkedLocal } from '../global/checked';
import RevenuesContex from '../context/RevenuesContex';
import Btns from './buttons/Btns';

function RecipeProgressFoods() {
  const [saveMade, setSaveMade] = useState([]);
  const [ability, setAbility] = useState(0);
  const [made, setMade] = useState([]);
  const [foodId, setFoodId] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const { recipes, setRecipes,
    setStorageFavorites, setIconHeart } = useContext(RevenuesContex);

  const history = useHistory();
  const path = history.location.pathname.split('/');
  const id = path[2];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipes(response.meals);
      setFoodId(response.meals[0].idMeal);
    };

    fetchApi();

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else setStorageFavorites(favoriteRecipes);
    if (favoriteRecipes !== null) {
      const trueFavorite = favoriteRecipes.some((fav) => fav.id === foodId);
      setIconHeart(!trueFavorite);
    }

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          [id]: [],
        },
      }));
    } else if (inProgressRecipes.meals === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          [id]: [],
        },
        ...inProgressRecipes,
      }));
    } else if (inProgressRecipes !== null && inProgressRecipes.meals !== undefined) {
      setSaveMade(inProgressRecipes.meals[id]);
      setMade(inProgressRecipes.meals[id]);
      setCocktails(inProgressRecipes.cocktails);
      setAbility(inProgressRecipes.meals[id].length);
    }
  }, [foodId, id, setIconHeart, setRecipes, setStorageFavorites]);

  if (recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');

  const handleClick = ({ target }) => {
    if (target.checked) setAbility(ability + 1);
    else setAbility(ability - 1);
    const { value } = target;
    setMade([...made, value]);

    const progress = {
      cocktails,
      meals: {
        [id]: [...made, value],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipes[0].strMealThumb }
        alt={ recipes[0].strMeal }
      />
      <h1 data-testid="recipe-title">{recipes[0].strMeal}</h1>
      <Btns pathname={ id } name="comidas" />
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
          onClick={ () => {
            history.push('/receitas-feitas');
          } }
        >
          Finalizar receita
        </button>
      </form>
    </div>
  );
}

export default RecipeProgressFoods;
