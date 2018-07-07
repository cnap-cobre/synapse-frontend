import routes from './routes.json';

test('routes definition is valid', () => {
  expect(Array.isArray(routes)).toBe(true);

  routes.forEach((route) => {
    expect(route.path).toBeDefined();
    expect(route.name).toBeDefined();
    expect(route.page).toBeDefined();

    if (route.children) {
      route.children.forEach((child) => {
        expect(child.path).toBeDefined();
        expect(child.name).toBeDefined();
        expect(child.page).toBeDefined();
      })
    }
  });
});