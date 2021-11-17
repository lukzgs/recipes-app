const NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const SearchFood = async (api) => {
  const result = await fetch(api);
  const resultJson = await result.json();
  return resultJson;
};

export const SwitchFood = (radios, value) => {
  switch (radios) {
  case 'ingredient':
    return SearchFood(`${INGREDIENT}${value}`);
  case 'name':
    return SearchFood(`${NAME}${value.split(' ').splice('_')}`);
  case 'first-letter':
    return SearchFood(`${FIRST_LETTER}${value}`);
  case 'random':
    return SearchFood(`${RANDOM}`);
  default:
    break;
  }
};
