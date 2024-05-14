import React from 'react';
import { render, screen } from '@testing-library/react';
import TodosPage from './pages/todos';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(<BrowserRouter><TodosPage /></BrowserRouter>);
  const linkElement = screen.getByText(/My Todos/i);
  expect(linkElement).toBeInTheDocument();
});
