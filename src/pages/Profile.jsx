import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [user, setUser] = useState('');
  const history = useHistory();
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setUser(email);
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
      <h1>Profile</h1>
      <p data-testid="profile-email">{ user }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
