import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SearchDrink } from '../../services/SearchDrink';
import Btns from '../../components/buttons/Btns';
import RevenuesContex from '../../context/RevenuesContex';
import { TOTAL_CARDS } from '../../global/constantesGlobais';
import { favorite } from '../../global/localStorage';

import '../../css/Recipes-e-InProgress/index.css';

function DrinksRecipes() {
  const [recomendationFoods, setRecomendationFoods] = useState([]);
  const [drinkId, setDrinkId] = useState('');
  const [ability, setAbility] = useState(0);

  const { recipes, setRecipes,
    setStorageFavorites, setIconHeart } = useContext(RevenuesContex);

  const { idReceita } = useParams();
  const history = useHistory();

  const apiRecomendationFoods = async () => {
    const responseRecomendationFoods = await SearchDrink('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const arrayFoods = responseRecomendationFoods.meals;
    setRecomendationFoods(arrayFoods);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchDrink(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
      setRecipes(response.drinks);
      setDrinkId(response.drinks[0].idDrink);
    };
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes !== null && inProgressRecipes.drinks !== undefined) {
      setAbility(inProgressRecipes.drinks[idReceita].length);
    }

    fetchApi();
    apiRecomendationFoods();

    favorite(setStorageFavorites, drinkId, setIconHeart);
  }, [drinkId, idReceita, setIconHeart, setRecipes, setStorageFavorites]);

  if (recipes === undefined || recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '')
    .map((recipe) => recipe[1]);

  const measures = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strMeasure') && recipe[1] !== null && recipe[1] !== '')
    .map((recipe) => recipe[1]);

  const handleClickStart = () => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          [idReceita]: [],
        },
      }));
    }
    history.push(`/bebidas/${idReceita}/in-progress`);
  };

  return (
    <div>
      {recipes.map((drink) => (
        <main key={ drink.idDrink }>
          <img
            className="img"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid="recipe-photo"
          />
          <div className="p-3 container-main">
            <div className="d-flex mt-2">
              <h5
                className="col-9 title"
                data-testid="recipe-title"
              >
                { drink.strDrink }
              </h5>
              <Btns pathname={ idReceita } name="bebidas" />
            </div>
            <span data-testid="recipe-category"><em>{ drink.strAlcoholic }</em></span>
            <br />
            <br />
            <span>
              Ingredinets
            </span>
            <ul className="information py-2">
              { ingrendients.map((ingre, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${ingre} - ${measures[index] === undefined ? '' : measures[index]}`}
                </li>))}
            </ul>
            <span>
              Instructions
            </span>
            <p
              className="information p-2"
              data-testid="instructions"
            >
              {drink.strInstructions}
            </p>
            <br />
            <span>
              Recommendations
            </span>
            <div className="scroll flex  mb-5">
              {recomendationFoods.slice(0, TOTAL_CARDS).map((recom, index) => (
                <div
                  className="recomendation p-1 m-2"
                  key={ recom.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <span className="p-2" data-testid={ `${index}-recomendation-title` }>
                    { recom.strMeal }
                  </span>
                  <img
                    className="p-1 img-recomendation"
                    src={ recom.strMealThumb }
                    alt={ recom.strMeal }
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

export default DrinksRecipes;
