import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { SearchDrink } from '../../services/SearchDrink';
import RevenuesContex from '../../context/RevenuesContex';

export default function ExploreFoodIngredients() {
  const MAX_LENGTH = 12;
  const [data, setData] = useState([]);
  const { setRevenues } = useContext(RevenuesContex);
  const history = useHistory();

  const fetchIngredients = async () => {
    const resultApi = await SearchDrink('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const recipes = resultApi.meals.slice(0, MAX_LENGTH);
    setData(recipes);
  };

  useEffect(() => { fetchIngredients(); }, []);

  const handleCLick = async (strIngredient) => {
    const response = await SearchDrink(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`,
    );
    setRevenues(response.meals);
    history.push('/comidas');
  };

  return (
    <section>
      <Header title="Explorar Ingredientes" />
      <main>
        { data.map(({ strIngredient }, index) => (
          <button
            key={ index }
            type="button"
            onClick={ () => handleCLick(strIngredient) }
          >
            <section data-testid={ `${index}-ingredient-card` }>
              <h1
                data-testid={ `${index}-card-name` }
              >
                { strIngredient }
              </h1>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png ` }
                alt={ strIngredient }
              />
            </section>
          </button>
        )) }
      </main>
      <Footer />
    </section>
  );
}
