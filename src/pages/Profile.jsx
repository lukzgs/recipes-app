import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Perfil" />
      <h1>Profile</h1>
      <p data-testid="profile-email">Email</p>
      <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button type="button" data-testid="profile-logout-btn">Sair</button>
      <Footer />
    </div>
  );
}

export default Profile;
