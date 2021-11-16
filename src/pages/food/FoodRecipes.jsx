import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { SearchFood } from '../../services/SearchFood';
import Btns from '../../components/buttons/Btns';
import RevenuesContex from '../../context/RevenuesContex';
import { TOTAL_CARDS } from '../../global/constantesGlobais';
import { favorite } from '../../global/localStorage';

function FoodRecipes() {
  const [recomendationsDrinks, setRecomendationsDrinks] = useState([]);
  const [foodId, setFoodId] = useState('');
  const [ability, setAbility] = useState(0);

  const { recipes, setRecipes,
    setStorageFavorites, setIconHeart } = useContext(RevenuesContex);

  const { idReceita } = useParams();
  const history = useHistory();

  const apiRecomDrinks = async () => {
    const responseRecomDrinks = await SearchFood('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const arrayDrinks = responseRecomDrinks.drinks;
    setRecomendationsDrinks(arrayDrinks);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
      setRecipes(response.meals);
      setFoodId(response.meals[0].idMeal);
    };

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes !== null && inProgressRecipes.meals !== undefined) {
      setAbility(inProgressRecipes.meals[idReceita].length);
    }

    fetchApi();
    apiRecomDrinks();
    favorite(setStorageFavorites, foodId, setIconHeart);
  }, [foodId, idReceita, setIconHeart, setStorageFavorites, setRecipes]);

  if (recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');
  const measures = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strMeasure') && recipe[1] !== null && recipe[1] !== '');

  const handleClickStart = () => {
    history.push(`/comidas/${idReceita}/in-progress`);
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          [idReceita]: [],
        },
      }));
    }
  };

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
        <Btns pathname={ idReceita } name="comidas" />
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
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClickStart }
        >
          { ability <= ingrendients.length ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </main>
    ))
  );
}

export default FoodRecipes;
