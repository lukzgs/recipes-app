import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Food from '../pages/food/Food';
import Drinks from '../pages/drinks/Drinks';
import FoodRecipes from '../pages/food/FoodRecipes';
import DrinksRecipes from '../pages/drinks/DrinksRecipes';
import FoodInProgress from '../pages/food/FoodInProgress';
import DrinksInProgress from '../pages/drinks/DrinksInProgress';
import Explore from '../pages/Explore';
import ExploreFood from '../pages/food/ExploreFood';
import ExploreDrinks from '../pages/drinks/ExploreDrinks';
import ExploreDrinksIngre from '../pages/drinks/ExploreDrinksIngre';
import ExploreAreaFood from '../pages/food/ExploreAreaFood';
import Profile from '../pages/Profile';
import RecipesMade from '../pages/RecipesMade';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import ExploreFoodIngre from '../pages/food/ExploreFoodIngre';
import NotFound from '../components/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:idReceita" component={ FoodRecipes } />
      <Route exact path="/bebidas/:idReceita" component={ DrinksRecipes } />
      <Route exact path="/comidas/:idReceita/in-progress" component={ FoodInProgress } />
      <Route
        exact
        path="/bebidas/:idReceita/in-progress"
        component={ DrinksInProgress }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodIngre }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksIngre }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreAreaFood } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
