import React, { useContext, useState, useEffect } from 'react';
import '../RecipeProgress.css';
import { useHistory } from 'react-router';
import { SearchDrink } from '../services/SearchDrink';
import RevenuesContex from '../context/RevenuesContex';

function RecipeProgressDrink() {
  const { revenues } = useContext(RevenuesContex);
  const [revenueActual, setrevenueActual] = useState([]);
  const [ability, setAbility] = useState(0);
  const [ingredientsSto, setIngredientsSto] = useState([]);

  const history = useHistory();
  console.log(revenues);
  const path = history.location.pathname.split('/');
  const id = path[2];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchDrink(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setrevenueActual(response.drinks);
    };
    fetchApi();
  }, [id]);

  if (revenueActual[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(revenueActual[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');

  const handleChange = () => {
    const cocktails = {
      cocktails: {
        [id]: [...ingredientsSto],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(cocktails));
  };
  // const handleChecked = (e) => {
  //   e.target.className = 'checked';
  // };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ revenueActual[0].strDrinkThumb }
        alt={ revenueActual[0].strDrink }
      />
      <h1 data-testid="recipe-title">{revenueActual[0].strDrink}</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <span data-testid="recipe-category">{revenueActual[0].strCategory}</span>
      <form>
        {
          ingrendients.map((ingredient, i) => (
            <label className="labelChecked" key={ i } htmlFor={ ingredient }>
              <input
                type="checkbox"
                name="ingredient"
                id={ ingredient[1] }
                value={ ingredient[1] }
                onChange={ () => setIngredientsSto(ingredient[1], ...ingredientsSto)
                   && handleChange() }
                // && setIngredientsSto(ingredient[1])
                onClick={ () => (setAbility(ability + 1)) }
              />
              {ingredient[1]}
            </label>
          ))
        }
        {console.log(ingredientsSto)}
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

export default RecipeProgressDrink;
