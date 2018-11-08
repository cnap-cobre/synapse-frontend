import agaveFileSystems from './agaveFileSystems/sagas';
import transferFiles from './transferFiles/sagas';

const sagas = [
  agaveFileSystems,
  transferFiles
];

export const initSagas = (sagaMiddleware) =>
    sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));