import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SwitchFood } from '../../services/SearchFood';
import CardsByArea from '../../components/cards/CardsByArea';

function ExploreAreaFood() {
  const [byArea, setByArea] = useState([]);
  const [nameArea, setNameArea] = useState('');
  const [foodArea, setFoodArea] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await SwitchFood('byArea');
      setByArea(result.meals);
      const resultName = await SwitchFood('area', 'All');
      setFoodArea(resultName.meals);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const resultName = await SwitchFood('area', nameArea);
      setFoodArea(resultName.meals);
    };
    fetchApi();
  }, [nameArea]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <div data-testid="explore-food">
        <h1>Explore Area Food</h1>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setNameArea(e.target.value) }
        >
          <option
            data-testid="All-option"
          >
            All
          </option>
          { byArea.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ index }
            >
              {strArea}
            </option>
          ))}
        </select>
      </div>
      <CardsByArea foodArea={ foodArea } />
      <Footer />
    </div>
  );
}

export default ExploreAreaFood;
