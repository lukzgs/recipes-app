import React, { useState, useEffect } from 'react';
import '../RecipeProgress.css';
import { useHistory } from 'react-router';
import { SearchFood } from '../services/SearchFood';
// import RevenuesContex from '../context/RevenuesContex';

function RecipeProgressFoods() {
  // onst { revenues } = useContext(RevenuesContex);
  const [revenueActual, setrevenueActual] = useState([]);
  const [ability, setAbility] = useState(0);
  const [boolCheck, setBoolCheck] = useState({});
  const [made, setMade] = useState([]);

  const history = useHistory();
  const path = history.location.pathname.split('/');
  const id = path[2];
  let coocks = [];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood(`www.themealdb.com/api/json/v1/1/lookup
        .php?i=${id}`);
      setrevenueActual(response.meals);
    };
    fetchApi();
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const check = JSON.parse(localStorage.getItem('boolCheck'));
    if (check === null) {
      localStorage.setItem('boolCheck', JSON.stringify({}));
    } else setBoolCheck(check);
    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([]));
    } else setMade(inProgressRecipes);
  }, [id]);

  if (revenueActual[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(revenueActual[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');

  const handleChange = (ingredient) => {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setBoolCheck({
      ...boolCheck,
      [ingredient]: !boolCheck[ingredient],
    });

    if (local.length === 0) coocks.push(ingredient);
    else if (!boolCheck[ingredient]) coocks.push(ingredient, ...local.meals[id]);
    else coocks = local.meals[id].filter((a) => a !== ingredient);
    const meals = {
      meals: {
        [id]: coocks,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(meals));
    localStorage.setItem('boolCheck', JSON.stringify({
      ...boolCheck,
      [ingredient]: !boolCheck[ingredient],
    }));
  };
  // const handleChecked = (e) => {
  //   e.target.className = 'checked';
  // };

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
            <label className="labelChecked" key={ i } htmlFor={ ingredient[1] }>
              <input
                type="checkbox"
                name="ingredient"
                id={ ingredient[1] }
                data-testid={ `${i}-ingredient-step` }
                value={ ingredient[1] }
                onClick={ () => (setAbility(ability + 1)
                  || handleChange(ingredient[1])) }
                // && setIngredientsSto(ingredient[1]
                defaultChecked={ made.length === undefined ? made.meals[id]
                  .some((meal) => meal === ingredient[1]) : false }
              />
              {ingredient[1]}
            </label>
          ))
        }
        {/* {console.log(ingredientsSto)} */}
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
