import React from 'react';
import { SearchFood } from '../../services/SearchFood';

function FoodRecipes() {
  useEffect(() => {
    SearchFood('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
  }, []);

  return (
    <main>
      <img src="" alt="" data-testid="recipe-photo" />
      <p data-testid="recipe-title">Titulo</p>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <ul>
        <li data-testid={ `${0}-ingredient-name-and-measure` }>Ingredientes</li>
      </ul>
      <p data-testid="instructions">instrução</p>
      <div id="video" className="UJAwNkhbYWM">
        <iframe data-testid="video" title="video" src="">aa</iframe>
      </div>
      <div data-testid={ `${0}-recomendation-card` }>Cards</div>
      <button data-testid="start-recipe-btn" type="button">iniciar</button>
    </main>
  );
}

export default FoodRecipes;
