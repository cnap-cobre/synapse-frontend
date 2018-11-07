import * as agaveFileSystems from './agaveFileSystems';

const sagas = {
    ...agaveFileSystems
};

export function registerWithMiddleware(middleware) {
  for (let name in sagas) {
    middleware.run(sagas[name]);
  }
}