import React, { useState, useEffect } from 'react';
import '../RecipeProgress.css';
import { useHistory } from 'react-router';
import { SearchDrink } from '../services/SearchDrink';
import handleChecked from '../global/handleChecked';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const ONE_SECOND = 1000;

function RecipeProgressDrink() {
  const [revenueActual, setrevenueActual] = useState([]);
  const [saveMade, setSaveMade] = useState([]);
  const [ability, setAbility] = useState(0);
  const [made, setMade] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinkId, setDrinkId] = useState('');
  const [storageFavorites, setStorageFavorites] = useState([]);
  const [copy, setCopy] = useState(true);
  const [iconHeart, setIconHeart] = useState(true);

  const history = useHistory();
  const path = history.location.pathname.split('/');
  const id = path[2];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await SearchDrink(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setrevenueActual(response.drinks);
      setDrinkId(response.drinks[0].idDrink);
    };

    fetchApi();

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          [id]: [],
        },
      }));
    } else if (inProgressRecipes.cocktails === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          [id]: [],
        },
        ...inProgressRecipes,
      }));
    } else if (inProgressRecipes !== null && inProgressRecipes.cocktails !== undefined) {
      setSaveMade(inProgressRecipes.cocktails[id]);
      setMade(inProgressRecipes.cocktails[id]);
      setMeals({ meals: inProgressRecipes.meals });
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else setStorageFavorites(favoriteRecipes);
    if (favoriteRecipes !== null) {
      const trueFavorite = favoriteRecipes.some((fav) => fav.id === drinkId);
      setIconHeart(!trueFavorite);
    }
  }, [id, drinkId]);

  if (revenueActual[0] === undefined) return <p>Carregando...</p>;

  const ingrendients = Object.entries(revenueActual[0]).filter((recipe) => recipe[0]
    .includes('strIngredient') && recipe[1] !== null && recipe[1] !== '');

  const handleClick = ({ target }) => {
    setAbility(ability + 1);
    const { value } = target;
    setMade([...made, value]);

    console.log(meals);
    const progress = {
      cocktails: {
        [id]: [...made, value],
      },
      meals,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  };

  const handleClickShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${path[1]}/${path[2]}`);
    setCopy(false);
    setTimeout(() => {
      setCopy(true);
    }, ONE_SECOND);
  };

  const handleClickFavorite = () => {
    setIconHeart(!iconHeart);
    const { idDrink, strDrink, strCategory, 
      strDrinkThumb, strAlcoholic } = revenueActual[0];
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
    <div>
      <img
        data-testid="recipe-photo"
        src={ revenueActual[0].strDrinkThumb }
        alt={ revenueActual[0].strDrink }
      />
      <h1 data-testid="recipe-title">{revenueActual[0].strDrink}</h1>
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
      <span data-testid="recipe-category">{revenueActual[0].strCategory}</span>
      <form>
        {
          ingrendients.map((ingredient, i) => (
            <label
              data-testid={ `${i}-ingredient-step` }
              className={ (saveMade.length
                !== 0 ? saveMade.some((m) => m === ingredient[1])
                : false) ? 'checkedInput' : false }
              key={ i }
              htmlFor={ ingredient[1] }
            >
              {ingredient[1]}
              <input
                type="checkbox"
                name="ingredient"
                id={ ingredient[1] }
                value={ ingredient[1] }
                onChange={ (e) => handleChecked(e) }
                onClick={ handleClick }
                defaultChecked={ saveMade.length
                  !== 0 ? saveMade.some((m) => m === ingredient[1]) : false }
              />
            </label>
          ))
        }
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
