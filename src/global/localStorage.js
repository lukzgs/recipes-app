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
    const local = {
      cocktails: {
        [id]: [],
        ...inProgressRecipes.cocktails,
      },
      ...inProgressRecipes.meals,
    };
    setSaveMade({
      ...inProgressRecipes.cocktails,
      [id]: local.cocktails[id],
    });
    setMade(local.cocktails[id]);
    setMeals(inProgressRecipes.meals);
  }
};

export const inProgressFood = (id, setSaveMade, setMade, setMeals) => {
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
    const local = {
      meals: {
        [id]: [],
        ...inProgressRecipes.meals,
      },
      ...inProgressRecipes.cocktails,
    };
    setSaveMade({
      ...inProgressRecipes.meals,
      [id]: local.meals[id],
    });
    setMade(local.meals[id]);
    setMeals(inProgressRecipes.cocktails);
  }
};

export const recipesDone = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  if (doneRecipes === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
};
