import routes from './routes';

test('routes definition is valid', () => {
  expect(Array.isArray(routes)).toBe(true);

  routes.forEach((route) => {
    expect(route.path).toBeDefined();
    expect(route.exact).toBeDefined();
    expect(route.name).toBeDefined();
    expect(route.component).toBeDefined();

  });
});