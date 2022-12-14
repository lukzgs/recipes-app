import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SearchDrink } from '../../services/SearchDrink';
import RevenuesContex from '../../context/RevenuesContex';

import '../../css/explorer/index.css';

function ExploreDrinksIngre() {
  const MAX_LENGTH = 12;
  const [data, setData] = useState([]);
  const { setDrinks } = useContext(RevenuesContex);
  const history = useHistory();

  const fetchIngredients = async () => {
    const resultApi = await SearchDrink('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const recipes = resultApi.drinks.slice(0, MAX_LENGTH);
    setData(recipes);
  };

  useEffect(() => { fetchIngredients(); }, []);

  const handleCLick = async (strIngredient1) => {
    const response = await SearchDrink(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`,
    );
    setDrinks(response.drinks);
    history.push('/bebidas');
  };

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      <main className="flex mb-5 pl-2 flex-wrap">
        { data.map(({ strIngredient1 }, index) => (
          <button
            key={ index }
            type="button"
            onClick={ () => handleCLick(strIngredient1) }
          >
            <section
              className="recomendation p-1 m-2"
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <span
                className="p-2"
                data-testid={ `${index}-card-name` }
              >
                { strIngredient1 }
              </span>
              <img
                className="p-1 m-1 img-recomendation"
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png ` }
                alt={ strIngredient1 }
              />
            </section>
          </button>
        )) }
      </main>
      <Footer />
    </section>
  );
}

export default ExploreDrinksIngre;
