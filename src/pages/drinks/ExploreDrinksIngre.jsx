import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SearchDrink } from '../../services/SearchDrink';

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
      <main>
        { data.map((ingre, index) => (
          <section data-testid={ `${index}-ingredient-card` } key={ index }>
            <h1
              data-testid={ `${index}-card-name` }
            >
              { ingre.strIngredient || ingre.strIngredient1 }
            </h1>
            <img
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
