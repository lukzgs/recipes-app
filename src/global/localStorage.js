export const favorite = (setStorageFavorites, id, setIconHeart) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  } else setStorageFavorites(favoriteRecipes);

  if (favoriteRecipes !== null) {
    const trueFavorite = favoriteRecipes.some((fav) => fav.id === id);
    setIconHeart(!trueFavorite);
  }
};

export const recipesMade = (recipes) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipes]));
};

export const inProgressDrink = (id, setSaveMade, setMade, setMeals) => {
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
};

export const inProgressFood = (id, setSaveMade, setMade, setCocktails) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (inProgressRecipes === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        [id]: [],
      },
    }));
  } else if (inProgressRecipes.meals === undefined) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        [id]: [],
      },
      ...inProgressRecipes,
    }));
  } else if (inProgressRecipes !== null && inProgressRecipes.meals !== undefined) {
    setSaveMade(inProgressRecipes.meals[id]);
    setMade(inProgressRecipes.meals[id]);
    setCocktails({ cocktails: inProgressRecipes.cocktails });
  }
};

export const recipesDone = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  if (doneRecipes === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
};
