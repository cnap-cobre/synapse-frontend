export const SET_BROWSER_PATH = 'SET_BROWSER_PATH';

export function setBrowserPath(system, path) {
  return {
    type: SET_BROWSER_PATH,
    system,
    path
  };
}