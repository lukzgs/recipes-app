import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SearchFood } from '../../services/SearchFood';
import Btns from '../../components/buttons/Btns';
import RevenuesContex from '../../context/RevenuesContex';
import { TOTAL_CARDS } from '../../global/constantesGlobais';
import { favorite } from '../../global/localStorage';

import '../../css/Recipes-e-InProgress/index.css';

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

  if (recipes === undefined || recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '')
    .map((recipe) => recipe[1]);

  const measures = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strMeasure') && recipe[1] !== null && recipe[1] !== '')
    .map((recipe) => recipe[1]);

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
    <div>
      {recipes.map((food) => (
        <main key={ food.idMeal }>
          <img
            className="img"
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
          />
          <div className="p-3 container-main">
            <div className="d-flex mt-2">
              <h5 className="col-9 title" data-testid="recipe-title">
                { food.strMeal }
              </h5>
              <Btns pathname={ idReceita } name="comidas" />
            </div>
            <span data-testid="recipe-category"><em>{food.strCategory}</em></span>
            <br />
            <br />
            <span>
              Ingredinets
            </span>
            <ul className="information py-2">
              { ingrendients.map((ingre, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${ingre} - ${measures[index]}`}
                </li>))}
            </ul>
            <span>
              Instructions
            </span>
            <p
              className="information p-2"
              data-testid="instructions"
            >
              {food.strInstructions}
            </p>
            <span>
              Vídeo
            </span>
            <div className="information p-2">
              <iframe data-testid="video" title="video" src={ food.strYoutube } />
            </div>
            <br />
            <span>
              Recommendations
            </span>
            <div className="scroll flex mb-5">
              {recomendationsDrinks.slice(0, TOTAL_CARDS).map((recomendation, index) => (
                <div
                  className="recomendation p-1 m-2"
                  key={ recomendation.idDrink }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <span
                    className="p-2"
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recomendation.strDrink }
                  </span>
                  <img
                    className="p-1 img-recomendation"
                    src={ recomendation.strDrinkThumb }
                    alt={ recomendation.strDrink }
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      ))}
      <button
        className="btn btn-primary px-5 btn-fixed"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ handleClickStart }
      >
        { ability <= ingrendients.length ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </div>
  );
}

export default FoodRecipes;
