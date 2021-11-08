const NAME = 'www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER = 'www.themealdb.com/api/json/v1/1/search.php?f=';
const INGREDIENT = 'www.themealdb.com/api/json/v1/1/filter.php?i=';

export const SearchFood = async (api) => {
  const result = await fetch(api);
  const resultJson = await result.json();
  return resultJson;
};

export const switchRadios = (radios, value) => {
  switch (radios) {
  case 'ingredient':
    SearchFood(`${INGREDIENT}${value}`);
    break;
  case 'name':
    SearchFood(`${NAME}${value.split(' ').splice('_')}`);
    break;
  case 'first-letter':
    SearchFood(`${FIRST_LETTER}${value}`);
    break;
  default:
    break;
  }
};
