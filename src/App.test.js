test('renders bienvenida a la tienda text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenido a nuestra Tienda/i);
  expect(linkElement).toBeInTheDocument();
});
