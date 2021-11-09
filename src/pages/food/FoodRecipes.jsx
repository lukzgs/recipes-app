import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { SearchFood } from '../../services/SearchFood';

function FoodRecipes() {
  const [recipes, setRecipes] = useState([]);
  // const { location } = useHistory();
  // const { pathname } = location;
  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
      setRecipes(response.meals);
    };
    fetchApi();
  }, []);

  if (recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');
  const measures = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strMeasure') && recipe[1] !== null && recipe[1] !== '');

  return (
    recipes.map((food) => (
      <main key={ food.idMeal }>
        <img
          style={ { height: '20em' } }
          src={ food.strMealThumb }
          alt={ food.strMeal }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{ food.strMeal }</p>
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <p data-testid="recipe-category">{food.strCategory}</p>
        <ul>
          { ingrendients.map((ingre, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingre[1]} - ${measures[index][1]}`}
            </li>))}
        </ul>
        <p data-testid="instructions">{food.strInstructions}</p>
        <div>
          <iframe data-testid="video" title="video" src={ food.strYoutube } />
        </div>
        <div data-testid={ `${0}-recomendation-card` }>{food.strDrinkAlternate}</div>
        <button data-testid="start-recipe-btn" type="button">iniciar</button>
      </main>
    ))
  );
}

export default FoodRecipes;
