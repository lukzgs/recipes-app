import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { SearchFood } from '../../services/SearchFood';

const TOTAL_CARDS = 6;

function FoodRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [recomendationsDrinks, setRecomendationsDrinks] = useState([]);
  // const history = useHistory();
  // const { location } = useHistory();
  // const { pathname } = location;
  const apiRecomDrinks = async () => {
    const responseRecomDrinks = await SearchFood('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const arrayDrinks = responseRecomDrinks.drinks;
    setRecomendationsDrinks(arrayDrinks);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
      setRecipes(response.meals);
    };
    fetchApi();
    apiRecomDrinks();
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
        <div className="scroll flex">
          {recomendationsDrinks.slice(0, TOTAL_CARDS).map((recomendation, index) => (
            <div
              key={ recomendation.idDrinks }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                style={ { height: '5em' } }
                src={ recomendation.strDrinkThumb }
                alt={ recomendation.strDrink }
              />
              <p data-testid={ `${index}-recomendation-title` }>
                { recomendation.strDrink }
              </p>
            </div>
          ))}
        </div>
        <button type="button">Continuar Receita</button>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar Receita
        </button>
      </main>
    ))
  );
}

export default FoodRecipes;
