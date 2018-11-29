import nav from './nav';

test('navigation definition is valid', () => {
  expect(Array.isArray(nav)).toBe(true);

  nav.forEach((item) => {
    expect(item.name).toBeDefined();
    expect(item.url).toBeDefined();
    expect(item.exact).toBeDefined();
    expect(item.icon).toBeDefined();
  });

  // For those with children
  nav.filter(item => item.hasOwnProperty('children')).forEach((item) => {
    expect(Array.isArray(item.children)).toBe(true);

    item.children.forEach((child) => {
      expect(child.name).toBeDefined();
      expect(child.mini).toBeDefined();
      expect(child.url).toBeDefined();
      expect(child.exact).toBeDefined();
    });
  });
});
