import { useContext } from 'react';
import RevenuesContext from '../context/RevenuesContex';

const NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const SearchDrink = async (api) => {
  const { setResponseDrink } = useContext(RevenuesContext);
  const result = await fetch(api);
  const resultJson = await result.json();
  setResponseDrink(resultJson);
  return resultJson;
};

const switchDrink = (radios, value) => {
  switch (radios) {
  case 'ingredient':
    SearchDrink(`${INGREDIENT}${value}`);
    break;
  case 'name':
    SearchDrink(`${NAME}${value.split(' ').splice('_')}`);
    break;
  case 'first-letter':
    SearchDrink(`${FIRST_LETTER}${value}`);
    break;
  default:
    break;
  }
};

export default switchDrink;
