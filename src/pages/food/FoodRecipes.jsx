import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SearchFood } from '../../services/SearchFood';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const TOTAL_CARDS = 6;
const ONE_SECOND = 1000;
// const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

function FoodRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [recomendationsDrinks, setRecomendationsDrinks] = useState([]);
  const [finished, setFinished] = useState(true);
  const [iconHeart, setIconHeart] = useState(true);
  const [copy, setCopy] = useState(true);
  const [storageFavorites, setStorageFavorites] = useState([]);
  const [foodId, setFoodId] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  const apiRecomDrinks = async () => {
    const responseRecomDrinks = await SearchFood('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const arrayDrinks = responseRecomDrinks.drinks;
    setRecomendationsDrinks(arrayDrinks);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchFood('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
      setRecipes(response.meals);
      setFoodId(response.meals[0].idMeal);
    };

    fetchApi();
    apiRecomDrinks();

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else setStorageFavorites(favoriteRecipes);
    if (favoriteRecipes !== null) {
      const trueFavorite = favoriteRecipes.some((fav) => fav.id === foodId);
      setIconHeart(!trueFavorite);
    }
  }, [foodId]);

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
    const { idMeal, strArea, strMeal, strCategory, strMealThumb } = recipes[0];
    const favorite = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb };

    if (iconHeart) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...storageFavorites, favorite]));
    } else {
      const delFavorite = storageFavorites.filter((fav) => fav.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(delFavorite));
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
          onClick={ () => {
            history.push('/comidas/52771/in-progress');
            setFinished(!finished);
          } }
        >
          { finished === false ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </main>
    ))
  );
}

export default FoodRecipes;
