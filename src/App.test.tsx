import React from 'react';
import { render, screen } from '@testing-library/react';
import TodosPage from './pages/todos';

test('renders learn react link', () => {
  render(<TodosPage />);
  const linkElement = screen.getByText(/My Todos/i);
  expect(linkElement).toBeInTheDocument();
});
