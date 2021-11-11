import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SearchDrink } from '../../services/SearchDrink';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const TOTAL_CARDS = 6;
const ONE_SECOND = 1000;
// const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

function DrinksRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [recomendationFoods, setRecomendationFoods] = useState([]);
  const [finished, setFinished] = useState(true);
  const [iconHeart, setIconHeart] = useState(true);
  const [copy, setCopy] = useState(true);
  const [storageFavorites, setStorageFavorites] = useState([]);
  const [drinkId, setDrinkId] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  const apiRecomendationFoods = async () => {
    const responseRecomendationFoods = await SearchDrink('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const arrayFoods = responseRecomendationFoods.meals;
    setRecomendationFoods(arrayFoods);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchDrink('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
      setRecipes(response.drinks);
      setDrinkId(response.drinks[0].idDrink);
    };

    fetchApi();
    apiRecomendationFoods();

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else setStorageFavorites(favoriteRecipes);
    if (favoriteRecipes !== null) {
      const trueFavorite = favoriteRecipes.some((fav) => fav.id === drinkId);
      setIconHeart(!trueFavorite);
    }
  }, [drinkId]);

  if (recipes[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');
  const measures = Object.entries(recipes[0]).filter((recipe) => recipe[0]
    .includes('strMeasure') && recipe[1] !== null && recipe[1] !== '');

  const handleClickShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopy(false);
    setTimeout(() => {
      setCopy(true);
    }, ONE_SECOND);
  };

  const handleClickFavorite = () => {
    setIconHeart(!iconHeart);
    const { idDrink, strDrink, strCategory, strDrinkThumb, strAlcoholic } = recipes[0];
    const favorite = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb };

    if (iconHeart) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...storageFavorites, favorite]));
    } else {
      const delFavorite = storageFavorites.filter((fav) => fav.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(delFavorite));
    }
  };

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
        <button
          onClick={ handleClickShare }
          data-testid="share-btn"
          type="button"
          style={ { backgroundColor: 'Transparent', border: 'none' } }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button
          type="button"
          style={ { backgroundColor: 'Transparent', border: 'none' } }
          onClick={ handleClickFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ iconHeart ? whiteHeartIcon : blackHeartIcon }
            alt="heartIcon"
          />
        </button>
        <p hidden={ copy }>Link copiado!</p>
        <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
        <ul>
          { ingrendients.map((ingre, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingre[1]} - ${measures[index][1]}`}
            </li>))}
        </ul>
        <p data-testid="instructions">{drink.strInstructions}</p>
        <div className="scroll flex">
          {recomendationFoods.slice(0, TOTAL_CARDS).map((recom, index) => (
            <div
              key={ recom.idMeal }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                style={ { height: '5em' } }
                src={ recom.strMealThumb }
                alt={ recom.strMeal }
              />
              <p data-testid={ `${index}-recomendation-title` }>
                { recom.strMeal }
              </p>
            </div>
          ))}
        </div>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => {
            history.push('/bebidas/178319/in-progress');
            setFinished(!finished);
          } }
        >
          { finished === false ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </main>
    ))
  );
}

export default DrinksRecipes;
