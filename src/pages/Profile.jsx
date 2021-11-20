import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../css/profile/index.css';

function Profile() {
  const [user, setUser] = useState('');
  const history = useHistory();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('user'));
    if (profile === null) setUser('');
    else setUser(profile.email);
  }, []);

  const handleClick = () => {
    history.push('/');
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
  };
  return (
    <div>
      <Header title="Perfil" />
      <div className="d-flex align-items-center flex-column bd-highlight mb-3 center-top">
        <h3 data-testid="profile-email">{ user }</h3>
        <button
          type="button"
          className="my-5 btn btn-primary larg-btn"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          className="mb-5 btn btn-primary larg-btn"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          className="mb-5 btn btn-primary larg-btn"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
