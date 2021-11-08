const NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const SearchFood = async (api) => {
  const result = await fetch(api);
  const resultJson = await result.json();
  return resultJson;
};

const switchFood = (radios, value) => {
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

export default switchFood;
