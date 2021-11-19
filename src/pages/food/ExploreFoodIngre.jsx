import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { SearchDrink } from '../../services/SearchDrink';

export default function ExploreFoodIngredients() {
  const MAX_LENGTH = 12;
  const [data, setData] = useState([]);

  const fetchIngredients = async () => {
    const resultApi = await SearchDrink('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const recipes = resultApi.meals.slice(0, MAX_LENGTH);
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
              src={ `https://www.themealdb.com/images/ingredients/${ingre.strIngredient || ingre.strIngredient1}-Small.png ` }
              alt={ ingre.strIngredient || ingre.strIngredient1 }
            />
          </section>
        )) }
      </main>
      <Footer />
    </section>
  );
}
