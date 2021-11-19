import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom footer">
      <Link to="/comidas">
        <img
          alt="meal"
          src={ mealIcon }
          data-testid="food-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          alt="explore"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/bebidas">
        <img
          alt="drink"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}
export default Footer;
