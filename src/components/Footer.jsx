import React from 'react';
import '../index.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <footer id="footer">
        <img
          alt="meal"
          src={ mealIcon }
          data-testid="food-bottom-btn"
          className="footer"
        />
        <img
          alt="drink"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          className="footer"
        />
        <img
          alt="explore"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
          className="footer"
        />
      </footer>
    </footer>
  );
}
export default Footer;
