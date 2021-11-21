import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SearchDrink } from '../../services/SearchDrink';

import '../../css/explorer/index.css';

function ExploreDrinksIngre() {
  const MAX_LENGTH = 12;
  const [data, setData] = useState([]);

  const fetchIngredients = async () => {
    const resultApi = await SearchDrink('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const recipes = resultApi.drinks.slice(0, MAX_LENGTH);
    setData(recipes);
  };

  useEffect(() => { fetchIngredients(); }, []);

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      <main className="flex mb-5 pl-2 flex-wrap">
        { data.map((ingre, index) => (
          <section
            className="recomendation p-1 m-2"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
          >
            <span
              className="p-2"
              data-testid={ `${index}-card-name` }
            >
              { ingre.strIngredient || ingre.strIngredient1 }
            </span>
            <br />
            <img
              className="p-1 m-1 img-recomendation"
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingre.strIngredient || ingre.strIngredient1}-Small.png ` }
              alt={ ingre.strIngredient || ingre.strIngredient1 }
            />
          </section>
        )) }
      </main>
      <Footer />
    </section>
  );
}

export default ExploreDrinksIngre;
