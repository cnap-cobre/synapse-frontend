export const syFetch = (url, init = {}) => fetch(`${process.env.REACT_APP_API_URL}${url}`, {
  ...init,
});
