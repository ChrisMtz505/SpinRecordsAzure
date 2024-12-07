import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeMessage = screen.getByText(/Bienvenido a nuestra Tienda/i);
  expect(welcomeMessage).toBeInTheDocument();
});
