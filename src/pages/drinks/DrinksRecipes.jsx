import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { SearchDrink } from '../../services/SearchDrink';

function DrinksRecipes() {
  const [recipes, setRecipes] = useState([]);
  // const { location } = useHistory();
  // const { pathname } = location;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchDrink('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
      setRecipes(response.drinks);
    };
    fetchApi();
  }, []);

  if (recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');
  const measures = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strMeasure') && recipe[1] !== null && recipe[1] !== '');

  return (
    recipes.map((drink) => (
      <main key={ drink.idDrink }>
        <img
          style={ { height: '20em' } }
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{ drink.strDrink }</p>
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
        <ul>
          { ingrendients.map((ingre, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingre[1]} - ${measures[index][1]}`}
            </li>))}
        </ul>
        <p data-testid="instructions">{drink.strInstructions}</p>
        <div data-testid={ `${0}-recomendation-card` }>{drink.strDrinkAlternate}</div>
        <button data-testid="start-recipe-btn" type="button">iniciar</button>
      </main>
    ))
  );
}

export default DrinksRecipes;
