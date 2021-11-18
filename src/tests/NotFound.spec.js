import React from 'react';
import { screen } from '@testing-library/dom';
import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando componente NotFound', () => {
  it('Testando componente NotFound, se existe um H1', () => {
    renderWithRouter(<NotFound />);

    const h1NotFound = screen.getByRole('heading', {
      level: 1,
      name: /Not Found/i,
    });
    expect(h1NotFound).toBeInTheDocument();
  });
});
