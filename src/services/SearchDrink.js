const NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export const SearchDrink = async (api) => {
  const result = await fetch(api);
  const resultJson = await result.json();
  return resultJson;
};

export const SwitchDrink = (radios, value) => {
  switch (radios) {
  case 'ingredient':
    return SearchDrink(`${INGREDIENT}${value}`);
  case 'name':
    return SearchDrink(`${NAME}${value.split(' ').splice('_')}`);
  case 'first-letter':
    return SearchDrink(`${FIRST_LETTER}${value}`);
  case 'random':
    return SearchDrink(`${RANDOM}`);
  default:
    break;
  }
};
