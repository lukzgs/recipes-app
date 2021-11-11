import React, { useState, useEffect } from 'react';
import '../RecipeProgress.css';
import { useHistory } from 'react-router';
import { SearchFood } from '../services/SearchFood';
import handleChecked from '../global/handleChecked';

function RecipeProgressFoods() {
  const [revenueActual, setrevenueActual] = useState([]);
  const [saveMade, setSaveMade] = useState([]);
  const [ability, setAbility] = useState(0);
  const [made, setMade] = useState([]);
  const [cocktails, setCocktails] = useState([]);

  const history = useHistory();
  const path = history.location.pathname.split('/');
  const id = path[2];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setrevenueActual(response.meals);
    };

    fetchApi();

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
    }
  }, [id]);

  if (revenueActual[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(revenueActual[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');

  const handleClick = ({ target }) => {
    setAbility(ability + 1);
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
        src={ revenueActual[0].strMealThumb }
        alt={ revenueActual[0].strMeal }
      />
      <h1 data-testid="recipe-title">{revenueActual[0].strMeal}</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <span data-testid="recipe-category">{revenueActual[0].strCategory}</span>
      <form>
        {
          ingrendients.map((ingredient, i) => (
            <label
              data-testid={ `${i}-ingredient-step` }
              className={ (saveMade.length
                !== 0 ? saveMade.some((m) => m === ingredient[1])
                : false) ? 'checkedInput' : false }
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
                defaultChecked={ saveMade.length
                  !== 0 ? saveMade.some((m) => m === ingredient[1]) : false }
              />
            </label>
          ))
        }
        <div>
          <span data-testid="instructions">{revenueActual[0].strInstructions}</span>
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

export default RecipeProgressFoods;
