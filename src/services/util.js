export const syFetch = (url, init = {}) => fetch(`${url}`, {
  ...init,
});
