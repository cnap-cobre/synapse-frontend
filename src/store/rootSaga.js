import agaveFileSystems from './agaveFileSystems/sagas';

const sagas = [
  agaveFileSystems
];

export const initSagas = (sagaMiddleware) =>
    sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));